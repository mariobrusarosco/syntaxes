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
                          "msg"    => "Syntax's Language or Syntax's Body are mandatory field and at least one isn't set"
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
$valuesToInsert   = ["'null'",$lang,"'{$body}'","'{$desc}'","'{$notes}'"];
//CONNECT TO A DATABASE//
$conn = DB::connect();
//SET THE DATABASE NAME//
$currDB = "syntaxes";
//SET THE TABLE TO INSERT THE ROW//
$currTB = "syntax";
//CREATE AN SQL INSERT STATEMENT//
$insertSQL = new InsertSQL("{$currDB}.{$currTB}","{$currTB}.syntaxID,{$currTB}.languageID,{$currTB}.syntaxBody,{$currTB}.syntaxDesc,{$currTB}.syntaxNotes",[$valuesToInsert]);
$insertSQL->convertToStr();
//PERFORM A QUERY//
$query = $conn->query($insertSQL);
//STORE THE NUMBER OF AFFECTED ROWS//
$result = $query->rowCount();
// echo "<pre>";
// print_r($result);
//IF ONE ROW IS THE RESULT, TELL THE USER THAT THE INSERT RUN SUCCESSFULLY//
if($result < 1 || $result > 1){
  echo json_encode(
                  array(
                        'status' => "error",
                        'msg'    => "Sorry, syntax could not be saved on the database."
                       )
                  );
  $conn = null;
  return;
}else{
  echo json_encode(
                    array(
                          'status' => 'success',
                          'msg'    => 'New Syntax Saved!'
                        )
                  );
    $conn = null;
    return;
}
// print_r($insertSQL);

 ?>
