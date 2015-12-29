//GLOBAL OBJECTS//
var Search = {
  query    : function(event){
              event.preventDefault();
              console.log("working");

              //START AN AJAX CALL//
              $.ajax(
                "../helpers/search-syntax.php",
                
              );
              // return false;
            }
};
//GLOBAL OBJECTS//

$(document).ready(function(){

//SEARCH SYNTAX BUTTON//
$("main").on("click","#submit_search_btn",Search.query);

});
