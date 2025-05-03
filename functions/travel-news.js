// scrape-and-save.js
const cheerio = require('cheerio');
const { writeArrayToDynamoDB } = require('./api_run_functions');

let travel_news_array = [];
let advisory_data = {};
let german_holidays = {};
let japanese_holidays = {};

//advisory saftey list
async function advisoryList(){
  const url = 'https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html';
  try{
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    $('table tbody tr').each((i, row) => {
      const tds = $(row).find('td');
      const country = $(tds[0]).text().trim();
      const advisory = $(tds[1]).text().trim();

      if (/Level [2-4]/.test(advisory)) {
        advisory_data[country] = advisory;
      }
    });
    return {name: 'Advisory', data: advisory_data};
  }catch(err){
    console.error('Error:', err);
    return {name: 'Advisory', data: {}, error: err.message};
  }
}

//german holidays
async function german_events(){
  const url = "https://www.trade.gov/german-holidays"
  try{
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    $('table tbody tr').each((i, row) => {
      const tds = $(row).find('td');
      const date = $(tds[0]).text().trim();
      const holidays = $(tds[2]).text().trim();
      german_holidays[date] = holidays;
    });
    return {name: 'Germany', data: german_holidays};
  }catch(err){
    console.error('Error:', err);
    return {name: 'Germany', data: {}, error: err.message};
  }
}

//japan seasonal events
async function japan_events(){
  const url = "https://www.kanpai-japan.com/japan-events-calendar"
  try{
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    $('.list-unstyled.events-list > li.mb-3').each((i, el) => {
      const liText = $(el).text().trim().replace(/\s+/g, ' '); // Cleaned text
      const [rawDate, rawTitle] = liText.split('--').map(part => part.trim());
      if (rawDate && rawTitle) {
        japanese_holidays[rawDate] = rawTitle;
      }
    });
    return {name: 'Japan', data: japanese_holidays};
  }catch(err){
    console.error('Error:', err);
    return {name: 'Japan', data: {}, error: err.message};
  }
}

async function travel_savedata(){
  const advisory_data = await advisoryList();
  const german_data = await german_events();
  const japan_data = await japan_events();
  const travel_news_dict = {travel_news : [advisory_data, german_data, japan_data]};
  await writeArrayToDynamoDB(travel_news_dict);
  return { success: true, message: "Data saved successfully to DynamoDB" };
}

exports.handler = async () => {
    try{
      const tech_news_save = await travel_savedata();
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