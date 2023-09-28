$(function () {
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  var appointments = {};// object that will store appointment description

  $(".btn").on("click", function () {
    var description = $(this).siblings(".description").val();// gets the value of button's sibling description
    var timeBlock = $(this).parent().attr("id");// gets the id of button's parent time block
    if (localStorage.getItem("appointments") === null) {
      appointments = {};// if local storage is empty, replace for an empty object
    } else {
      appointments = JSON.parse(localStorage.getItem("appointments"));// gets local storage string and turn into an object
    }
    appointments[timeBlock] = description;// creates an object key using the timeBlock id(button's parent) and the value is description(value of button's sibling)
    localStorage.setItem("appointments", JSON.stringify(appointments));// set the object appointments as a string on localStorage
  });
});

