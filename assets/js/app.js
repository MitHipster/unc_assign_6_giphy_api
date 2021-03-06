/*jslint esversion: 6, browser: true*/
/*global window, console, $, jQuery, alert*/

const limit = 10; // Maximum results to return
const rating = 'pg-13'; // Rating up to and including
const key = 'df241e37d4254980952f95c9742d1247'; // User API key

const $btnCont = $('.btn-container');
const $arrowRightId = $('#arrow-right');
const $arrowLeftId = $('#arrow-left');
const $addInput = $('#add-input');
const $addBtn = $('#add-button');
const $gifCont = $('.gif-container');
const $movieTitle = $('#movie-title');
const $toggleCl = $('.still-gif');

// Array for initial movie buttons
let movies = [
  "Die Hard",
  "Star Wars",
  "Braveheart",
  "Full Metal Jacket",
  "Breakfast Club",
  "Bad Moms",
  "The Blues Brothers",
  "Dumb and Dumber",
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

// Loop through array and append buttons after calling createBtn function, passing array item
$.each(movies, function(i, movie) {
  (createBtn(movie)).insertBefore($arrowLeftId);
});

// Button on click event for submitting search term
$btnCont.on('click', 'button', function () {
  // Get movie title
  let title = $(this).val();
  let titleHeading = $(this).text();
  // Create URL with search parameters for AJAX request
  let search = 'https://api.giphy.com/v1/gifs/search?';
  search += $.param({
    q: title,
    api_key: key,
    limit: limit,
    rating: rating
  });
  
  // AJAX request for retrieving Giphy information
  $.ajax({
    url: search,
    method: 'GET'
  }).done(function (results) {
    // If successful, gif container
    $gifCont.empty();
    // Add movie title heading
    $movieTitle.text(titleHeading);
    // Loop through results and call gifCard function, passing object argument
    $.each(results.data, function(i, result) {
      gifCard(result);
    });
    // Image collection that was created
    let $imgCl = $('.still-gif');
    $imgCl.on('load', function () {
      // Select previous sibling and remove loading class.
      $(this)
        .prev()
        .removeClass('loading')
        // Remove inline styling from parent container to make its width and height dynamic
        .parent()
        .css({'width': '', 'height': ''})
        // Find rating paragraph and set visibility to visible
        .next('p')
        .css('visibility', 'visible');
    });
  });
});

// Click event to prepend button based on user's input after calling createBtn function, passing input value
$addBtn.on('click', function () {
  let title = $addInput.val().trim();
  // Verify that a movie title was entered
  if (!title) {
    alert('Please enter a movie title before clicking Add.');
    return false;
  }
  // Convert added movie title to proper case
  title = title.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
  });
  (createBtn(title)).insertAfter($arrowRightId);
  // Clear input field
  $addInput.val('');
});

// Image on click event for switching between still and GIF
$gifCont.on('click', 'img', function () {
  // Store image source
  let src = $(this).attr('src');
  // If image has class of 'still-active' then click is inital gif request
  if ($(this).hasClass('still-active')) {
    // Change visibility to hidden on clicked image, select previous sibling and add loading class to create spinner effect
    $(this)
      .css('visibility', 'hidden')
      .prev()
      .addClass('loading');
    // Call changeSrc function with source value and image object
    changeSrc(src, $(this));
    // Image load event to remove 'still-active' and 'loading' classes and set visibility back to visible
    $(this).on('load', function () {
      $(this)
        .removeClass('still-active')
        .css('visibility', 'visible')
        .prev()
        .removeClass('loading');
    });
    // else image does not have 'still-active' class so gif has already been requested
    } else {
      // Call change source function with source value and image object
      changeSrc(src, $(this));
    }
});

// Function to create initial buttons and any custom user buttons
function createBtn(movie) {
  let button = $('<button>');
  button.attr({
    'type': 'button',
    'value': movie.toLowerCase(),
  }).text(movie);
  return button;
}

// Function to create gif card
function gifCard(gif) {
  // Still image, fixed height 200px
  let stillUrl = gif.images.fixed_height_still.url;
  // GIF image, fixed height 200px
  let gifUrl = gif.images.fixed_height.url;
  // GIF rating
  let gifRating = gif.rating;
  // Build out HTML for gif card
  let html = 
    `<div class="gif-card">
      <div class="images" style="width: 270px; height: 180px">
        <div class="spinner loading"></div>
        <img class="still-active still-gif" src="${stillUrl}" 
        data-toggle="${gifUrl}" 
        alt="">
      </div>
      <p>Rating: ${gifRating}</p>
    </div>`;
  // Append to gif container
  $gifCont.append(html);
}

// Function to switch image source between still and gif
function changeSrc(source, image) {
  image
    .attr('src', image.data('toggle'))
    .data('toggle', source);
}
