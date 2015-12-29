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
              var         $form = $("#search_form"),
                  selectedLangs = $form.find("input[name='lang[]']:checked"),
                         values = [],
                         string = $form.find("#search_field").val(),
                            url = "./helpers/search-syntax.php",
                    currentJSON = "";
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
                              "lang"   : values,
                              "string" : string
                            },
                "success" : function(response,status,xhr){
                              console.log(response);
                              //LOG THE RESULT//
                              Log.addSuccess(response,url);
                              //CALL A METHOD TO GENERATE THE HTML//
                              Search.loadResult(response);
                            },
                "error"   : function(xhr,status,error){
                              //LOG THE RESULT//
                              Log.addError(status,error,url);
                          }
              });
              //AJAX CALL//

              // return false;
            },//END OF query()//
 loadResult: function(givenJSON){
                //PARSE THE JSON//
                currentJSON = JSON.parse(givenJSON);
                //STORE SOME VARIABLES//
                  var lengthJSON = currentJSON.length,
                          $tbody = $(".results_table tbody");
                //CLEAR THE PREVIOUS TABLE'S CONTENT//
                $tbody.empty();
                //INSERT THE ROW AND CELLS//
                  for(var i = 0; i < lengthJSON; i++){
                      //CREATE THE ROW'S CELLS//
                     var $langDesc    = $("<td/>").addClass("lang_description").text(currentJSON[i]['languageDesc']),
                         $syntaxDesc  = $("<td/>").addClass("syntax_desc").text(currentJSON[i]['syntaxDesc']),
                         $syntaxBody  = $("<td/>").addClass("syntax_body").text(currentJSON[i]['syntaxBody']),
                         $syntaxNotes = $("<td/>").addClass("syntax_notes").text(currentJSON[i]['syntaxNotes']),
                        //CREATE THE ROW//
                        $row = $("<tr/>").append($langDesc,$syntaxDesc,$syntaxBody,$syntaxNotes);
                        //INSERT THE ROW INTO THE <tbody>//
                        $tbody.append($row);
                        // console.log(currentJSON[i]);
                  }//END OF for() LOOP//
             }//END OF loadResult()//
};
//GLOBAL OBJECTS//

$(document).ready(function(){

//SEARCH SYNTAX BUTTON//
$("main").on("click","#submit_search_btn",Search.query);

});
