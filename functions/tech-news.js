const { assume_role, writeArrayToDynamoDB } = require('./api_run_functions');

let tech_array = [];
let cloud_data = {};
let coding_data = {};
let hardware_data = {};

async function cloud_computing_info(){
    const api_key = await assume_role();
    const query = 'Cloud Computing';
    const encodedQuery = encodeURIComponent(query);
    const url = 'https://gnews.io/api/v4/search?q=' + encodedQuery + '&lang=en&max=10&apikey=' + api_key;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        const articles = data.articles;
        articles.forEach(article => {
            cloud_data[article.title] = article.description;
        });
        tech_array.push(cloud_data);
      })
      .catch(error => console.error('Error:', error));
    return {name: 'Cloud', data: cloud_data};
}

async function coding_info(){
  const api_key = await assume_role();
  const query = 'coding OR programming OR software development';
  const encodedQuery = encodeURIComponent(query);
  const url = 'https://gnews.io/api/v4/search?q=' + encodedQuery + '&lang=en&max=10&apikey=' + api_key;
  await fetch(url)
    .then(response => response.json())
    .then(data => {
      const articles = data.articles;
      articles.forEach(article => {
        coding_data[article.title] = article.description;
      });
      tech_array.push(coding_info);
    })
    .catch(error => console.error('Error:', error));
  return {name: 'Coding', data: coding_data};
}

async function hardware_info(){
  const api_key = await assume_role();
  const query = 'Computer Hardware';
  const encodedQuery = encodeURIComponent(query);
  const url = 'https://gnews.io/api/v4/search?q=' + encodedQuery + '&lang=en&max=10&apikey=' + api_key;
  await fetch(url)
    .then(response => response.json())
    .then(data => {
      const articles = data.articles;
      articles.forEach(article => {
        hardware_data[article.title] = article.description;
      });
      tech_array.push(coding_info);
    })
    .catch(error => console.error('Error:', error));
  return {name: 'Hardware', data: hardware_data};
}

async function savedata(){
  const cloud_computing_data = await cloud_computing_info();
  const coding_news_data = await coding_info();
  const hardware_news_data = await hardware_info();
  const tech_news_dict = {tech_news : [cloud_computing_data, coding_news_data, hardware_news_data]};

  await writeArrayToDynamoDB(tech_news_dict);
  return { success: true, message: "Data saved successfully to DynamoDB" };
}

exports.handler = async () => {
  try{
    const tech_news_save = await savedata();
    return {
      statusCode: 200,
      body: JSON.stringify( {message: "Data saved successfully to DynamoDB" })
    };
  }catch (error) {
      console.error("Error:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to process request" }),
      };
    }
}