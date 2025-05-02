async function writeArrayToDynamoDB(dataObject) {
  // Loop over each top-level key, e.g. "world_news"
  var primarykey = '';
  var secondarykey = [];
  //define primary key & create secondarykey list
  for(item in dataObject){
    primarykey = item;
    for(dict_object of dataObject[primarykey])
    secondarykey.push(dict_object.name);
  }
  //create item and insert into dynamodb
  const putRequests = [];
  for (let i = 0; i < secondarykey.length; i++) {
    const articledata = dataObject[primarykey][i].data;
    if (!articledata) {
      console.warn(`Missing data for SK: ${secondarykey[i]}`);
      continue;
    }
    putRequests.push({
      PK: primarykey,
      SK: secondarykey[i],
      articles: articledata
    });
  }
  // console.log(putRequests[0].articles);
  const results = await Promise.all(
    putRequests.map(async (params) => {
      try {
        // Log the item before sending to DynamoDB
        console.log("Sending to DynamoDB:", params.SK);
        // // Send to DynamoDB
        await docClient.send(new PutCommand({
          TableName: "news-data-table",  // Hardcoded table name
          Item: params             // Directly use the flattened data
        }));
        console.log(`Successfully saved item with SK: ${params.SK}`);
      } catch (error) {
        console.log("PK:", params.PK, "SK:", params.SK)
        console.error(`Failed to save item with SK: ${params.SK}`, error);
      }
    })
  );
  return results;
}

module.exports = {
  assume_role,
  filePath,
  writeArrayToDynamoDB
}