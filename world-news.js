import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import {fromIni} from "@aws-sdk/credential-provider-ini";

const stsClient = new STSClient({ region: "us-east-2"});

const command = new AssumeRoleCommand({
  RoleArn: "arn:aws:iam::203662895152:role/java-sdk-role",
  RoleSessionName: "JellyDevTestSession"
});

try{
  const response = await stsClient.send(command);
  console.log("Assume Role Success!",
    response.Credentials.AccessKeyId);
  console.log("Session Expired", response.Credentials.Expiration);

} catch(err){
  console.error("AssumeRole Failed:");
  console.error(err);

}




// async function assumeRoleAndExecuteSSMCommand() {
//   try {
//       // Assume the role
//       const assumeRoleCommand = new AssumeRoleCommand(assumeRoleParams);
//       const assumeRoleResponse = await STSClient.send(assumeRoleCommand);

//       // Configure SSM client with assumed role credentials
//       const ssmClient = new SSMClient({
//           region: "us-east-2",
//           credentials: {
//               accessKeyId: assumeRoleResponse.Credentials.AccessKeyId,
//               secretAccessKey: assumeRoleResponse.Credentials.SecretAccessKey,
//               sessionToken: assumeRoleResponse.Credentials.SessionToken,
//           },
//       });
//     }catch (error) {
//       console.error("Error:", error);
//     }
//   }

//   assumeRoleAndExecuteSSMCommand();

// const getParameterValue = async (parameterArn) => {
//   const command = new GetParameterCommand({
//     Name: parameterArn,
//     WithDecryption: true,
//   });

//   try {
//     const response = await ssmClient.send(command);
//     return response.Parameter.Value;
//   } catch (error) {
//     console.error("Error retrieving parameter:", error);
//     throw error;
//   }
// };

// const parameterArn = 'arn:aws:ssm:us-east-2:203662895152:parameter/gnews-api';

// getParameterValue(parameterArn)
//   .then((value) => {
//     console.log("Parameter value:", value);
//   })
//   .catch((error) => {
//     // Handle the error appropriately
//   });

