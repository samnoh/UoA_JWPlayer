// ==UserScript==
// @name         Make JW Player for UoA recordings Better
// @namespace    Sam
// @author       samnoh
// @version      2.4.3
// @description  Add PiP function and change CSS
// @icon
// @match        https://raw.githubusercontent.com/samnoh/UoA_JWPlayer/master/UoA_JWPlayer.user.js
// @include      https://mediastore.auckland.ac.nz/*
// ==/UserScript==

jwplayer().play(); // autoplay
jwplayer().setCurrentQuality(0); // quality 0: HD, 1: SD, ...
jwplayer().resize('100%', '100%');
jwplayer('video').onReady( function () { // add pip button
	jwplayer().addButton('','PiP', function() {
		theVideo.webkitSetPresentationMode (theVideo.webkitPresentationMode === 'picture-in-picture' ? 'inline' : 'picture-in-picture');
	}, 'fifth');
});

// remember current position of video
(!localStorage.getItem(window.location.href)) ? jwplayer().seek(41) : jwplayer().seek(localStorage.getItem(window.location.href));

setInterval( function() {
	jwplayer().getPosition() == jwplayer().getDuration() ? localStorage.removeItem(window.location.href) : localStorage.setItem(window.location.href, jwplayer().getPosition());
}, 1000); // every one sec

// title
let url = window.location.href.split('/'); // current url
let subject_title = url[5], date = url[8].split('.')[0].slice(0,10);

// html title
document.getElementsByTagName('title')[0].textContent = subject_title + ' ' + date.slice(6,8) + '/' + date.slice(4,6) + ' ' + date.slice(8,10) + ':00 Recording';

// other css
let body_css = document.getElementsByTagName('body')[0];
Object.assign( body_css.style, { 
	backgroundColor: 'black' 
});

let container_css = document.getElementsByClassName('container')[0];
Object.assign( container_css.style, { 
	backgroundColor: 'black',
	width: '100%',
	height: '100%' 
});
