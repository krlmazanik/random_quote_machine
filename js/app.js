var main = function() {
  //functions was written independantly to look cleaner/reusability concern
  $('#getMessage').on('click', getQuote);
  $('#tweet').on('click', tweetMe); //share on twitter button

  var colorsIndex = 0; //Dynamic color changer variable

  function getQuote() {
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?")
      .done(update);
  }

  function changeColors(){
    var colors = ['#ffaf7d', '#7dbaff', '#e17dff']; //color schemes for app

    // Version which was before including jQuery-color library
    // $('body, #getMessage').css("background-color", colors[colorsIndex]);
    // $('blockquote, #tweet').css('color', colors[colorsIndex]);

    $('body, #getMessage').animate({
      backgroundColor: colors[colorsIndex]
    }, 600);
    $('blockquote, #tweet').animate({
      color: colors[colorsIndex]
    }, 600);
    //Each time we
    colorsIndex++;
    if(colorsIndex === colors.length){
      colorsIndex = 0;
    }
  }

  function update(response) {
    $('#quote').hide().fadeIn(600).show();
    $('#author').hide().fadeIn(600).show();

    changeColors();

    $('#quote').html(JSON.stringify(response.quoteText));
    if (response.quoteAuthor == "") {
      response.quoteAuthor = "Unknown author";
    }
    $('#author').html(JSON.stringify(response.quoteAuthor));
  }

  //Share on twitter button
  function tweetMe() {
    var quoteText = $('#quote').text();
    var authorText = $('#author').text();
    //api provide author in a form with quotes(""), used to make integration with Twitter more clean
    authorText = authorText.replace(/"/g, '');

    window.open('https://twitter.com/intent/tweet?text=' + quoteText + " " + authorText, '_blank');
  }
  $(document).ready(getQuote); //included in order to get quote on page load, without any initial screen
};

$(document).ready(main);
