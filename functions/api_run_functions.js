const { STSClient, AssumeRoleCommand } = require("@aws-sdk/client-sts")
const { SSMClient, GetParameterCommand} = require("@aws-sdk/client-ssm");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const stsClient = new STSClient({ region: "us-east-2"});
const filePath = "api_data.json";
const client = new DynamoDBClient({ region: "us-east-2" });
const docClient = DynamoDBDocumentClient.from(client);

async function assume_role(){
  //assume proper role and establish ssm Client
  try{
    //Configure SSM Client with Assumed Role 
    const ssmClient = new SSMClient({
      region: "us-east-2",
    });
    const getParameterCommand = new GetParameterCommand({
      Name: "gnews-api",
      WithDecryption: true,
    });
    const response = await ssmClient.send(getParameterCommand);
    return response.Parameter.Value;
  } catch(err){
    console.error("AssumeRole Failed:");
    console.error(err);
  }
}

async function writeArrayToDynamoDB(dataObject) {
  // Loop over each top-level key, e.g. "world_news"
  var primarykey = '';
  var secondarykey = [];
  //define primary key & create secondarykey list
  for(item in dataObject){
    primarykey = item;
    for(dict_object of dataObject[primarykey])
    secondarykey.push(dict_object.name);
  }
  //create array to store data & save it for dynamodb
  const putRequests = [];
  for (let i = 0; i < secondarykey.length; i++) {
    const articledata = dataObject[primarykey][i].data;
    if (!articledata) {
      console.warn(`Missing data for SK: ${secondarykey[i]}`);
      continue;
    }
    putRequests.push({
      PK: primarykey,
      SK: secondarykey[i],
      articles: articledata
    });
  }
  // send the data over to dynamodb
  for (const request of putRequests) {
    try {
      await docClient.send(new PutCommand({
        TableName: "news-data-table",
        Item: request  // Plain JavaScript object is fine
      }));
      console.log(`Successfully inserted SK: ${request.SK}`);
    } catch (err) {
      console.error(`Failed to insert SK: ${request.SK}`, err);
    }
  }
}

module.exports = {
  assume_role,
  filePath,
  writeArrayToDynamoDB
}