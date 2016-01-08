// //====== AJAX SETUP FUNCTION ========//
// $(document).ajaxError(function(xhr,status,error,url){
                // Log.addError(status,error,url);
// });
//====== AJAX SETUP FUNCTION ========//


//====START UP FUNCTION =====//
  //THIS FUNCTION IS SUPPOSED TO MAKE OTHERS TO RUN//
function StartUp(myObject){
    $(document).ready(myObject.run);
};
//====START UP FUNCTION =====//

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
                              // console.log(response);
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

                //===========================================================================//
                //CHECK IF THE 'status' PROPERTY WAS PASSED WITHIN THE JSON OBJECT//
                if(currentJSON.hasOwnProperty("status")){

                //IF IT WAS, THAT MEANS NO RESULTS WERE FOUND ON THE PERFORMED QUERY. INFORM THE USER ABOUT THE QUERY'S STATUS//
                  //STORE SOME VARIABLES//
                      var status = currentJSON['status'],
                             msg = currentJSON['msg'],
                      $alertArea = $(".alert_area"),
                          $alert = $("<p/>").addClass("my_alert");
                  //DEFINE THE ALERT'S CORRESPONDENT CLASSE//
                    $alert.addClass(function(){
                      if(status == "no language selected" || status == "no string passed"){
                        return "error";
                      }else{
                        return "warning";
                      }
                    });
                  //INSERT THE ALERT INTO THE PAGE//
                  $alertArea.html($alert.text(msg));
                  return false;
                };
                //===========================================================================//

                //===========================================================================//
                //CLEAR PREVIOUS ALERTS//
                $alertArea = $(".alert_area").empty();
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
                        $row = $("<tr/>").addClass("syntax_row").attr("data-id",currentJSON[i]['syntaxID']).append($langDesc,$syntaxDesc,$syntaxBody,$syntaxNotes);
                        //INSERT THE ROW INTO THE <tbody>//
                        $tbody.append($row);
                        console.log(currentJSON[i]);
                  }//END OF for() LOOP//
                //===========================================================================//
                //RETURN THE NAVIGATION TO THE INITIAL STATE//
                $("#show_hide_nav_btn").prop("checked",false);
             }//END OF loadResult()//
};

var Navigation = {
  toggleLangs    : function(event){
                      var $form = $("#search_form");
                      if($(event.target).attr("id") === "select_all_btn"){
                        $form.find(".lang_option_input").prop("checked",true);
                      }else{
                        $form.find(".lang_option_input").prop("checked",false);
                      };
                   }
};

