console.log('app.js loaded');

$(document).ready(function() {

//get api key from another .js file
  const apikey = config.apiKey;
  let option = "t"

//use jQuery selector to get Dom elements
  let $searchBox = $('#searchBox');
  let $title = $('#title');
  let $year = $('#year');
  let $poster = $('#poster');
  let $actors = $('#actors');
  let $website = $('#website');

//everytime when user types in a letter, the app will run and get the movie info through the api
  $searchBox.on('keyup', function(e) {

    if (!e.target.value) {
      $poster.attr('src', "");
      $title.text("");
      $year.text("");
      $actors.text("");
      $website.text("");
      return;
    }
    getMovie(e.target.value)
  })

  function getMovie(input) {
    $.ajax(`http://www.omdbapi.com/?apikey=${apikey}&${option}=${input}`)
      .then(function(data) {
        renderMovieInfo(data)
      });
  }
  /*
  //if using plain javascript to fetch api data
    function getMovie(input) {
      fetch(`http://www.omdbapi.com/?apikey=${apikey}&${option}=${input}`)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          renderMovieInfo(data)
        });
    }
  */

//render movie info from an object that contains movie info
  function renderMovieInfo(movie) {
    if (movie.Error === 'Movie not found!') {
      $poster.attr('src', "");
      $title.text("");
      $year.text("");
      $actors.text("");
      $website.text("");
      return
    }
    //console.log(movie);
    let title = `Title: ${movie.Title}`;
    let year = `Year: ${movie.Year}`;
    let poster = `${movie.Poster}`;
    let actors = `Actors: ${movie.Actors}`;
    let website = `Website: ${movie.Website}`;

    $title.text(title);
    $year.text(year);
    $poster.attr('src', `${movie.Poster}`);
    $actors.text(actors);
    $website.text(website);

  }
})
