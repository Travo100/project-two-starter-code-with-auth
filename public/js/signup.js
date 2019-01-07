$(document).ready(function() {
  $("#user-sign-up").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/signup",
      data: {
        email: $("#email")
          .val()
          .trim(),
        password: $("#password")
          .val()
          .trim()
      }
    })
      .then(function(data) {
        console.log(data);
        window.location.replace(data);
      })
      .catch(function(err) {
        alert(err);
      });
  });
});
