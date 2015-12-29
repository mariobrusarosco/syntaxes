//GLOBAL OBJECTS//
var Log    = {
  success    : [],
  addSuccess : function(response,url){
                var obj = {};
                    obj['response']  = response;
                    obj['status']    = "ajax call successfully";
                    obj['address']   = url;
                    Log.success.push(obj);
              },
  errors     : [],
  addError   : function(givenStatus,givenError,url){
                var obj = {};
                    obj['status']      = givenStatus;
                    obj['description'] = givenError;
                    obj['address']     = url;

                    Log.errors.push(obj);
              }
};

var Search = {
  query    : function(event){
              event.preventDefault();

              //STORE SOME VARIABLES//
              var selectedLangs = $("#search_form input[name='lang[]']:checked"),
                         values = [],
                            url = "./hlpers/search-syntax.php";
              //STORE SOME VARIABLES//

              //FOR EACH CHECKBOX WITH THE STATUS OF 'CHECKED', INSERT ITS VALUE INTO AN ARRAY CALLED 'values'//
              selectedLangs.each(function(){
                values.push($(this).val());
              });
              // console.log(form);
              // console.log(values);
              //STORE SOME VARIABLES//

              //AJAX CALL//
              $.ajax({
                "url"     : url,
                "type"    : "post",
                "data"    : {
                              "lang" : values
                            },
                "success" : function(response,status,xhr){
                              console.log(response);
                              Log.addSuccess(response,url);
                            },
                "error"   : function(xhr,status,error){
                              Log.addError(status,error,url);
                          }
              });
              //AJAX CALL//

              // return false;
            }
};
//GLOBAL OBJECTS//

$(document).ready(function(){

//SEARCH SYNTAX BUTTON//
$("main").on("click","#submit_search_btn",Search.query);

});
