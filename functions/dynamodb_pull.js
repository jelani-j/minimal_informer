const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

//code here to extract info via dynamodb table and get article data 

exports.handler = async () => {
    try{
      console.log("Hello!");
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