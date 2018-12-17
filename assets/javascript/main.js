$(document).ready(function() {
  //   //change the size of the logo when user hovers to give the dynamic feel
  //   $(".logo").hover(function(){
  //     //mouse in
  //    $(this).css("width",'125px');
  // },function(){
  //     //mouse out
  //     $(this).css("width",'100px');
  //  });

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
      1000
    );
  });
  $("#location").
});
