
// when api is completed move this to website folder this will be the .js to create the table from the data recieved via the backend lambda
function displayTable(data, tableId) {
  const table = document.getElementById(tableId);
  table.innerHTML = '';
  // Add caption row at the top
  const captionRow = table.createTHead().insertRow();
  const captionCell = captionRow.insertCell(0);
  captionCell.colSpan = 3; // spans all columns
  captionCell.textContent = `${category} Table`;
  captionCell.style.fontWeight = 'bold';
  captionCell.style.textAlign = 'left';
  captionCell.style.padding = '10px 0';

  // Create header row
  const headerRow = table.insertRow();
  headerRow.innerHTML = `
    <th>#</th>
    <th>Title</th>
    <th>Description</th>
  `;
  const table_data = Object.entries(data).map(([title, description]) => ({
    title,
    description
  }));
  
  table_data.forEach((item, index) => {
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.textContent = index + 1;
    cell2.textContent = item.title;
    cell3.textContent = item.description;
  });
}

async function fetchDataAndDisplayTable(PK,num,tableId,category) {
  try {
    const apiEndpoint = 'https://pz97t6bdkc.execute-api.us-east-2.amazonaws.com/informer-clean/news'
    const response = await fetch(`${apiEndpoint}?PK=${PK}&num=${num}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    displayTable(data, tableId,category);
  } catch (error) {
    console.error('Failed to display data:', error);
  }
}

//World News Triggers
document.addEventListener('DOMContentLoaded', () => {
  const envNewsBtn = document.getElementById('environment_news_button');
  const globalNewsBtn = document.getElementById('global_news_button');
  const localNewsBtn = document.getElementById('local_news_button');
  
  if (envNewsBtn) {
    envNewsBtn.addEventListener('click', () => {
      fetchDataAndDisplayTable('world_news', 0, 'table-output','Enviroment');
    });
  }
  if(globalNewsBtn){
    globalNewsBtn.addEventListener('click', () =>{
      fetchDataAndDisplayTable('world_news', 1, 'table-output', 'Global');
    })
  }
  if(localNewsBtn){
    localNewsBtn.addEventListener('click', () =>{
      fetchDataAndDisplayTable('world_news', 2, 'table-output', 'Local');
    })
  }
});

//Tech News Triggers
document.addEventListener('DOMContentLoaded', () => {
  const CldNewsBtn = document.getElementById('cloud_news_button');
  const SftNewsBtn = document.getElementById('software_news_button');
  const HwdNewsBtn = document.getElementById('hardware_news_button');

  if (CldNewsBtn) {
    CldNewsBtn.addEventListener('click', () => {
      fetchDataAndDisplayTable('tech_news', 0, 'table-output-tech', 'Cloud');
    });
  }
  if(SftNewsBtn){
    SftNewsBtn.addEventListener('click', () =>{
      fetchDataAndDisplayTable('tech_news', 1, 'table-output-tech', 'Software');
    })
  }
  if(HwdNewsBtn){
    HwdNewsBtn.addEventListener('click', () =>{
      fetchDataAndDisplayTable('tech_news', 2, 'table-output-tech', 'Hardware');
    })
  }
});


//Travel News Triggers
document.addEventListener('DOMContentLoaded', () => {
  const AdvNewsBtn = document.getElementById('advisory_news_button');
  const GerNewsBtn = document.getElementById('vacation_news_button');
  const JapNewsBtn = document.getElementById('transportation_news_button');

  if (AdvNewsBtn) {
    AdvNewsBtn.addEventListener('click', () => {
      fetchDataAndDisplayTable('travel_news', 0, 'table-output-travel', 'Advisory');
    });
  }
  if(GerNewsBtn){
    GerNewsBtn.addEventListener('click', () =>{
      fetchDataAndDisplayTable('travel_news', 1, 'table-output-travel', 'German Holidays');
    })
  }
  if(JapNewsBtn){
    JapNewsBtn.addEventListener('click', () =>{
      fetchDataAndDisplayTable('travel_news', 2, 'table-output-travel', 'Japan');
    })
  }
});


// // World News Triggers
// document.addEventListener('DOMContentLoaded', () => {
//     // Fetch JSON once and cache it
//     let jsonData = null;
//     //create function to display data to page via key/value pair to table
//     //grab actual data from json file here
//     fetch('api_data.json')
//       .then(response => {
//         if (!response.ok) throw new Error('Failed to load JSON');
//         return response.json();
//       })
//       .then(data => {
//         jsonData = data;
//         // Add button event listeners here
//         //global news page
//         document.getElementById('environment_news_button').addEventListener('click', () => {
//           displayTable(jsonData, 'world_news', 0, 'table-output');
//         });
//         document.getElementById('global_news_button').addEventListener('click', () => {
//           displayTable(jsonData, 'world_news', 1, 'table-output');
//         });
//         document.getElementById('local_news_button').addEventListener('click', () => {
//           displayTable(jsonData, 'world_news', 2, 'table-output');
//         });
//       });
// });

// // Tech News Triggers
// document.addEventListener('DOMContentLoaded', () => {
//   // Fetch JSON once and cache it
//   let jsonData = null;
//   //grab actual data from json file here
//   fetch('api_data.json')
//     .then(response => {
//       if (!response.ok) throw new Error('Failed to load JSON');
//       return response.json();
//     })
//     .then(data => {
//       jsonData = data;
//       // Add button event listeners here
//       // tech news page
//       document.getElementById('cloud_news_button').addEventListener('click', () => {
//         displayTable(jsonData, 'tech_news', 0, 'table-output-tech');
//       });
//       document.getElementById('software_news_button').addEventListener('click', () => {
//         displayTable(jsonData, 'tech_news', 1, 'table-output-tech');
//       });
//       document.getElementById('hardware_news_button').addEventListener('click', () => {
//         displayTable(jsonData, 'tech_news', 2, 'table-output-tech');
//       });

//     });
// });