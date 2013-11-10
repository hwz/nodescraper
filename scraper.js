var request = require('request');
var cheerio = require('cheerio');

var url = "https://helen-sccc.eventbrite.com/";

var checkInterval = setInterval(checkEvent, 10000); //10 seconds

function checkEvent() {
  request(url, function (err, res, body) {
    if (err)
      throw err;
    $ = cheerio.load(body, { ignoreWhitespace: true });
    $('.ticket_table .ticket_row').each(function () {

      //gets 3rd child (status) of the ticket body
      var status = (this.find('td:nth-child(3)').text().replace(/\s+/g, ""));

      if (status != 'NotStarted') {
        
        //stop checking
        clearInterval(checkInterval);

        this.find(".ticket_type_name").each(function () {
          var ticketType = $(this).text().replace(/\s+/g, "");
          console.log(ticketType);
        });

        this.find("#remaining_quant_21257607").each(function () {
          var numTicket = $(this).text().replace(/\s+/g, "");
          var regex = ".*?(?=Ticket)";
          var match = numTicket.match(regex)[0];
          console.log(match);
        });

      } else {
        console.log("Not Started");
      }
    });
  });
};