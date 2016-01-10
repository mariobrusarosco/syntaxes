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















class myAjax{
  constructor(data,url,success,error,datatype,method,jquery){
    this.data      = data                     || {};
    this.url       = url                      || "no url was passed";
    this.success   = success                  || "no function defined when the call is successfull";
    this.error     = error                    || "no function defined when the call fails";
    this.datatype  = datatype                 || null;
    this.method    = method                   || 'ajax';
    // this.method    = this.setMethod(method)   || 'post';
    this.jquery    = jquery                   || false;
    this.log       = {};
  }

  setSuccess(fn){
    this.success = fn;
    return this;
  }

  setError(fn){
    this.error = fn;
    return this;
  }

  call(){
      switch(this.method){
        case "json":
          return $.getJSON();
          break;
        default:
          return $.ajax({
                          'url'     : this.url,
                          'data'    : this.data,
                          'method'  : 'post',
                          'success' : this.success
                        }
                 );
      }
  }
}

//                    data,url,success,error,datatype,method,jquery)
var mySucces =  function(response){
                  alert(response);
                }
var ajax = new myAjax("myData","./helpers/search-syntax.php",mySucces,null,"json","ajax",true);

class LogOOP{
  constructor(){
    this.allAjax = []; //ARRAY TO STORE ALL LOGS FROM AJAX CALLS//
  }

  addAjax(param){
    this.allAjax.push(param.log);
  }


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
        //STORE ALL TYPES OF ACTIONS INSIDE A VARIABLE//
        var action = [
                      this.allAjax
                     ];
        //FOR EACH TYPE OF ACTION//
        for(var index in action){
          //CHECK IF THE TYPE OF ACTION IS SET TO BE VISIBLE//
          if(action[index]['visible'] === true){
            //IF IT IS...SHOW THE TYPE OF ACTIONS//
            console.log(action[index]['name'] + " Actions");
            //GO THE THE ACTION ARRAY NAMED 'dataLogged'.//
            var dataLogged = action[index]['dataLogged'];
              //IF THIS ARRAY IS EMPTY... TELL IT ON CONSOLE AND JUMP TO THE NEXT ITERATION//
              if(dataLogged.length === 0){
                console.log("Nothing stored inside of " + action[index]['name'] + " Actions yet");
                continue;
              };
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

}//END OF CLASS LogOOP//

var test = new LogOOP();
