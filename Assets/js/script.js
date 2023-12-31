// Wrapped all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function() {
  var dayDisplayEl = $('#currentDay'); // move inside the anonymous function
  var timeBlockEls = $('.time-block'); // move insider the anonymous function

  readToDosFromStorage(); // load the previously entered TODOs first when rendering the page

  // Added a listener for click events on the save button.
  // Use jQuery to make all saveBtn class items call this saving to localStorage functionality
  $('.saveBtn').on('click', function() {
    var value = $(this).siblings('.description').val();
    var hour = $(this).parent().attr('id'); // the id in the containing time-block saved for later reference
    localStorage.setItem(hour,value);
  })


  // Added code to apply the past, present, or future class to each time block in updateHours() function below
  function updateHours() {
    var rightNowHour = parseInt(dayjs().format('H'));
    for (var i = 0; i < timeBlockEls.length; i++) {
      var id = timeBlockEls[i].id;
      var blockHour = parseInt(id.substring(5)); //this excludes the "hour-" part of each different block and allows me to coerce the remaining part of a string into a number

      // before conditional
      if (blockHour < rightNowHour) {
        timeBlockEls[i].classList.remove('present', 'future');
        timeBlockEls[i].classList.add('past');

      } else if (blockHour === rightNowHour) { //equal conditional (same hour)
        timeBlockEls[i].classList.remove('past', 'future');
        timeBlockEls[i].classList.add('present');

      } else { //after conditional
        timeBlockEls[i].classList.remove('present', 'past');
        timeBlockEls[i].classList.add('future');
      }
    }
  }

  // Added code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.   
  // Puts the locally stored saved TODOS back on calendar upon page refresh 
  function readToDosFromStorage(){
    for(var i = 9; i<18; i++) {
      $(`#hour-${i} .description`).val(localStorage.getItem(`hour-${i}`)) // Using the id and template literals to properly reassign locally stored saved information
    }
  }

  // TODO: Add code to display the current date in the header of the page.
  function displayDate() {
    var dayToday = dayjs().format('dddd, MMM D');
    dayDisplayEl.text(dayToday);
  }

  displayDate();
  setInterval(displayDate, 60000); // check every minute
  updateHours();
  setInterval(updateHours, 60000); // check every minute

});