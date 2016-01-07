<?php
// echo "<pre>";
// print_r($chosenLang = $_POST['lang']);

//@param $selectedLangs --> an array containing all selected langs in a  HTML <form>//
function getLangs($selectedLangs){
  //CREATE A FILTER THAT WILL BE USED IN A SELECT SQL STATEMENT//
  $sqlFilter = new FilterSQL();

  foreach($selectedLangs as $language){
    $sqlFilter->addCondition(new ConditionSQL("syntax.languageID","=","{$language}","OR"));
  }
  return $sqlFilter;
  // return $sqlFilter->finishFilter();
}

//THIS FUNCTION WILL LOAD ALL NEEDED CLASSES AUTOMATICALLY//
function __autoload($class){
  require_once("../classes/{$class}.php");
}

//GET THE POST VARIABLES//
$chosenLangs = isset($_POST['lang'])   ? $_POST['lang']   : null;
$givenString = isset($_POST['string']) ? $_POST['string'] : null;

//IF NO LANGUAGE IS SELECTED...ECHO A JSON 'LOG' AND CLOSE THE PROGRAM//
if(empty($chosenLangs)){
  echo json_encode(array("status"=>"no language selected","msg"=>"Plese, selected a least one language"));
  return false;
}
//IF NO TEXT IS PASSED TO PERFORM A SEARCH... ECHO A JSON 'LOG' AND CLOSE THE PROGRAM//
if(empty($givenString)){
  echo json_encode(array("status"=>"no string passed","msg"=>"Please, fill the search fill with some text."));
  return false;
}
//IF AT LEAST ONE LANGUAGE IS SELECTED AND SOME TEXT IS TYPED...CONNECT TO A DATABASE//
$conn = DB::connect("local");
//SET THE CURRENT DATABASE//
// $currDB = "`syntaxes`";        //LOCAL//
$currDB = "syntaxes";        //LOCAL//
// $currDB = "`cl58-syntaxes`";    //REMOTE//
//SET THE CURRENT MAIN TABLE//
// $currTB = "`syntax`";
$currTB = "syntax";
//CREATE A FILTER -> AN ARRAY CONTAINING AN CONDITION EACH LANGUAGE THAT WILL BE USED IN THE SELECT QUERY --> getLangs()//
$sqlFilter  = getLangs($chosenLangs);
//CREATE A WHERE CONDITION TO SEARCH FOR A PATTERN TO THE GIVEN STRING//
  //SEARCH FOR THE GIVEN STRING IN THE DESCRIPTION FIELD OF A SYNTAX//
  $condition01 = new ConditionSQL("{$currTB}.syntaxDesc","LIKE","'%{$givenString}%'");
  //SEARCH FOR THE GIVEN STRING IN THE BODY FIELD OF A SYNTAX//
  $condition02 = new ConditionSQL("{$currTB}.syntaxBody","LIKE","'%{$givenString}%'","OR");
//CREATE ANOTHER FILTER//
$sqlFilter2 = (new FilterSQL())->addCondition($condition01)->addCondition($condition02)->setBoolOp("AND");
// print_r($sqlFilter2);
$selectSQL = (new SelectSQL("{$currDB}.{$currTB}","`language`.languageDesc,{$currTB}.syntaxBody,{$currTB}.syntaxDesc,{$currTB}.syntaxNotes"));
//CREATE A SELECT STATEMENT CLASS//
// $selectSQL->join("INNER","syntaxes.language","languageID")->where($sqlFilter)->convertToStr();
$selectSQL->join("INNER","{$currDB}.`language`","languageID")->where($sqlFilter)->where($sqlFilter2)->convertToStr();
// echo "<pre>";
// print_r($selectSQL);
//PERFORM A QUERY//
$query = $conn->query($selectSQL);
//STORE THE RESULT OF AFFECTED ROWS//
$affectedRows = $query->rowCount();
//STORE THE RESULT IN AN ARRAY ($result)//
$result = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);

// print_r($result);
// print_r($query);
// print_r($selectSQL);
// print_r($sqlFilter->finishFilter());
 ?>
