/**
 *  OMDb template
 *	Documentation: http://www.omdbapi.com/
 *  Generate an API key here: http://www.omdbapi.com/apikey.aspx
 */

/**
 * According to documentation, you need at least 2 parameters when calling the API http://www.omdbapi.com/
 * 1 Required parameter: apikey
 * 2 Required parameter: One of the following i=, t= or s=
 *
 *
 * Example with parameter s=star trek
 * http://www.omdbapi.com/?apikey=[yourkey]&s=star trek
 *
 * Example with parameter s=star trek AND y=2020
 * http://www.omdbapi.com/?apikey=[yourkey]&s=star trek&y=2020
 *
 * Example with parameter s=star trek AND type=series
 * http://www.omdbapi.com/?apikey=[yourkey]&s=star trek&type=series
 *
 */

$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

async function getMovies(searchText) {
  try {
    const key = "e660d7c";
    const response = await fetch(
      "http://www.omdbapi.com/?apikey=" + key + "&s=" + searchText
    );

    if (!response.ok) {
      throw new Error("HTTP Error! Status: " + response.status);
    }

    const moviesData = await response.json();
    let movies = moviesData.Search;
    console.log("The fetched data: ", movies);

    let output = "";

    for (let movie of movies) {
      output += `
        <div class="col-md-3">
          <div class="well text-center">
            <img src="${movie.Poster}">
            <h5>${movie.Title}</h5>
            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
          </div>
        </div>
      `;
    }

    document.getElementById("movies").innerHTML = output;
  } catch (error) {
    console.log("Error!", error);
  }
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

async function getMovie() {
  try {
    const key = "e660d7c";
    let movieId = sessionStorage.getItem("movieId");
    let response = await fetch(
      "http://www.omdbapi.com/?apikey=" + key + "&i=" + movieId
    );

    if (!response.ok) {
      throw new Error("HTTP Error! Status: " + response.status);
    }

    const movieData = await response.json();
    console.log("The fetched data: ", movieData);

    let output = `
      
        <div class="row">
          <div class="col-md-4">
            <img src="${movieData.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movieData.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movieData.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movieData.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movieData.Rated}</li>
              <li class="list-group-item"><strong>IMDb Rating:</strong> ${movieData.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movieData.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movieData.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movieData.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row"
          <div class="well">
            <h3>Plot</h3>
            ${movieData.Plot}
            <hr>
            <a href="http://imdb.com/title/${movieData.imdbID}" target="_blank" class="btn btn-primary">View iMDB</a>
            <a href="index.html" class="btn btn-default">Go back to search</a>
          </div>
        </div>

      `;

    document.getElementById("movie").innerHTML = output;
  } catch (error) {
    console.log("Error!", error);
  }
}
