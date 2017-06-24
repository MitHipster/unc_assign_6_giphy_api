/*jslint esversion: 6, browser: true*/
/*global window, console, $, jQuery, alert*/

const limit = 10;
const rating = 'pg-13';
const key = 'df241e37d4254980952f95c9742d1247';

const $btnCl = $('.btn-container');
const $gifCl = $('.gif-container');

let movies = [
  "Die Hard",
  "Gran Torino",
  "Braveheart",
  "Full Metal Jacket",
  "The Green Mile",
  "Raging Bull",
  "The Departed",
  "Platoon",
  "The Shining",
  "Terminator 2",
  "Apocalypse Now",
  "Dr Strangelove",
  "Forrest Gump",
  "The Usual Suspects",
  "The Matrix",
  "Goodfellas",
  "Fight Club",
  "The Dark Knight",
  "Inception",
  "The Godfather",
  "The Shawshank Redemption"
];

$.each(movies, function(i, movie) {
  let button = $('<button>');
  button.attr({
    'type': 'button',
    'value': movie.toLowerCase(),
  }).text(movie);
  $btnCl.append(button);
});

$btnCl.on('click', 'button', function () {
  let title = $(this).val();
  let search = 'https://api.giphy.com/v1/gifs/search?';
  search += $.param({
    q: title,
    api_key: key,
    limit: limit,
    rating: rating
  });

  $.ajax({
    url: search,
    method: 'GET'
  }).done(function (results) {
    search = "";
    $gifCl.empty();
    $.each(results.data, function(i, result) {
      gifCard(result);
    });
  });
});

function gifCard(gif) {
  console.log(gif);
  let html = 
    `<div class="gif-card">
      <img src="${gif.images.original_still.url}" 
      data-toggle="${gif.images.original.url}" 
      alt="">
      <p>Rating: ${gif.rating}</p>
    </div>`;
  $gifCl.append(html);
}