const { STSClient, AssumeRoleCommand } = require("@aws-sdk/client-sts")
const { SSMClient, GetParameterCommand} = require("@aws-sdk/client-ssm");
const {dynamoDBClient, PutItemCommand} = require("@aws-sdk/client-dynamodb");

//const arn = "arn:aws:iam::203662895152:role/java-sdk-role";
const stsClient = new STSClient({ region: "us-east-2"});
const filePath = "api_data.json";


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

async function writeArrayToDynamoDB(primary_key, data) {
  const AWS = require("aws-sdk");
  const dynamo = new AWS.DynamoDB.DocumentClient();
  const categories = data;

  for (const category of categories) {
    const params = {
      TableName: "news-data",
      Item: {
        PK: "world_news",
        SK: category.name,
        category: category.name,
        articles: category.data
      }
    };
    await dynamo.put(params).promise();
  }
}

module.exports = {
  assume_role,
  filePath,
  writeArrayToDynamoDB
}