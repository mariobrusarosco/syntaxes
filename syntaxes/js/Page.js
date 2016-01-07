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
