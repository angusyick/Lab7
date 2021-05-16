// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      var entryNum = 0; 
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        entryNum++;
        // newPost.entry.setAttribute("entry-num", entryNum); //sets attribute to know entry number
        entry.num = entryNum;
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        //if entry is clicked go to entry state
        newPost.addEventListener('click', function(){
          setState("entries", true, entry);
        });
      });
    });

  window.onpopstate = function(event){
    if(event.state == null){
      setState("home", false);
    }else{
      setState(event.state.page, false, event.state.entry);
    }
  };

  //if settings is clicked, go to settings state
  document.querySelector('img').addEventListener('click', function(){
    setState("settings", true);
  });

  //if header is clicked, go to home state
  document.querySelector('h1').addEventListener('click', function(){
    setState("home", true);
  });
  
});
