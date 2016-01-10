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
    // this.showLog(this.allErrors['name']);
    //RETURN THE OBJECT ITSELF//
    return this;
  }
  //
  addSuccess(response,url){
    this.allSuccess.dataLogged.push({
                      'response'  : response                  || "no response came back",
                      'status'    : 'ajax call successfully',
                      'address'   : url                       || "no address was passed"
                   });
    // this.showLog();
    return this;
  }

  // PARAMETERS
  // actions : string (caseinsensitive)
    // case string : must be => 'all' || 'sucessfull' || 'failed'
   showLog(actions){
    // IF NOTHING WAS PASSAED AS PARAMETER//
      if(!actions){
        console.log("No parameter was passed to showLog()"); //TELL THE ERROR//
        return this;                                        //CLOSE THE PROGRAM//
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
          }
        }
      }
    //IF NOTHING IS LOGGED YET//
  //   if(!this.allErrors.dataLogged.length && !this.allSucess.dataLogged.length){
  //     console.log("No data logged yet"); //TELL THE USER//
  //     return this; //CLOSE THE PROGRAM//
  //   }
  //
  //   for()
  //   //IF NO SUCCESS LOG IS STORE, JUST SHOW THE ERRORS//
  //   if(!this.allSuccess.length){
  //     for(var index in this.allErrors){
  //       console.log("Error # " + index);
  //       console.log(" \t" + Object.keys(this.allErrors[index])[0] + " ==> " + this.allErrors[index]['error type']);
  //       console.log(" \t" + Object.keys(this.allErrors[index])[1] + " ==> " + this.allErrors[index]['error description']);
  //       console.log(" \t" + Object.keys(this.allErrors[index])[2] + " ==> " + this.allErrors[index]['address']);
  //       console.log("\n");
  //     }else{
  //       for()
  //     }
  //   }
  //
  //   return this;
  }//END OF .showLog()//

}

var test = new LogOOP();
