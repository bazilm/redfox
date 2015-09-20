
$(document).ready(
  function(){
    $("#iframe").width($(window).width());

      $("#iframe").height($(window).height());



var browser = document.querySelector("#iframe");

browser.addEventListener("mozbrowserloadstart", function( event ) {
  console.log("The content is loading");
  console.log($("#iframe").attr("src"));
});


browser.addEventListener('mozbrowsererror', function (event) {

   alert("Loading error: " + event.detail);
 });

 // When a user follows a link, we make sure the new location is displayed in the address bar
 browser.addEventListener('mozbrowserlocationchange', function (event) {
   var url = event.detail;

   var urlhash = url.split("#")
   var client_info = urlhash[1].split("&")
   var access_token = client_info[0].split("=")[1];
   console.log(access_token);
   init(access_token);

   get_subreddits();
 });
});
