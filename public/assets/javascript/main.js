$(document).ready(function() {
  // $.ajax({
  //   url:
  //     "https://cors-anywhere.herokuapp.com/" +
  //     "https://api.yelp.com/v3/businesses/eyebrow-queen-salon-oakland/reviews",
  //   method: "GET",
  //   contentType: "JSON",

  //   beforeSend: function(xhr) {
  //     xhr.setRequestHeader(
  //       "Authorization",
  //       "Bearer bodr0C5NbsgwzXAY66PQgwsXriZVq25XHKYI_c0eKB3bU1Oc_wyGi7rM0IANKu2IknzKhXd8Mw3DuQNAnLTRklS96KP28l5jlLHJ-FtWd_Y1dM2pwWeR0jQ_2oYeXHYx"
  //     );
  //   }
  // }).done(res => {
  //   console.log(res.reviews[0]);
  // });

  $.get("/reviews", res => {
    console.log(res.reviews[0].text);
    // $("#text").append(res.reviews[0].text);
  });
  $("#submit_button").click(event => {
    event.preventDefault();
    // fill the form first - All fields Required
    const name = $("#contact-name").val();
    const email = $("#contact-email").val();
    console.log("email: ", email);
    const subject = $("#contact-subject").val();
    const message = $("#contact-message").val();

    let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    console.log(res);
    if (name === "" || subject === "" || message === "") res = false;
    if (res) {
      $.post(
        "/contact",
        {
          name: name,
          email: email,
          subject: subject,
          message: message
        },
        (data, status) => {
          if (status === "success") {
            $("#contact-name").val("");
            $("#contact-email").val("");
            $("#contact-subject").val("");
            $("#contact-message").val("");
          }
          swal("Sent !", "Your Message has been Successfully Sent", "success");
        }
      );
    } else {
      swal(
        "All fields are required!! \nPlease verify the information on the form"
      );
    }
  });

  //change the color of up-arrow key at the bottom when user hovers
  $(".scroll-arrow").hover(
    function() {
      //mouse in
      $(".scroll-arrow").css("color", "black");
    },
    function() {
      //mouse out
      $(".scroll-arrow").css("color", "rgb(15, 59, 88)");
    }
  );
  //display up arrow key at the bottom only when user scrolls down
  $(window).scroll(function() {
    var scrollTop = $(this).scrollTop();

    $(".scroll-arrow").css({
      opacity: function() {
        var elementHeight = $(this).height();
        return 1 - (elementHeight - scrollTop) / elementHeight;
      }
    });
  });
  $(".scroll").click(function(e) {
    e.preventDefault();
    $("body,html").animate(
      {
        scrollTop: $(this.hash).offset().top
      },
      300
    );
  });
});
