  //SET THE SECTION HEIGHT IF CSS calc() IS NOT SUPPORTED//
if($("#viewport_test").width() !== 2){
  function fixHeight(){
    var
      section       = document.querySelector(".projects_area"),
      navbar        = document.querySelector("nav"),
      navHeight     = navbar.offsetHeight,
      windowHeight  = window.outerHeight;

      section.style.height = (windowHeight - navHeight)+ "px";
  };
  fixHeight();
  alert("Calc is not supported");
}  //SET THE SECTION HEIGHT IF CSS calc() IS NOT SUPPORTED//


///////////////////////// OBJECTS//////////////////////////////
var Page = {
  stickyBar   : function(event){

                  if($("#fixed_header").attr("hidden") === true){

                  }else{

                  }
                  console.log($(this).scrollTop());
                }
};

var Menu = {
  // open_close : function(event){
  //                 var
  //                   $node = $(this),
  //                   $list = $node.next(".menu_options").fadeToggle(300);
  //                   // console.log($node);
  //                   // console.log($list.html());
  //             }
};
///////////////////////// OBJECTS//////////////////////////////





$(function(){

// $("#menu_btn").click(Menu.open_close);//EVENT HANDLER FOR A CLICK ON THE PAGE'S MENU//

$(window).scroll(Page.stickyBar);

$(".my_projects").on("li:first-child",
                      {
                        mouseenter : function(){
                                  // console.log(event);
                                  var $myEvent = $(event);
                                  console.log("Offset X " + event.offsetX);
                                  console.log("Client X " + event.offsetX);
                                  console.log("Page   X " + event.pageX);
                                  console.log("Screen X " + event.screenX);
                                  console.log("Offset Y " + event.offsetY);
                                  console.log("Client Y " + event.offsetY);
                                  console.log("Page   Y " + event.pageY);
                                  console.log("Screnn Y " + event.screenY);
                                  console.log(event.type);

                                  event.type == "mousedown" ? alert("working") : console.log("working");
                                },
                            mouseout :function(){
                                   console.log("Mouse out motherfucker!!!");
                                 }
                          }
                      );
});
