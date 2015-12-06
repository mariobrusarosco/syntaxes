//PURE JAVASCRIPT//

window.onload = function(){

  //SET THE SECTION HEIGHT IF CSS calc() IS NOT SUPPORTED//
  function fixHeight(){
    var
      section       = document.querySelector("section"),
      navbar        = document.querySelector("nav"),
      navHeight     = navbar.offsetHeight,
      windowHeight  = window.outerHeight;

      section.style.height = (windowHeight - navHeight)+ "px";
      // alert("working");
  };
  // fixHeight();
  //SET THE SECTION HEIGHT IF CSS calc() IS NOT SUPPORTED//


  function navBar(){
    var
      menuArea    = document.querySelector(".menu_area"),
      menuBtn     = document.querySelector(".menu_btn"),
      menuOptions = document.querySelector(".menu_options");
  }
};


//jQuery//

var Menu = {
  open_close : function(event){
                  var
                    $node = $(this),
                    $list = $node.next(".menu_options").fadeToggle(700);

                    // console.log($node);
                    // console.log($list.html());
              },
};



$(function(){

$("#menu_btn").click(Menu.open_close);//EVENT HANDLER FOR A CLICK ON THE PAGE'S MENU//





});
