import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
import { SSMClient, GetParameterCommand} from "@aws-sdk/client-ssm";
import {fromIni} from "@aws-sdk/credential-provider-ini";
import * as fs from 'fs';
const arn = "arn:aws:iam::203662895152:role/java-sdk-role";
const stsClient = new STSClient({ region: "us-east-2"});
// dictionaries for different news sources
const world_news_dict = []; // all world news dicts will be stored in here
let climate_dict = {};
let global_dict = {};
let local_dict = {};
const filePath = "api_data.json";

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
  const query = 'environmental disaster OR earthquake OR flood OR wildfire OR hurricane OR drought OR landslide OR typhoon AND NOT "Trump"';
  const encodedQuery = encodeURIComponent(query);
  const url = 'https://gnews.io/api/v4/search?q=' + encodedQuery + '&lang=en&max=10&token=' + api_key;
  await fetch(url)
      .then(response => response.json())
      .then(data => {
        const articles = data.articles;
        articles.forEach(article => {
          climate_dict[article.title] = article.description;
        });
      })
      .catch(error => console.error('Error:', error));
  return {name: 'Enviroment', data: climate_dict};
 }

// global news
async function world_news_global(){
  const api_key = await assume_role();
  const query = 'world';
  const encodedQuery = encodeURIComponent(query);
  const url = 'https://gnews.io/api/v4/top-headlines?category=' + encodedQuery + '&lang=en&max=10&apikey=' + api_key;
  await fetch(url)
      .then(response => response.json())
      .then(data => {
        const articles = data.articles;
        articles.forEach(article => {
          global_dict[article.title] = article.description;
        });
        world_news_dict.push(global_dict);
      })
      .catch(error => console.error('Error:', error));
  return {name: 'Global', data: global_dict};
}

//local news
async function local_news(){
  const api_key = await assume_role();
  const query = 'manchester connecticut';
  const encodedQuery = encodeURIComponent(query);
  const url = 'https://gnews.io/api/v4/search?q=' + encodedQuery + '&lang=en&max=10&token=' + api_key;
  await fetch(url)
      .then(response => response.json())
      .then(data => {
        const articles = data.articles;
        articles.forEach(article => {
          local_dict[article.title] = article.description;
        });
        world_news_dict.push(local_dict);
      })
      .catch(error => console.error('Error:', error));
  return {name: 'Local', data: local_dict};
}


function writeArrayOfDictToJson(filePath, array) {
  const jsonString = JSON.stringify(array, null, 2); // Convert array to JSON string with indentation
  fs.writeFile(filePath, jsonString, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Successfully wrote data to file:", filePath);
    }
  });
}

async function savedata(){
  const enviroment_data = await world_news_enviroment();
  const global_data = await world_news_global();
  const local_data = await local_news();
  const world_news_dict = {world_news : [enviroment_data, global_data, local_data]};

  writeArrayOfDictToJson(filePath, world_news_dict);
}

savedata();