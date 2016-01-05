<?php
function __autoload($class){
  require_once("../classes/{$class}.php");
}

if(empty($_POST)){
  echo json_encode(
        array("status" => "error",
              "msg" => "No data was passed by POST method"
             )
      );
}else{
  //GET THE POST VARIABLES//
  $syntaxID = $_POST['syntaxID'];
  //CONNECT TO THE DATABASE//
  $conn = DB::connect();
  //SET THE DATABASE'S NAME AND THE CURRENT TABLE'S NAME//
  $currDB = "syntaxes";
  $currTB = "example";
  //CREATE A DELETE SQL STATEMENT//
  $deleteExamples = new DeleteSQL("{$currDB}.{$currTB}");
  //CREATE A CONDITION//
  $cond   = new ConditionSQL("{$currTB}.syntaxID","=","{$syntaxID}");
  //CREATE A FILTER//
  $filter = (new FilterSQL())->addCondition($cond);
  //ADD THIS FILTER INTO THE DELETE STATEMENT//
  $deleteExamples = $deleteExamples->where($filter)->convertToStr();
  //PERFORM THE QUERY//
  $query = $conn->query($deleteExamples);

  //CHANGE THE CURRENT TABLE//
  $currTB = "syntax";
  //CREATE A DELETE STATEMENT//
  $deleteSyntax = new DeleteSQL("{$currDB}.{$currTB}");
  //CREATE A CONDITION//
  $cond = new ConditionSQL("{$currTB}.syntaxID","=","{$syntaxID}");
  //CREATE A FILTER//
  $filter = (new FilterSQL())->addCondition($cond);
  //ADD THIS FILTER INTO THE DELETE STATEMENT//
  $deleteSyntax = $deleteSyntax->where($filter)->convertToStr();
  //PERFORM THE QUERY//
  $query = $conn->query($deleteSyntax);
  // echo "<pre>";
  print_r($deleteExamples);
  print_r($deleteSyntax);
  // print_r($syntaxID);
}
 ?>
