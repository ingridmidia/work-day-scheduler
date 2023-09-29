$(function () {
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  var appointments = JSON.parse(localStorage.getItem("appointments")) || [];// array that will store new appointments

  $(".btn").on("click", function () {
    var description = $(this).siblings(".description").val();// gets the value of button's sibling description
    var timeBlock = $(this).parent().attr("id");// gets the id of button's parent time block

    var newAppointment = { // object that will store appointment time and user description
      hour: timeBlock,
      description: description,
    }

    var appointmentAlreadyExists = false;
    //checks if an appointment already exists for the hour
    for (var i = 0; i < appointments.length; i++) {
      if (appointments[i].hour === newAppointment.hour) {
        appointments[i].description = newAppointment.description;// replaces description 
        appointmentAlreadyExists = true;
      }
    }
    // if appointment does not exist for the hour, add new appointment
    if (!appointmentAlreadyExists) {
      appointments.push(newAppointment);
    }

    localStorage.setItem("appointments", JSON.stringify(appointments));// set the object appointments as a string on localStorage
  });

  function renderAppointments() {
    for (var i = 0; i < appointments.length; i++) {
      var timeBlockId = appointments[i].hour;
      var descriptionText = appointments[i].description;
      // looks for id that matches the appointment hour then adds description text to textarea
      $("#" + timeBlockId).children().eq(1).text(descriptionText);
    }
  };

  renderAppointments();

  function showColoredTime() {
    var currentHour = dayjs().format("H");// gets the current hour in 24 hour format

    $(".time-block").each(function () {
      // gets the id of each time block to compare with current hour
      if ($(this).attr("id") === currentHour) {
        $(this).addClass("present");
      } else if ($(this).attr("id") < currentHour) {
        $(this).addClass("past");
      } else {
        $(this).addClass("future");
      }
    });
  }

  showColoredTime();
});

