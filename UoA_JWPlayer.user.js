// ==UserScript==
// @name         Make JW Player for UoA recordings Better
// @namespace    Sam
// @author       samnoh
// @version      2.5.2
// @description  Add PiP function and change CSS
// @icon
// @match        https://raw.githubusercontent.com/samnoh/UoA_JWPlayer/master/UoA_JWPlayer.user.js
// @include      https://mediastore.auckland.ac.nz/*
// ==/UserScript==

const jw = jwplayer();
const quality = 0; // quality 0: HD, 1: SD, ...
const bg_color = 'black';

const current_url = window.location.href;
const rec_url = parseLink(current_url); // current url

jw.play(); // autoplay
jw.setCurrentQuality(quality); 
jw.resize('100%', '100%'); // video size
jw.addButton('', 'PiP', () => { // add pip button
	theVideo.webkitSetPresentationMode (theVideo.webkitPresentationMode == 'picture-in-picture' ? 'inline' : 'picture-in-picture');
}, 'fifth');


// video automatically starts from 42 seconds to skip the opening
(!localStorage.getItem(current_url)) ? jw.seek(42) : jw.seek(localStorage.getItem(current_url));


// auto save current position
setInterval( () => {
	jw.getPosition() == jw.getDuration() ? localStorage.removeItem(current_url) : localStorage.setItem(current_url, jw.getPosition());
}, 1500); // every 1.5 seconds


// title
const parseLink = (rec_link = '') => rec_link
	.replace('https://mediastore.auckland.ac.nz/', '')
	.split('/')
	.filter((k, index) => {
		return k.includes('.') || index == 2;
	})
	.reduce((acc, k, index) => {
		index == 1 ? acc.push(k.split('.')[0]) : acc.push(k);
		return acc;
	},[]);


const subject_title = rec_url[0], date = rec_url[1];
document.getElementsByTagName('title')[0].textContent = subject_title + ' ' + date.slice(6,8) + '/' + date.slice(4,6) + ' ' + date.slice(8,10) + ':00';


// body css
Object.assign(document.getElementsByTagName('body')[0].style, { 
	backgroundColor: bg_color 
});


// video frame size
Object.assign(document.getElementsByClassName('container')[0].style, { 
	backgroundColor: bg_color,
	width: '100%',
	height: '100%' 
});
