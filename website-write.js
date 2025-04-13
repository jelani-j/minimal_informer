// const data = require('./api_data.json');
// console.log(data.world_news);
const fs = require('fs');
  
function displaytable(array_name, section){
  fs.readFile('./api_data.json', 'utf8', (err, json) => {
    try {
      const data = JSON.parse(json);
      const entries = data[array_name][section];

      // table creation elements for looping (dynamic)
      console.log('Table Name:' + entries.name);
      Object.keys(entries.data).forEach(key => {
        console.log(`Key: ${key}`);
        console.log(`Value: ${entries.data[key]}`);
      });
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });
}


displaytable('world_news', 0)