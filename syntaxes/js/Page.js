//GLOBAL OBJECTS//
var Log    = {
  success    : [],
  addSuccess : function(response,url){
                var obj = {
                      'response']  : response;
                      'status'     : "ajax call successfully";
                      'address'    : url
                    };
                  Log.success.push(obj);
              },
  errors     : [],
  addError   : function(givenStatus,givenError,url){
                var obj = {
                      'status']      : givenStatus;
                      'description'] : givenError;
                      'address']     : url;
                    };
                Log.errors.push(obj);
              }
};
