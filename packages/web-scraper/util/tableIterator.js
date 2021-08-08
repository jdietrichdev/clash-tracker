const cheerio = require('cheerio');

const tableIterator = table => {
  const tableData = [];
  let rowData = [];
  const $ = cheerio.load(table);

  $('tr').each((index, row) => {
    rowData = []
    $('td, th', row).each((index2, value) => {
      rowData.push($(value).text().replace('\n',''));
    });
    tableData.push(rowData);
  });

  return tableData;
};

exports.tableIterator = tableIterator;