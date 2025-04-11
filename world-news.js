import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
import { SSMClient, GetParameterCommand} from "@aws-sdk/client-ssm";
import {fromIni} from "@aws-sdk/credential-provider-ini";
const arn = "arn:aws:iam::203662895152:role/java-sdk-role";
const stsClient = new STSClient({ region: "us-east-2"});
// dictionaries for different news sources
let world_news_dict = []; // all world news dicts will be stored in here
let climate_dict = {};

//when using await for api pull, you must also await it 

async function assume_role(){
  const command = new AssumeRoleCommand({
    RoleArn: arn,
    RoleSessionName: "JellyDevTestSession"
  });
  //assume proper role and establish ssm Client
  try{
    const assumed_role = await stsClient.send(command);
    //Configure SSM Client with Assumed Role 
    const ssmClient = new SSMClient({
      region: "us-east-2",
      credentials: {
        accessKeyId: assumed_role.Credentials.AccessKeyId,
        secretAccessKey: assumed_role.Credentials.SecretAccessKey,
        sessionToken: assumed_role.Credentials.SessionToken
      }
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
//Enviromental Disaster
async function world_news_enviroment(){
  const api_key = await assume_role();
  const query = 'environmental disaster OR earthquake OR flood OR wildfire OR hurricane OR drought OR landslide OR typhoon';
  const encodedQuery = encodeURIComponent(query);
  const url = 'https://gnews.io/api/v4/search?q=' + encodedQuery + '&lang=en&token=' + api_key;
  fetch(url)
      .then(response => response.json())
      .then(data => {
        const articles = data.articles;
        articles.forEach(article => {
          climate_dict[article.title] = article.description;
        });
        world_news_dict.push(climate_dict);
      })
      .catch(error => console.error('Error:', error));
 }

world_news_enviroment();

// async function world_news_global(){
//   const api_key = await assume_role();
//   const url = 'https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=' + api_key;

// }

