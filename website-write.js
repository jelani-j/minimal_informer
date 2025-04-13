
// const fs = require('fs');
  
// function displaytable(array_name, section){
//   fs.readFile('./api_data.json', 'utf8', (err, json) => {
//     try {
//       const data = JSON.parse(json);
//       const entries = data[array_name][section];

//       // table creation elements for looping (dynamic)
//       console.log('Table Name:' + entries.name);
//       Object.keys(entries.data).forEach(key => {
//         console.log(`Key: ${key}`);
//         console.log(`Value: ${entries.data[key]}`);
//       });
//     } catch (err) {
//       console.error('Error parsing JSON:', err);
//     }
//   });
// }

// displaytable('world_news', 0)


document.addEventListener('DOMContentLoaded', () => {
    // Fetch JSON once and cache it
    let jsonData = null;

    function displayTable(data, arrayName, sectionIndex) {
      const entry = data[arrayName]?.[sectionIndex];
    
      const output = document.getElementById('table-output');
      output.innerHTML = ''; // clear previous content
    
      if (!entry) {
        output.textContent = `No data found for ${arrayName}[${sectionIndex}]`;
        return;
      }
    
      const title = document.createElement('h2');
      title.textContent = 'Table Name: ' + entry.name;
      output.appendChild(title);
    
      const table = document.createElement('table');
    
      Object.entries(entry.data || {}).forEach(([key, value]) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td><strong>${key}</strong></td><td>${value}</td>`;
        table.appendChild(row);
      });
    
      output.appendChild(table);
    }

    fetch('api_data.json')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load JSON');
        return response.json();
      })
      .then(data => {
        jsonData = data;
  
        // Add button event listeners
        document.getElementById('environment_news_button').addEventListener('click', () => {
          displayTable(jsonData, 'world_news', 0);
        });

        document.getElementById('global_news_button').addEventListener('click', () => {
          displayTable(jsonData, 'world_news', 1);
        });

        document.getElementById('local_news_button').addEventListener('click', () => {
          displayTable(jsonData, 'world_news', 2);
        });


      });
});

