<?php
//SET THE AUTLOAD FUNCTION///
// function __autoload($class){
//   require_once("../classes/{$class}.php");
// }

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
                          "msg"    => "Syntax's Language or Syntax's Body are mandatory field and at least one isn't set"
                         )
                  );
  return false;
}

//STORE THE 'POST' DATA//
$lang   = $_POST['syntaxLang'];
$body   = $_POST['syntaxBody'];
$desc   = $_POST['syntaxDesc'];
$notes  = $_POST['syntaxNotes'];


// print_r($values);

//IF SYNTAX'S DESCRIPTION OR THE SYNTAX'S NOTES ARE EMPTY, SET THEM TO NULL//
// $givenSyntaxDesc  = !empty($_POST['givenSyntaxDesc'])  ?  $_POST['givenSyntaxDesc']  : null;
// $givenSyntaxNotes = !empty($_POST['givenSyntaxNotes']) ?  $_POST['givenSyntaxNotes'] : null;
// //CREATE AN ARRAY TO STORE THE VALUES TO INSERT//
// $valuesToInsert   = [];
// foreach($_POST as $item => $value){
//   array_push($valuesToInsert, $value);
// }
// //CONNECT TO A DATABASE//
// $conn = DB::connect();
// //SET THE DATABASE NAME//
// $currDB = "syntaxes";
// //SET THE TABLE TO INSERT THE ROW//
// $currTB = "syntax";
// //CREATE AN SQL INSERT STATEMENT//
// $insertSQL = new InsertSQL("{$currDB}.{$currTB}","{$currTB}.syntaxID,{$currTB}.languageID,{$currTB}.syntaxBody,{$currTB}.syntaxNotes",[$valuesToInsert]);
// $insertSQL->convertToStr();
// echo "<pre>";
// //  function __construct($table, $insertFields,$values){
// print_r($insertSQL);
//

/*
  INSERT INTO syntax VALUES
  (syntaxID,languageID,syntaxBody,[syntaxDesc],[syntaxNotes])
  */
 ?>
