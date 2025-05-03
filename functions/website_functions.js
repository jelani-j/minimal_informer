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

