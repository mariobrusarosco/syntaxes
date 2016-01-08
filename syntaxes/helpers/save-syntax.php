<?php
//SET THE AUTLOAD FUNCTION///
function __autoload($class){
  require_once("../classes/{$class}.php");
}

//STOP THE PROGRAM IF NO DATA IS PASSED BY A POST METHOD//
if(!isset($_POST) || empty($_POST)){
  echo json_encode(
                    array(
                          "status" => "error",
                          "msg"    => "No data was passed by a POST method"
                         )
                  );
   return false;
}

//STOP THE PROGRAM IF THE SYNTAX'S LANGUAGE AND SYNTAX'S BODY WEREN'T PASSED//
if(empty($_POST['syntaxLang']) || empty($_POST['syntaxBody'])){
  echo json_encode(
                    array(
                          "status" => "error",
                          "msg"    => "Syntax's Language or Syntax's Body are mandatory fields and at least one isn't set"
                         )
                  );
  return false;
}

//STORE THE 'POST' DATA//
$lang   = $_POST['syntaxLang'];
$body   = $_POST['syntaxBody'];
  //IF SYNTAX'S DESCRIPTION OR THE SYNTAX'S NOTES ARE EMPTY, SET THEM TO NULL//
$desc   = !empty($_POST['syntaxDesc'])  ? $_POST['syntaxDesc']  : 'null';
$notes  = !empty($_POST['syntaxNotes']) ? $_POST['syntaxNotes'] : 'null';
// //CREATE AN ARRAY TO STORE THE VALUES TO INSERT//
// $valuesToInsert   = ["'null'",$lang,"'{$body}'","'{$desc}'","'{$notes}'"];
$valuesToInsert   = array("null",$lang,"'{$body}'","'{$desc}'","'{$notes}'");

try{

//CONNECT TO A DATABASE//
$conn = DB::connect();
//SET THE CURRENT DATABASE//
$currDB = "syntaxes";        //LOCAL//
// $currDB = "`cl58-syntaxes`";    //REMOTE//
//SET THE CURRENT MAIN TABLE//
$currTB = "`syntax`";
//CREATE AN SQL INSERT STATEMENT//
$insertSQL = new InsertSQL("{$currDB}.{$currTB}","{$currTB}.syntaxID,{$currTB}.languageID,{$currTB}.syntaxBody,{$currTB}.syntaxDesc,{$currTB}.syntaxNotes",array($valuesToInsert));
$insertSQL->convertToStr();
//PERFORM A QUERY//
$query = $conn->query($insertSQL);
//STORE THE NUMBER OF AFFECTED ROWS//
$result = $query->rowCount();
//GET THE LAST INSERTED ID//
$syntaxID = $conn->lastInsertID();
// echo "<pre>";
// print_r($result);
//IF ONE ROW ISN'T THE RESULT, TELL THE USER THAT THE INSERT HASN'T RUN SUCCESSFULLY//
if($result < 1 || $result > 1){
  echo json_encode(
                  array(
                        'status' => "error",
                        'msg'    => "Sorry, syntax could not be saved on the database."
                       )
                  );
  $conn = null;
  return;
}
//======= QUERY OK!! ========= QUERY OK!! ======//
else{
    //========== EXAMPLES ================//
      if(isset($_POST['examples'])){
        //CHANGE THE CURRENT TABLE//
        $currTB = "example";
        //IF SOME EXAMPLES WERE PASSED, THAN YOU NEED TO INSERTO THEM INTO THE DATABASE//
        $examples = $_POST['examples'];
        //LOOP THROUGH//
        foreach($examples as $exampleBody){
            //CREATE A INSERT SQL STATEMENT FOR EACH GIVEN EXAMPLE//
          $currInsertSQL = new InsertSQL("{$currDB}.{$currTB}","{$currTB}.exampleID,{$currTB}.syntaxID,{$currTB}.exampleBody",array(array("'null'","'{$syntaxID}'","'{$exampleBody}'")));
          $currInsertSQL->convertToStr();
          // echo "<pre>";
          // print_r($currInsertSQL);
          $conn->query($currInsertSQL);
        }
      }




  echo json_encode(
                    array(
                          'status'    => 'success',
                          'msg'       => 'New Syntax Saved!',
                          'syntaxID'  => $syntaxID
                        )
                  );
    $conn = null;
    return;
  }
}//END OF 'try' //
//======= QUERY OK!! ========= QUERY OK!! ======//

//===== ERROR ======= ERROR ======== ERROR ==========//
catch(PDOException $e){
  $error = $e->getMessage();
  echo json_encode(
                  array(
                        'status'  => "error",
                        'msg'     => "Sorry, syntax could not be saved on the database.",
                        'addInfo' => "{$error}"
                       )
                  );
  $conn = null;
  return;
}
//===== ERROR ======= ERROR ======== ERROR ==========//
 ?>
