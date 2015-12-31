//====START UP FUNCTION =====//
  //THIS FUNCTION IS SUPPOSED TO MAKE OTHER TO RUN//
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
                        $row = $("<tr/>").append($langDesc,$syntaxDesc,$syntaxBody,$syntaxNotes);
                        //INSERT THE ROW INTO THE <tbody>//
                        $tbody.append($row);
                        // console.log(currentJSON[i]);
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
                    }
};

var Syntax = {
   openNewWindow  : function(){
                    Page.createOverlay();
                    var $myModal = $(".my_modal").load("./includes/new-syntax.html");

                  },


   newSyntax      : {
                        newSyntaxForm   : {
                                            run  : function(){
                                                    // $()
                                                    console.log("newSyntaxForm is running");
                                                  }
                                          },

                        newSyntaxFields : {
                                            run   : function(){
                                                    $("main").on("keypress","#new_syntax_form .text_field",function(event){
                                                      var $node       = $(this);
                                                    //       $nodeHeight = parseFloat($node.css("height").substring(0,($node.css("height").indexOf("px"))));
                                                    //       which       = event.which,
                                                    //       console.log($node);
                                                    //       console.log($nodeHeight);
                                                    //       console.log(typeof $nodeHeight);
                                                    //   if(which === 13){
                                                    //     //INCREASE FIELD'S HEIGHT IN 10px//
                                                    //     $nodeHeight += 15;
                                                    //     $node.css("height",$nodeHeight);
                                                    //     console.log($nodeHeight);
                                                    //     console.log($node.css("height"));
                                                    //     // alert("fuckig enter!");
                                                    //   };
                                                    //   // console.log("a key was pressed inside a text field");
                                                    //   console.log(event.which);
                                                    });
                                                    console.log("newSyntaxFields is running");
                                                  }
                                        }
                    }
};
//GLOBAL OBJECTS//

  //FUNCTIONS TO RUN AUTOMATICALLY//
  StartUp(Syntax.newSyntax.newSyntaxForm);
  StartUp(Syntax.newSyntax.newSyntaxFields);
  //FUNCTIONS TO RUN AUTOMATICALLY//


$(document).ready(function(){

  //SEARCH SYNTAX BUTTON//
  $("main").on("click","#submit_search_btn",Search.query);
  //SELECT OR UNSELECT ALL//
  $("main").on("click","#unselect_all_btn,#select_all_btn",Navigation.toggleLangs);
  //CREATE NEW SYNTAX//
  $("main").on("click","#new_syntax_btn",Syntax.openNewWindow);



});
