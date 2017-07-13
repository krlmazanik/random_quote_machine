var main = function(){
  $('#getMessage').on('click', function(){
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?")
        .done(update);
    });

    function update(response) {
      $('#quote').html(JSON.stringify(response.quoteText));
      if(response.quoteAuthor == ""){
        response.quoteAuthor = "Unknown author";
      }
      $('#author').html(JSON.stringify(response.quoteAuthor));
    }
};

$(document).ready(main);
