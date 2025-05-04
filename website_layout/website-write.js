
// when api is completed move this to website folder this will be the .js to create the table from the data recieved via the backend lambda
function displayTable(data, tableId) {
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

async function fetchDataAndDisplayTable(PK,num) {
  try {
    const apiEndpoint = 'https://8a8wfs8ahe.execute-api.us-east-2.amazonaws.com/informer'
    const apiRequest = await fetch(`${apiEndpoint}?PK=${PK}&num=${num}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    displayTable(data, tableId);
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
      fetchDataAndDisplayTable('world_news', 0, 'table-output');
    });
  }
  if(globalNewsBtn){
    globalNewsBtn.addEventListener('click', () =>{
      fetchDataAndDisplayTable('world_news', 1, 'table-output');
    })
  }
  if(localNewsBtn){
    localNewsBtn.addEventListener('click', () =>{
      fetchDataAndDisplayTable('world_news', 2, 'table-output');
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
      fetchDataAndDisplayTable('tech_news', 0, 'table-output-tech');
    });
  }
  if(SftNewsBtn){
    SftNewsBtn.addEventListener('click', () =>{
      fetchDataAndDisplayTable('tech_news', 1, 'table-output-tech');
    })
  }
  if(HwdNewsBtn){
    HwdNewsBtn.addEventListener('click', () =>{
      fetchDataAndDisplayTable('tech_news', 2, 'table-output-tech');
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
      fetchDataAndDisplayTable('travel_news', 0, 'table-output-travel');
    });
  }
  if(GerNewsBtn){
    GerNewsBtn.addEventListener('click', () =>{
      fetchDataAndDisplayTable('travel_news', 1, 'table-output-travel');
    })
  }
  if(JapNewsBtn){
    JapNewsBtn.addEventListener('click', () =>{
      fetchDataAndDisplayTable('travel_news', 2, 'table-output-travel');
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