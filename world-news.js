import axios from 'axios';
import * as cheerio from 'cheerio';
const url_test = 'https://www.axios.com/energy-climate/extreme-weather';

// when you use .then it reacts based of the response of the previous statement, quite literarrly an "if statement"
// extract "headline"
function world_climate_headlines(url_test){
  axios.get(url_test).then(response =>{
    // returns entirety of page's html contents as a large "string"
    const html = response.data;
    const headlines = [];
    // use cherio import to load aka transfer the response data to easily manipulatable tempalte
    const cheerio_parse = cheerio.load(html);
    // look for "headline"
    cheerio_parse('h3').each((index, element) => {
      headlines.push(cheerio_parse(element).text());
    });
    console.log(headlines);
    return{headlines}
    
  })
}

world_climate_headlines(url_test);

// function tech_news_headlines(){
//   const url = 'https://brutalist.report/topic/tech?'
//   const parser = require('cheerio')
//   axios.get(url).then(response =>{
//     const html = response.data;
//     const headlines = [];
//     const doc = parser.load(html);
//     doc('li').each((index, element) => {
//       headlines.push(doc(element).text().trim('\n +'));
//     });
//     console.log(headlines);
//   })
  
// }

// tech_news_headlines();

