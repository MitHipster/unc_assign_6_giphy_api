/*jslint esversion: 6, browser: true*/
/*global window, console, $, jQuery, alert*/

const limit = 10;
const rating = 'pg-13';
const key = 'df241e37d4254980952f95c9742d1247';

const $btnCl = $('.btn-container');
const $addInput = $('#add-input');
const $addBtn = $('#add-button');
const $gifCl = $('.gif-container');
const $toggleCl = $('.still-gif');

let movies = [
  "Die Hard",
  "Star Wars",
  "Braveheart",
  "Full Metal Jacket",
  "Breakfast Club",
  "Bad Moms",
  "The Blues Brothers",
  "Platoon",
  "The Shining",
  "Terminator 2",
  "Apocalypse Now",
  "Jaws",
  "Forrest Gump",
  "The Wizard of Oz",
  "The Matrix",
  "Goodfellas",
  "Silence of The Lambs",
  "Anchorman",
  "Inception",
  "The Godfather",
  "The Shawshank Redemption"
];

$.each(movies, function(i, movie) {
  $btnCl.append(createBtn(movie));
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

$addBtn.on('click', function () {
  let title = $addInput.val().trim();
  $btnCl.prepend(createBtn(title));
  $addInput.val('');
});

$gifCl.on('click', 'img', function () {
  let src = $(this).attr('src');
  $(this).attr('src', $(this).data('toggle'));
  $(this).data('toggle', src);
});

function createBtn(movie) {
  let button = $('<button>');
  button.attr({
    'type': 'button',
    'value': movie.toLowerCase(),
  }).text(movie);
  return button;
}

function gifCard(gif) {
  console.log(gif);
  let html = 
    `<div class="gif-card">
      <img class="still-gif" src="${gif.images.original_still.url}" 
      data-toggle="${gif.images.original.url}" 
      alt="">
      <p>Rating: ${gif.rating}</p>
    </div>`;
  $gifCl.append(html);
}