var Page = {
   createOverlay  : function(event){
                      //IF THERE'S ALREADY AN OVERLAY...............USE IT........ IF NOT CREATE THE OVERLAY HTML ELEMENT AND INSERT IT
                        var $overlay = ($("#overlay").length) ? $("#overlay") : $("<div id='overlay'> \
                                                                                      <span class='close_btn'>X</span> \
                                                                                      <div class='my_modal'></div> \
                                                                                   </div>");
                            $("main").append($overlay);
                      //BIND A CLICK EVENT TO IT, TO REMOVE IT...//
                          $overlay.on("click",Page.removeOverlay);
                      //BIND A KEYUP EVENT TO THE BODY, IF 'ESC' IS PRESSED, THAN REMOVE IT EITHER//
                          $("body").on("keyup",Page.removeOverlay);
                    },

    removeOverlay : function(event){
                      var $target = $(event.target);
                      // console.log($target);
                      //IF A CLICK IS PERFORMED ANYWHERE EXCEPT A MODAL WITH A CLASS 'my_modal'//
                      if($target.is("#overlay") || $target.is(".close_btn")){
                        $("main").find("#overlay").remove();
                      }
                      //OR IF THE 'ESC' KEY IS PRESSED//
                      if(event.which == 27){
                        $("main").find("#overlay").remove();
                      }
                      //REMOVE EVENTS//
                      $(".overlay").off("click",Page.removeOverlay);
                      $("body").off("keyup",Page.removeOverlay);
                    },//END OF 'removeOverlay' //---------------------------------------------------------------------------//
    contextMenu   : {
                        open   : function(){
                                      if($("#context_menu").length){
                                          var $contextMenu = $("#context_menu");
                                          return $contextMenu;
                                      }else{
                                        var $contextMenu = $("<div id='context_menu' class='context_menu'>\
                                                                <span id='open_syntax_menu_context_btn' class='context_menu_btn'>Open</span>\
                                                                <span id='remove_syntax_menu_context_btn' class='context_menu_btn'>Remove</span>\
                                                              </div>");
                                        return $contextMenu;
                                      }//END OF 'else'//
                                  },//END OF 'open'//---------------------------------------------------------------------------//
                        close  : function(){
                                  $("#context_menu").remove();
                                }//END OF 'close' //---------------------------------------------------------------------------//
                    },//END OF 'contextMenu' //---------------------------------------------------------------------------//

    clicks         : {
                        run : function(){
                                $(document).click(function(event){
                                  var $target = $(event.target);
                                  //IF THE CLICKED ELEMENT IS ANYTHING BUT THE CONTEXT MENU OR ANY OF ITS BUTTONS... HIDE THE CONTEXT MENU...//
                                  if(!$target.is(".context_menu_btn")) Page.contextMenu.close();
                                  console.log($target);
                                });
                                console.log("All clicks at (document) are handled over here!!");
                              }

                     }
};

