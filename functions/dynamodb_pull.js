const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

//code here to extract info via dynamodb table and get article data 
async function getArticleData(PK,num) {
  const params = {
    TableName: 'news-data-table',
    KeyConditionExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ':pk': PK,
    }
  };

  try {
    const data = await docClient.query(params).promise();
    return data.Items[num].articles
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


exports.handler = async (event) => {
  try{
    const pk_var = event.queryStringParameters?.PK;
    const num = parseInt(event.queryStringParameters?.num)
    const articles = await getArticleData(pk_var,num);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
      },
      body: JSON.stringify(articles)
    };
  }catch (error) {
      console.error("Error:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to process request" }),
      };
    }
}