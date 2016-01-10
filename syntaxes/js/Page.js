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
    this.allSucess   = [];
    this.allErrors   = [];
  }

  addError(errorType,errorDesc,url){
    this.allErrors.push({
                      'error type'         : errorType    || "no error type was passed",
                      'error description'  : errorDesc    || "no error description was passed",
                      'address'            : url          || "no address was passed"
                    });
    this.showLog();
    return this;
  }

  addSuccess(response,url){
    this.allSucess.push({
                      'response'  : response,
                      'status'    : 'ajax call successfully',
                      'address'   : url
                   });
    this.showLog();
    return this;
  }

  showLog(){
    if(!this.allErrors.length && !this.allSucess.length) console.log("No data logged yet");
    
    for(var index in this.allErrors){
      console.log("Error # " + index);
      console.log(" \t" + Object.keys(this.allErrors[index])[0] + " ==> " + this.allErrors[index]['error type']);
      console.log(" \t" + Object.keys(this.allErrors[index])[1] + " ==> " + this.allErrors[index]['error description']);
      console.log(" \t" + Object.keys(this.allErrors[index])[2] + " ==> " + this.allErrors[index]['address']);
      console.log("\n");
    }

    return this;
  }

}

var test = new LogOOP();
