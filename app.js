'use strict';

// Inject template to html structure
document
  .querySelector('#main')
  .insertAdjacentHTML(
    'beforeend',
    '\n<div class="overlay">\n  <button class="overlay__close-icon" id="closeOverlay">&times;</button>\n  <img src="img/prev.png" alt="Previous button" class="overlay__btn" id="overlayPrev">\n  <img src="img/hg-1.jpg" alt="Interior view" class="overlay__img">\n  <img src="img/next.png" alt="Next button" class="overlay__btn" id="overlayNext">\n  <div class="btns-phone">\n   <img src="img/prev.png" alt="Previous button" class="btns-phone__btn" id="overlayPrev">\n   <img src="img/next.png" alt="Next button" class="btns-phone__btn" id="overlayNext">\n</div>'
  );

// Show elements based on section
let query = document.querySelector('.gallery');
let images = 'gallery__img';
if (!query) {
  query = document.querySelector('.section-gallery');
  images = 'section-' + images;
}

// Nodelist elements
let imageElems = document.querySelectorAll('.' + images);
let overlayButtons = document.querySelectorAll('#overlayPrev, #overlayNext');

// Replace overlay img
let overlay = function overlay(img) {
  return (document.querySelector('.overlay__img').src = img.src);
};
let currentOverlay = void 0;

// Open overlay
query.addEventListener('click', function (event) {
  document.querySelector('.overlay').classList.add('showOverlay');
  document.querySelector('body').style.overflow = 'hidden';

  // Change overlay img based on the element that was clicked.
  let target = event.target;
  let index = Array.prototype.indexOf.call(query.children, target);
  overlay(imageElems[index]);
  currentOverlay = index;
});

// Overlay prev and next button
overlayButtons.forEach(function (el) {
  return el.addEventListener('click', function () {
    let end = imageElems.length - 1;
    let direction = event.target.id === 'overlayPrev' ? -1 : 1;
    currentOverlay += direction;

    if (currentOverlay < 0) {
      currentOverlay = end;
    } else if (currentOverlay > end) {
      currentOverlay = 0;
    }
    overlay(imageElems[currentOverlay]);
  });
});

// Close overlay
document.querySelector('#closeOverlay').addEventListener('click', function () {
  document.querySelector('.overlay').classList.remove('showOverlay');
  document.querySelector('body').style.overflow = 'auto';
});

// Maps and marker functions
function initMap() {
  // The location of Uluru
  let sydney = { lat: -33.855717, lng: 151.267969 };
  // The map, centered at Uluru
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: sydney,
  });
  // The marker, positioned at Uluru
  let marker = new google.maps.Marker({ position: sydney, map: map });

  google.maps.event.addListener(marker, 'click', function () {
    window.open(
      'https://www.google.com/maps/place/52+Vaucluse+Rd,+Vaucluse+NSW+2030,+Australia/@-33.8557167,151.2674218,19z/data=!3m1!4b1!4m5!3m4!1s0x6b12ac4e2c442009:0x6ba2f7c3db1e7240!8m2!3d-33.8557167!4d151.267969',
      '_blank'
    );
  });
}

// Phone navigation
document
  .querySelector('.phone-nav__button')
  .addEventListener('click', function () {
    let body = document.querySelector('body');
    body.classList.toggle('hide-body');
  });

document.querySelector('#showDropDown').addEventListener('click', function () {
  document
    .querySelector('.phone-nav__dropdown')
    .classList.toggle('phone-dropdown');
});
