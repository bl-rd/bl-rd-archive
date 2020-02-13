/**
 * Update the landing message based on the user's
 * time of day.
 */
(function() {
  const element = document.querySelector('h1');
    
  const hour = (new Date()).getHours();

  let msg = 'Good day';

  if (hour < 12) {
    msg = 'Good morning';
  } else if (hour < 18) {
    msg = 'Good afternoon';
  } else {
    msg = 'Good evening';
  }

  element.innerText = msg;
})();