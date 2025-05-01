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

function writeArrayOfDictToJson(filePath, array) {
  fs.readFile(filePath, 'utf8', (readErr, fileData) => {
    let existingData = {};

    if (!readErr) {
      try {
        const parsed = JSON.parse(fileData);
        if (typeof parsed === 'object' && parsed !== null) {
          existingData = parsed;
        } else {
          console.warn('Existing JSON is not a top-level object. Overwriting.');
        }
      } catch (parseErr) {
        console.warn('Invalid JSON. Starting with new object.');
      }
    }

    // Merge array into existingData
    for (const [key, value] of Object.entries(array)) {
      if (!Array.isArray(value)) {
        console.warn(`Skipping key "${key}" because value is not an array.`);
        continue;
      }

      if (!Array.isArray(existingData[key])) {
        existingData[key] = [];
      }

      existingData[key].push(...value);
    }

    const jsonString = JSON.stringify(existingData, null, 2);
    fs.writeFile(filePath, jsonString, (writeErr) => {
      if (writeErr) {
        console.error('Error writing to file:', writeErr);
      } else {
        console.log('JSON file updated successfully:', filePath);
      }
    });
  });
}

module.exports = {
  assume_role,
  filePath
}

