// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      var entryNum = 0; 
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        entryNum++;
        newPost.setAttribute("entry-num", entryNum); //sets attribute to know entry number
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        //if entry is clicked go to entry state
        newPost.addEventListener('click', function(){
          setState("entries", this);
        });
      });
    });

  //if settings is clicked, go to settings state
  document.querySelector('img').addEventListener('click', function(){
    setState("settings");
  });

  //if header is clicked, go to home state
  document.querySelector('h1').addEventListener('click', function(){
    setState("home");
  });

});
