# minimal_informer
first project to create a static website hosted via AWS to stay updated in tech &amp; world events without getting overwhelmed

This project will be utilizing Amaozon Web Services and hosting a website via S3 (domain via Route53)

The project will primairly use javascript to update and create the website which will use three API's to post various news sources & information

## AWS Topology
![Diagram](images/chart.drawio.png)

## Setup
* Using Cloudformation: build a state machine containing all functions that write information to dynamodb, AND upload node_modules resource folder 
* DynamoDB: hold all data for three dicionairies: [world-news, tech-news, travel-news] 
* Additional Lambda: used to pull data from dynamodb --> api rest endpoint for static s3 bucket calls
* HTTP Rest API Endpoint: acts as middle-point between dynamodb and static website [ built via cloudformation
* S3 Bucket: hosts static website for browser. 
