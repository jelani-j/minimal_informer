
// Create and Display Table Info
function displayTable(data, tableId, category) {
  const table = document.getElementById(tableId);
  table.className = 'news_table';
  table.innerHTML = '';
  // Add <caption>
  const caption = document.createElement('caption');
  caption.textContent = `${category} Table`;
  table.appendChild(caption);

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
