"use strict";

//GLOBAL OBJECTS//
var Log    = {
  success    : [],
  addSuccess : function(response,url){
                var obj = {
                      'response'   : response,
                      'status'     : "ajax call successfully",
                      'address'    : url
                    };
                  Log.success.push(obj);
              },
  errors     : [],

  addError   : function(givenStatus,givenError,url){
                var obj = {
                      'status'       : givenStatus,
                      'description'  : givenError,
                      'address'      : url
                    };
                Log.errors.push(obj);
              }
};


// OBJECT ORIENTED VERSION //
class LogOOP{
  constructor(){
    this.allSuccess   = {
                          'name'       : 'Successfull',
                          'visible'    : true,
                          'dataLogged' : []
    };
    this.allErrors   = {
                          'name'       : 'Failed',
                          'visible'    : true,
                          'dataLogged' : []
    };
  }

  addError(errorType,errorDesc,url){
    //INSERT DATA INTO THE ARRAY THAT IS INSIDE THE OBJECT//
    this.allErrors.dataLogged.push({
                      'error type'         : errorType    || "no error type was passed",
                      'error description'  : errorDesc    || "no error description was passed",
                      'address'            : url          || "no address was passed"
                    });
    //AFTER THAT, CALL .showLog() TELLING IT THE TYPE OF ACTION TO BE SHOWN ON CONSOLE. CONSOLE SHOULD SHOW ALL DATA INSIDE THE ARRAY 'dataLogged'//
    this.showLog(this.allErrors['name']);
    //RETURN THE OBJECT ITSELF//
    return this;
  }


  addSuccess(response,url){
    this.allSuccess.dataLogged.push({
                      'response'  : response                  || "no response came back",
                      'status'    : 'ajax call successfully',
                      'address'   : url                       || "no address was passed"
                   });
    this.showLog(this.allSucess);
    return this;
  }

  // PARAMETERS
  // actions : string (caseinsensitive)
    // case string : must be => 'all' || 'sucessfull' || 'failed'
   showLog(actions){
    // IF NOTHING WAS PASSAED AS PARAMETER//
      if(!actions){
        console.log("No parameter was passed to showLog()");              //TELL THE ERROR//
        return this;                                                      //RETURN THE OBJECT ITSELF//
      }
      else if(actions.toLowerCase() !== "all" && actions.toLowerCase() !== "successfull" && actions.toLowerCase() !== "failed"){
        console.log("A wrong parameter was passsed to showLog()");        //TELL THE ERROR//
        return this;                                                      //RETURN THE OBJECT ITSELF//
      }
    // IF SOMETHING WAS PASSAED...//
      else{
          /* STRUCTURE EXAMPLE
          typeOfAction{
                      'nameProp'       : 'nameVal',
                      'visibleProp'    : 'visibleVal',
                      'dataLoggedProp' : [
                                            === OBJECT #0 ====
                                          {
                                            'key1'  : "value1",
                                            'key2'  : "value2"
                                          },
                                            === OBJECT #1 ====
                                          {
                                            'key1'  : "value1",
                                            'key2'  : "value3",
                                            'key3'  : "value3"
                                          }
                                      ]
                  }
          STRUCTURE EXAMPLE */

        //STORE ALL TYPES OF ACTIONS INSIDE A VARIABLE//
        var action = [this.allErrors,this.allSuccess];
        //FOR EACH TYPE OF ACTION//
        for(var index in action){
          //CHECK IF THE TYPE OF ACTION IS SET TO BE VISIBLE//
          if(action[index]['visible'] === true){
            //IF IT IS...SHOW THE TYPE OF ACTIONS//
            console.log(action[index]['name'] + " Actions");
            //GO THE THE ACTION ARRAY NAMED 'dataLogged'.//
            var dataLogged = action[index]['dataLogged'];
              //IF THIS ARRAY IS EMPTY... TELL IT ON CONSOLE AND JUMP TO THE NEXT ITERATION//
              // if(dataLogged.length === 0){
              //   console.log("Nothing stored inside of " + action[index]['name'] + " Actions yet");
              //   continue;
              // };
            //FOR EACH LOG INSIDE OF '.dataLogged//
            for(var index2 in dataLogged){
              //STORE AN ARRAY CONTAINING THE LOG'S KEYS INSIDE A VARIABLE//
              var logKeys = Object.keys(dataLogged[index2]);
              //FOR EACH KEY INSIDE A LOG//
              for(var index3 in logKeys){
                console.log("\t\t" + logKeys[index3] + " ==> " + dataLogged[index2][logKeys[index3]]);
              }
              console.log("\n");
            }
          }//IF A TYPE OF ACTION IS NOT SET TO VISIBLE, SHOW AN ALERT ON CONSOLE//
          else{
            console.log("This type of action is currently not visible to be logged: " + action[index]['name'] + " Actions");
          }
        }//END OF for(var index in action)//
      }//END OF ELSE//
  }//END OF .showLog()//

}

