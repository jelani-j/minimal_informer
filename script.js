const axios = require('axios');
const cheerio = require('cheerio');

async function getNewsHeadlines(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const headlines = [];

    $('h1, h2, h3, h4, h5, h6').each((index, element) => {
      headlines.push($(element).text().trim());
    });

    return headlines;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function main() {
  const newsUrl = 'https://www.axios.com/energy-climate/extreme-weather';
  const headlines = await getNewsHeadlines(newsUrl);

  console.log('News Headlines:');
  headlines.forEach((headline, index) => {
    console.log(`${index + 1}. ${headline}`);
  });
}

main();