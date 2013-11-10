var request = require('request');
var cheerio = require('cheerio');

var url = "https://helen-sccc.eventbrite.com/";

request(url, function (err, res, body) {
  if (err)
    throw err;
  $ = cheerio.load(body, {ignoreWhitespace: true});
  $('.ticket_table').each(function () {
    //console.log($(this).text());
    $(this).find(".ticket_row").each(function () {
      console.log($(this).text());
      //console.log("found");
    });
  });
});