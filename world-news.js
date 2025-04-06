const axios = require('axios');
const cheerio = require('cheerio');
const url_test = 'https://www.axios.com/energy-climate/extreme-weather';

// when you use .then it reacts based of the response of the previous statement, quite literarrly an "if statement"
// extract "headline"
function world_climate_headlines(){
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

//world_climate_headlines();

function tech_news_headlines(){
  const url = 'https://brutalist.report/topic/tech?'
  axios.get(url).then(response =>{
    const html = response.data;
  })

}

tech_news_headlines();

