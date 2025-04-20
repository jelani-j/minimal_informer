# minimal_informer

## Overview
A minimal news site with the purpose of keeping users informed about events going on within the world without getting overwhelmed.
This project utelizes javascript as the coding language, along with html, and Css to display the news information in easy to read bite-sized chunks of information.
The project has three main topics: Technology, World News, and Travel News. Technology, and World news both utelize gnews.io API which is stored in AWS and retrieved via sdk npm module. The last news site, Travel news, uses web-scrapping to grab travel advisory data. It also grabs some general travel information about whether in regards to japan, as well as holidays in Germany since these are just two of my personal favorite travel locations.
### Code Setup
This project has many files, in order to build and launch the website, below I will define what each one does.
Dynamic Function Calls
- "api_run_functions":  contains assume role function + fetch url function + write to json file function
- "website_functions": contains code used to dynamiclly write information to table on html page
Website Pages
- "tech-news, world_news": code that utelizes gnews api to capture & store data into json file for website_write to use to populate html website 
- "travel_news": similar to the other two website pages, except this one is a webcrawler that uses different websites to capture and store data into the json file
Data Storage
- "api_data": this file is where all of the information polled form the website pages are stored so that the website-write file can use this information later on
Data Population
- "main": this file makes a call to all of the other website pages to store the data to api_data, this is ran once a week to ensure the information stays up to date. this first clears all of the information in the api_data file before writing to it again.
## General Flow
[main.js] (writes to)--> [api_data.json] <---(pulls data from) [website-write.js] ---> [(tech/world/travel)-news.js]
