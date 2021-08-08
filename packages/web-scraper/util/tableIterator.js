const cheerio = require('cheerio');

const tableIterator = (table, labels) => {
  const tableData = [];
  let rowData = [];
  let rawData = {};
  const $ = cheerio.load(table);
  console.log(labels);

  $('tr').each((index, row) => {
    if (index === 0) return;

    rowData = [];
    $('td', row).each((index, value) => {
      rowData.push($(value).text().replace('\n',''));
    });
    
    rawData = {};
    labels.forEach((label, index) => {
      rawData[label] = rowData[index];
    })
    tableData.push(rawData);
  });

  return tableData;
};

exports.tableIterator = tableIterator;