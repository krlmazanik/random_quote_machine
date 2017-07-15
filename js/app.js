var main = function() {
  $('#getMessage').on('click', getQuote);
  $('#tweet').on('click', tweetMe);

  function getQuote() {
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?")
      .done(update);
  }

  function update(response) {
    $('#quote').hide().fadeIn(600).show();
    $('#author').hide().fadeIn(600).show();

    $('#quote').html(JSON.stringify(response.quoteText));
    if (response.quoteAuthor == "") {
      response.quoteAuthor = "Unknown author";
    }
    $('#author').html(JSON.stringify(response.quoteAuthor));
  }

  function tweetMe() {
    var quoteText = $('#quote').text();
    var authorText = $('#author').text();
    authorText = authorText.replace(/"/g, '');

    window.open('https://twitter.com/intent/tweet?text=' + quoteText + " " + authorText, '_blank');
  }
  $(document).ready(getQuote);
};

$(document).ready(main);
