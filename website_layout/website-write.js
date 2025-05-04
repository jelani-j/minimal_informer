
// when api is completed move this to website folder this will be the .js to create the table from the data recieved via the backend lambda
function displayTable(jsonData, tableId) {
  const table = document.getElementById(tableId);
  const data = jsonData;
  table.innerHTML = '';

  data.forEach((item, index) => {
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.textContent = index + 1;
    cell2.textContent = item.title;
    cell3.textContent = item.description;
  });
}

async function fetchAndDisplay(jsonData, tableId) {
  try {
    const articles = await getArticleData(PK, num);
    displayTable(articles, PK, num, tableId);
  } catch (error) {
    console.error('Failed to fetch or display data:', error);
  }
}
// World News Triggers
async function world_news_trigger(){
  await fetchAndDisplay('world_news', 0, 'table-output');
  await fetchAndDisplay('world_news', 1, 'table-output');
  await fetchAndDisplay('world_news', 2, 'table-output');
}



// below is for local testing not on browser
// const fs = require('fs');
// function displaytable(){
//   fs.readFile('./api_data.json', 'utf8', (err, json) => {
//     try {
//       const data = JSON.parse(json);
//       // const entries = data[array_name][section];
//       console.log(data['world_news']);
//       // table creation elements for looping (dynamic)
//       // console.log('Table Name:' + entries.name);
//       // Object.keys(entries.data).forEach(key => {
//       //   console.log(`Key: ${key}`);
//       //   console.log(`Value: ${entries.data[key]}`);
//       // });
//     } catch (err) {
//       console.error('Error parsing JSON:', err);
//     }
//   });
// }

// displaytable()

// World News Triggers
document.addEventListener('DOMContentLoaded', () => {
    // Fetch JSON once and cache it
    let jsonData = null;
    //create function to display data to page via key/value pair to table
    //grab actual data from json file here
    fetch('api_data.json')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load JSON');
        return response.json();
      })
      .then(data => {
        jsonData = data;
        // Add button event listeners here
        //global news page
        document.getElementById('environment_news_button').addEventListener('click', () => {
          displayTable(jsonData, 'world_news', 0, 'table-output');
        });
        document.getElementById('global_news_button').addEventListener('click', () => {
          displayTable(jsonData, 'world_news', 1, 'table-output');
        });
        document.getElementById('local_news_button').addEventListener('click', () => {
          displayTable(jsonData, 'world_news', 2, 'table-output');
        });
      });
});

// Tech News Triggers
document.addEventListener('DOMContentLoaded', () => {
  // Fetch JSON once and cache it
  let jsonData = null;
  //grab actual data from json file here
  fetch('api_data.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load JSON');
      return response.json();
    })
    .then(data => {
      jsonData = data;
      // Add button event listeners here
      // tech news page
      document.getElementById('cloud_news_button').addEventListener('click', () => {
        displayTable(jsonData, 'tech_news', 0, 'table-output-tech');
      });
      document.getElementById('software_news_button').addEventListener('click', () => {
        displayTable(jsonData, 'tech_news', 1, 'table-output-tech');
      });
      document.getElementById('hardware_news_button').addEventListener('click', () => {
        displayTable(jsonData, 'tech_news', 2, 'table-output-tech');
      });

    });
});