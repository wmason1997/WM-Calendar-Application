// import dayjs from 'dayjs';
// import advancedFormat from 'dayjs/plugin/advancedFormat.js'; dayjs.extend(advancedFormat);


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var dayDisplayEl = $('#currentDay');
var timeBlockEls = $('.time-block');

var ninthHour = $('#hour-9');
var tenthHour = $('#hour-10');
var eleventhHour = $('#hour-11');
var twelfthHour = $('#hour-12');
var thirteenthHour = $('#hour-13');
var fourteenthHour = $('#hour-14');
var fifteenthHour = $('#hour-15');
var sixteenthHour = $('#hour-16');
var seventeenthHour = $('#hour-17');

// gotta wrap in jQuery call


$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

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
  //
  // TODO: Add code to display the current date in the header of the page.

  function displayDate() {
    var dayToday = dayjs().format('dddd, MMM D'); // have to import advancedFormat to add the o after the D
    dayDisplayEl.text(dayToday);
  }

  displayDate();
  setInterval(displayDate, 60000); // check every minute
  updateHours();
  setInterval(updateHours, 60000);

});