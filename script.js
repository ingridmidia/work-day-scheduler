$(function () {
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  var appointments = JSON.parse(localStorage.getItem("appointments")) || [];// array that will store new appointments

  $(".btn").on("click", function () {
    var description = $(this).siblings(".description").val();// gets the value of button's sibling description
    var timeBlock = $(this).parent().attr("id");// gets the id of button's parent time block

    var newAppointment = { // object that will appointment time and user description
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
});

