const { assume_role, writeArrayToDynamoDB, filePath } = require('./api_run_functions');

// dictionaries for different news sources
const world_news_dict = []; // all world news dicts will be stored in here
let climate_dict = {};
let global_dict = {};
let local_dict = {};

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

async function savedata(){
  const enviroment_data = await world_news_enviroment();
  const global_data = await world_news_global();
  const local_data = await local_news();
  const world_news_dict = {world_news : [enviroment_data, global_data, local_data]};
  const world_news_data = world_news_dict.world_news;
  await writeArrayToDynamoDB('world_news',world_news_data);
}

exports.handler = async (event) => {
  try {
    const news_data = await savedata();
    return {
      statusCode: 200,
      body: JSON.stringify({ Passed: "World News Data has been saved to DynamoDB" })
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process request" }),
    };
  }
};