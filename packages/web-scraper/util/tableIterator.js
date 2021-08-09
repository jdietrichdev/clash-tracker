const cheerio = require('cheerio');

const tableIterator = (table, labels) => {
  const tableData = [];
  let rowData = [];
  let rawData = {};
  const $ = cheerio.load(table);

  $('tr').each((index, row) => {
    if (index === 0) return;

    rowData = [];
    $('td', row).each((index, value) => {
      rowData.push($(value).text().replace('\n',''));
    });

    if (rowData[0] === undefined) return;
    
    rawData = {};
    labels.forEach((label, index) => {
      rawData[label] = rowData[index];
    })
    tableData.push(rawData);
  });

  // console.log(tableData);
  return tableData;
};

exports.tableIterator = tableIterator;