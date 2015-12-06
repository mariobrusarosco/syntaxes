//PURE JAVASCRIPT//

window.onload = function(){



  function navBar(){
    var
      menuArea    = document.querySelector(".menu_area"),
      menuBtn     = document.querySelector(".menu_btn"),
      menuOptions = document.querySelector(".menu_options");
  }
};


//jQuery//


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
