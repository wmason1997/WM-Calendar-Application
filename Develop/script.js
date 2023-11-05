// import dayjs from 'dayjs';
//import advancedFormat from 'dayjs/plugin/advancedFormat.js'; 
// dayjs.extend(advancedFormat);


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var dayDisplayEl = $('#currentDay'); // move inside the anonymous function
var timeBlockEls = $('.time-block'); // move insider the anonymous function


$(document).ready(function() {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  readToDosFromStorage(); // load the previously entered TODOs first when rendering the page

  // Use jQuery to make all saveBtn class items call this saving to localStorage functionality
  $('.saveBtn').on('click', function() {
    var value = $(this).siblings('.description').val();
    var hour = $(this).parent().attr('id');
    localStorage.setItem(hour,value);
  })

  //
  // Added code to apply the past, present, or future class to each time block in updateHours() function
  function updateHours() {
    var rightNowHour = parseInt(dayjs().format('H'));
    for (var i = 0; i < timeBlockEls.length; i++) {
      var id = timeBlockEls[i].id;
      var blockHour = parseInt(id.substring(5)); //may have to add numeric

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
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  
  // Puts the locally stored saved TODOS back on calendar upon page refresh 
  function readToDosFromStorage(){
    for(var i = 9; i<18; i++) {
      $(`#hour-${i} .description`).val(localStorage.getItem(`hour-${i}`))
    }
  }

  function saveToDosToStorage(TODOS) {
    localStorage.setItem('savedTODOS', JSON.stringify(TODOS))
  }


  // TODO: Add code to display the current date in the header of the page.
  function displayDate() {
    var dayToday = dayjs().format('dddd, MMM D'); // have to import advancedFormat to add the o after the D (momentJS could fix, try later, moment where dayjs is right now)
    dayDisplayEl.text(dayToday);
  }

  displayDate();
  setInterval(displayDate, 60000); // check every minute
  updateHours();
  setInterval(updateHours, 60000); // check every minute

});