var Syntax = {
   openNewWindow  : function(){
                    Page.createOverlay();
                    var $myModal = $(".my_modal").load("./includes/new-syntax.html");

                  },


   newSyntax      : {
                      example     : {
                                      add    : function(){
                                                  var $examplesArea = $("#examples_area"),
                                                                url = "./includes/example.html";
                                                           $.ajax({
                                                              "url"     : url,
                                                              "success" : function(response,status,xhr){
                                                                          //LOG THE RESULT//
                                                                          Log.addSuccess(response,url);
                                                                          //APPEND A NEW EXAMPLE'S STRUCTURE//
                                                                          $examplesArea.append(response);
                                                                        },
                                                              "error"   : function(xhr,status,error){
                                                                            //LOG THE RESULT//
                                                                            Log.addError(status,error,url);
                                                                            return false;
                                                                        }
                                                           });
                                              },//----------------------------------------------------------------------------------------------------//
                                      remove : function(){
                                                  $node     = $(this),
                                                  $example  = $node.parent().parent().remove();
                                                },//----------------------------------------------------------------------------------------------------//
                                      save   : function(){

                                                }//----------------------------------------------------------------------------------------------------//
                                    }//END OF 'example'//
                    },//END OF newSyntax //----------------------------------------------------------------------------------------------------------------------//

    saveSyntax    : {
                      new      : function(event){
                                    event.preventDefault();
                                      var $node = $(this),
                                          $form = $node.parent(),
                                    $syntaxLang = $form.find("#syntax_lang_field").val(),
                                    $syntaxBody = $form.find("#syntax_body_field").val(),
                                    $syntaxDesc = $form.find("#syntax_desc_field").val(),
                                   $syntaxNotes = $form.find("#syntax_notes_field").val(),
                                  $examplesArea = $("#examples_area"),
                                       examples = [],
                                      $examples = $examplesArea.find("div.example")
                                                                .each(function(){
                                                                  examples.push($(this).find("textarea").val());
                                                                }),
                                           url  = './helpers/save-syntax.php',
                                           data = {
                                                    'syntaxLang' : $syntaxLang,
                                                    'syntaxBody' : $syntaxBody,
                                                    'syntaxDesc' : $syntaxDesc,
                                                    'syntaxNotes': $syntaxNotes,
                                                    'examples'   : examples
                                                  };
                                            console.log(examples);
                                          $.ajax({
                                            'url'     : url,
                                            'data'    : data,
                                            'type'    : 'post',
                                            'success' : function(response){
                                                          var $newSyntaxArea = $("#new_syntax_area").empty(),                                                           //GET THE MODAL AND CLEAR ITS CONTENT//
                                                            $addNewSyntaxBtn = $("<button id='add_new_syntax_btn' class='add_new_syntax_btn'>Add New Syntax</button>"), //A BUTTON TO ADD ANOTHER SYNTAX//
                                                                      $alert = $("</p>").addClass("my_alert");                                                          //AN ALERT MESSAGE//

                                                          //============ ERROR =============== ERROR ================= ERROR ===============//
                                                          if(response[0] != '{'){//IF A JSON OBJECT ISN'T PROPERLY SET, ALERT THE USER AND CLOSE THE AJAX CLASS//
                                                              $addNewSyntaxBtn.text("Try Again");
                                                              $alert.addClass("error");
                                                              //APPEND THE RESULT//
                                                              $newSyntaxArea.append($alert.text("Sorry, syntax could not be saved on the database"),$addNewSyntaxBtn);
                                                              var errorMsg = "There's something right before the JSON Object or there's no JSON Object at all";
                                                              //LOG THE ERROR//
                                                                Log.addError('error',errorMsg,url);
                                                              return false;
                                                          }//============== ERROR =============== ERROR ================= ERROR ===============//

                                                          else{
                                                              var currJSON = JSON.parse(response);                                    //CONVERT THE RESPONSE TO A JSON OBJECT//
                                                                // console.log(currJSON);
                                                              if(currJSON['status'] === 'success') $alert.addClass("warning");         //IN CASE DATA WAS SUCCESSFULLY INSERTED//
                                                              //IN CASE IT WASN'T ...//
                                                              else if(currJSON['status'] === 'error'){
                                                                $addNewSyntaxBtn.text("Try Again");
                                                                $alert.addClass("error");
                                                                if(currJSON['addInfo']) console.log(currJSON['addInfo']);              //IF THERE'S ADDITIONAL INFORMATION, SHOW ON CONSOLE//
                                                              }
                                                                $newSyntaxArea.append($alert.text(currJSON['msg']),$addNewSyntaxBtn);  //APPEND THE RESULT//
                                                           }//END OF 'else'//
                                                      }//END OF 'success'//
                                          });//END OF THE AJAX CALL//

                            }, //END OF 'new'////--------------------------------------------------------------------------------------------------------------------------------------------------------------//
                    },// END OF 'saveSyntax'//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

      editSyntax    : {
                          openSyntax    :  function(event){
                                                var $node = $(this);
                                                    $node.addClass("selected_row"),
                                                    $contextMenu = Page.contextMenu.open();
                                                $("main").append($contextMenu.css({
                                                                                'top'  : event.pageY ,
                                                                                'left' : event.pageX
                                                                              })
                                                            );

                                                  return $contextMenu;

                                            },//END OF 'openSyntax' //----------------------------------------------------------------------------------------------------------------------------------------------//
                          saveSyntax     : function(event){

                                            }//END OF 'saveSyntax' //----------------------------------------------------------------------------------------------------------------------------------------------//
                    },//END OF 'editSyntax'//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
        removeSyntax     : {
                            options : function(){
                                                    //CHECK IF THE USER IS REMOVING THE SYNTAX FROM THE TABLE RESULTS OR FROM THE SYNTAX MODAL CONTEXT//
                                                    var $target = $(event.target);
                                                    if($target.is(".context_menu_btn")){
                                                        //SHOW THE USER A CONFIRMATION BOX INSIDE THE CONTEXT MENU//
                                                        var $contextMenu = $("#context_menu");                               //GET THE CONTEXT MENU//
                                                            $contextMenu.empty();                                            //CLEAR ITS CONTENT//
                                                        var $confirmationBox = $("<div id='remove_confirmation_box' class='confirmation_box'>                                         \
                                                                                    <p>Still wanna remove it?</p>                                                                     \
                                                                                    <div>                                                                                             \
                                                                                      <button id='remove_syntax_menu_context_cancel_btn'  class='confirmation_btn'>Cancel</button>    \
                                                                                      <button id='remove_syntax_menu_context_confirm_btn' class='confirmation_btn'>Remove</button>    \
                                                                                    </div>                                                                                            \
                                                                                  </div>");                                   //CREATE A CONFIRMATION BOX//
                                                            $contextMenu.addClass("confirmation").html($confirmationBox);     //ADD A CLASS 'confirmation' TO CHANGE THE CSS OF '.context_menu' AND INSERT THE CONFIRMATION BOX//

                                                            console.log("Context menu REMOVING");
                                                       }
                                                      else if($target.is(".syntax_modal_btn")){

                                                      }
                            },//END OF 'options' //----------------------------------------------------------------------------------------------------------------------------------------------//
                            confirm : function(){
                                    //START THE FIRST AJAX CALL -> REMOVE THE SELETED SYNTAX//
                                      var    $node = $(this),
                                               url = "helpers/remove-syntax.php",
                                          syntaxID = $("main").find(".selected_row").attr("data-id"),
                                              data = {
                                                        'syntaxID' : syntaxID
                                                     };

                                              $.ajax({
                                                      'url'     :  url,
                                                      'type'    : 'post',
                                                      'data'    :  data,
                                                      'success' :  function(response){
                                                                          //LOG THE FIRST AJAX CALL//
                                                                          Log.addSuccess(response,url);

                                                                          //START THE SECOND AJAX CALL -> PERFORMING THE SAME QUERY AGAIN, AFTER REMOVING A SYNTAX//
                                                                          url  = "helpers/search-syntax.php";
                                                                          data = {
                                                                                    lastQuery : true
                                                                                 };

                                                                          $.ajax({
                                                                            'url'    : url,
                                                                            'type'   : 'post',
                                                                            'data'   : data,
                                                                            'success': function(response2){
                                                                                          Search.loadResult(response2);
                                                                                          //LOG THE SECOND AJAX CALL//
                                                                                          Log.addSuccess(response2,url);
                                                                                      }
                                                                          })
                                                                          //PERFORMING THE SAME QUERY AGAIN, AFTER REMOVING A SYNTAX//
                                                                  },
                                                      'error'   : function(){
                                                                    // Log.addError();
                                                                  },


                                                    });
                                        console.log("confirm exclusion");
                                     },//END OF 'confirm' //----------------------------------------------------------------------------------------------------------------------------------------------//
                            cancel  : function(event){
                                        $("#context_menu").removeClass("confirmation")  //REMOVE THIS CLASS TO MAKE THE 'context_menu's' CSS RETURNS TO THE INITIAL STATE//
                                                          .html("<span id='open_syntax_menu_context_btn' class='context_menu_btn'>Open</span>   \
                                                                <span id='remove_syntax_menu_context_btn' class='context_menu_btn'>Remove</span>"
                                                              );                       //INSERT THE TWO OPTIONS : 'open' and 'remove'//
                                        console.log("cancel");
                                     }//END OF 'cancel' //----------------------------------------------------------------------------------------------------------------------------------------------//
                          },//END OF 'removeSyntax' //----------------------------------------------------------------------------------------------------------------------------------------------//
       syntaxForms   : {
                           //THIS FUNCTION WILL SET ALL BEHAVIORS FOR THE FORM OF A NEW SYNTAX//
                           run  : function(){
                                            var $main = $("main"),
                                     //=================== NEW SYNTAX MODAL =====================//
                                                $form = $main.find("#new_syntax_form"),
                                        addExampleStr = "#add_example_btn",          //STORE THIS ID AS A STRING, IN CASE YOU NEED TO USE MORE THAN ONCE//
                                       $addExampleBtn = $form.find(addExampleStr),   //STORE THE jQuery OBJECT FOR THE ADD EXAMPLE BUTTON//
                                     removeExampleStr = ".remove_example_btn",       //STORE THIS CLASS AS A STRING, IN CASE YOU NEED TO USE MORE THAN ONCE//
                                    $removeExamplebtn = $form.find(removeExampleStr);//STORE THE jQuery OBJECT FOR ALL 'REMOVE EXAMPLE BUTTONS'//
                                           saveSyntax = "#save_syntax_btn",          //STORE THIS ID AS A STRING, IN CASE YOU NEED TO USE MORE THAN ONCE//
                                          $saveSyntax = $form.find(saveSyntax);      //STORE THE jQuery OBJECT FOR THE 'SAVE SYNTAX BUTTON'//
                                         addNewSyntax = "#add_new_syntax_btn",          //STORE THIS ID AS A STRING, IN CASE YOU NEED TO USE MORE THAN ONCE//
                                       $addNewSyntax  = $form.find(addNewSyntax);    //STORE THE jQuery OBJECT FOR 'ADD NEW SYNTAX BUTTON'//

                                     //SET THE EVENT HANDLER FOR A NEW EXAMPLE//
                                       $main.on("click",addExampleStr,Syntax.newSyntax.example.add);
                                     //SET THE EVENT HANDLER FOR REMOVE AN EXAMPLE//
                                       $main.on("click",removeExampleStr,Syntax.newSyntax.example.remove);
                                     //SET THE EVENT HANDLER FOR SAVING A NEW SYNTAX//
                                       $main.on("click",saveSyntax,Syntax.saveSyntax.new);
                                     //SET THE EVENT HANDLER FOR CREATE A NEW SYNTAX AFTER SAVING A SUCCESSFUL ONE//
                                       $main.on("click",addNewSyntax,Syntax.openNewWindow);
                                   //=================== NEW SYNTAX MODAL =====================//

                                   console.log("newSyntaxForm is running");
                                 }
                         },//END OF 'syntaxForms'//

      syntaxResults  :   {
                           run     :  function(){
                                        var $main  = $("main"),
                                            $table = $main.find("table"),
                                            $thead = $table.find("thead"),
                                            $tbody = $table.find("tbody"),
                                              $row = $tbody.find("row");

                                              //SET AN EVENT HANDLER TO EDIT A SYNTAX//
                                              $main.on("dblclick",".syntax_row",Syntax.editSyntax.openSyntax);
                                              //========REMOVE A SYNTAX=============//
                                                  //SET AN EVENT HANDLER TO OPEN A SYNTAX BOX//
                                                    $main.on("click","#remove_syntax_menu_context_btn, #remove_syntax",Syntax.removeSyntax.options);
                                                  ///SET AN EVENT HANDLER TO THE 'CANCEL' BUTTON INSIDE A CONFIRMATION BOX(TO CANCEL THE SYNTAX'S EXCLUSION//
                                                    $main.on("click","#remove_syntax_menu_context_cancel_btn",Syntax.removeSyntax.cancel);
                                                  ///SET AN EVENT HANDLER TO THE 'CONFIRM' BUTTON INSIDE A CONFIRMATION BOX(TO CONFIRM THE SYNTAX'S EXCLUSION)//
                                                    $main.on("click","#remove_syntax_menu_context_confirm_btn",Syntax.removeSyntax.confirm);
                                              console.log("syntaxResults is running");
                                      }
                         }
};//END OF Syntax OBJECT//

//GLOBAL OBJECTS//

  //FUNCTIONS TO RUN AUTOMATICALLY//
  StartUp(Syntax.syntaxForms);
  StartUp(Syntax.syntaxResults);
  StartUp(Page.clicks);
  //FUNCTIONS TO RUN AUTOMATICALLY//


$(document).ready(function(){

  //SEARCH SYNTAX BUTTON//
  $("main").on("click","#submit_search_btn",Search.query);
  //SELECT OR UNSELECT ALL//
  $("main").on("click","#unselect_all_btn,#select_all_btn",Navigation.toggleLangs);
  //CREATE NEW SYNTAX//
  $("main").on("click","#new_syntax_btn",Syntax.openNewWindow);


});