var currentLog = new LogOOP();


class Overlay{
    constructor(){
    //IF AN ELEMENT WITH A ID OF 'overlay' ALREADY EXISTS THAN USE IT, OTHERWISE CREATE A NEW ONE//
    var $overlay = (!$("#overlay2").length) ? $("<div id='overlay2'></div>") : $("#overlay2");
          $overlay.appendTo("main")

    //RUN AN EVENT HANDLERS FROM THIS CLASS//
    this.run();
    //RETURN THE OBJECT ITSELF//
    return this;
  }

  create(){
    console.log("Overlay has been created");
  }

  remove(){
    $("#overlay2").remove();
  }

  run(){
    //SET THE EVENT HANDLER TO THE OVERLAY...IF ITS CLICKED, IT SHOULD REMOVE ITSELF//
    $("main").on("click","#overlay2",this.remove);
  }
}//END OF CLASS Overlay//

/*
* id       : string
* width    : integer
* height   : integer
* top      : integer
* bottom   : integer
* centered : boolean
*
*/
class Modal{
  constructor(id,width,height,top,bottom,centered){
    this.id        =  id       || null;
    this.width     =  width    || "0";
    this.height    =  height   || "0";
    this.top       =  top      || null;
    this.bottom    =  bottom   || null;
    this.centered  =  centered || true;
    //RETURN THE OBJECT//
    return this;
   }//END OF THE CONSTRUCTOR METHOD//

  //NO PARAMETERS REQUIRED//
   insert(){
     //IF THERE'S NO OVERLAY TO APPEND THE MODAL//
     if(!$("#overlay2").length){
        //CHECK IF THERE'S AN log Object ALREADY CREATED//
         if(typeof currentLog === 'undefined'){ //IF NOT...//
           console.log("Could not find an object of LogOOP to log the error.////  path: /class Modal/alert()");
         }
         else{  //IF IT IS//
         //LOG THE ERROR//
           currentLog.addError("missing html element","Couldn't find an overlay element to append the modal.","/class Modal/alert()/");
         }
         return this;
     }
     //END OF ACTIONS WHEN THERE'S NO OVERLAY TO APPEND THE MODAL//

     ///IF THERE'S AN OVERLAY, IT'S OKAY TO APPEND THE MODAL//
       var $overlay = $("#overlay2");
       //IF THERE'S ALREADY A MODAL WITH THE ID USED TO INSTANTIATE THE MODAL USE IT , OTHERWISE CREATE A NEW ONE//                                                                         //GET THE OVERLAY
       var $modal   = (!$("#" + this.id).length) ? $("<div class='modal' id='" + this.id + "'" + "></div>") : $("#" + this.id);
            $modal.css({                                //SET THE CSS DATA
              'width'   : this.width,
              'height'  : this.height,
              'top'     : this.top,
              'bottom'  : this.bottom
            })
            .appendTo($overlay);
                                                        //APPEND THE MODAL
   }//END OF insert()//

}//END OF CLASS Modal//

//============== SYNTAX======================//
class Syntax2{
  constructor(){

    this.run();
    // return this;
  }

  editSyntax(){
      var overlay = new Overlay().create();
      var modal   = new Modal("edit_syntax").insert();
      console.log("Edit Syntax");
  }

  run(){
    //SET THE EVENT HANDLER FOR A SINGLE CLICK ON A SYNTAX//
    $("main").on("click", ".syntax_row", this.editSyntax);
    console.log("Syntax 2 is running");
  }
}
//============== SYNTAX======================//
