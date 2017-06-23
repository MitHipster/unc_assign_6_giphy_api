/*jslint esversion: 6, browser: true*/
/*global window, console, $, jQuery, alert*/

let search = 'http://api.giphy.com/v1/gifs/search?';
const limit = 10;
const rating = 'pg-13';
const key = 'df241e37d4254980952f95c9742d1247';

let movies = [
  "The Sting",
  "Gran Torino",
  "Braveheart",
  "Full Metal Jacket",
  "The Green Mile",
  "Raging Bull",
  "The Departed",
  "Lawrence of Arabia",
  "The Shining",
  "Terminator 2",
  "Apocalypse Now",
  "Dr. StrangeLove",
  "Forrest Gump",
  "The Usual Suspects",
  "The Matrix",
  "Raiders of the Lost Ark",
  "Goodfellas",
  "Fight Club",
  "The Dark Knight",
  "Inception",
  "The Good, the Bad and the Ugly",
  "The Godfather",
  "The Shawshank Redemption"
];


search += $.param({
  q: 'the matrix',
  api_key: key,
  limit: limit,
  rating: rating
});

console.log(search);
$.ajax({
  url: search,
  method: 'GET'
}).done(function (results) {
  console.log(results);
});