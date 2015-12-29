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
$chosenLangs = $_POST['lang'];
$givenString = $_POST['string'];
//CONNECT TO A DATABASE//
$conn = DB::connect("local");
//CREATE AN ARRAY CONTAINING AN CONDITION EACH LANGUAGE THAT WILL BE USED IN THE SELECT QUERY --> getLangs()//
$sqlFilter  = getLangs($chosenLangs);
//CREATE A WHERE CONDITION TO SEARCH FOR A PATTERN TO THE GIVEN STRING//
$condition01 = new ConditionSQL("syntax.syntaxDesc","LIKE","%{$givenString}%");
$condition02 = new ConditionSQL("syntax.syntaxBody","LIKE","%{$givenString}%","OR");
$sqlFilter2 = (new FilterSQL())->addCondition($condition01)->addCondition($condition02);
//CREATE A SELECT STATEMENT CLASS//
$selectSQL = (new SelectSQL("syntaxes.syntax","language.languageDesc,syntax.syntaxBody,syntax.syntaxDesc,syntaxNotes"));
$selectSQL->join("INNER","syntaxes.language","languageID")->where($sqlFilter)->where($sqlFilter2)->convertToStr();
print_r($selectSQL);
//PERFORM A QUERY//
// $query = $conn->query($selectSQL);
//STORE THE RESULT OF AFFECTED ROWS//
// $affectedRows = $query->rowCount();
//STORE THE RESULT IN AN ARRAY ($result)//
// $result = $query->fetchAll(PDO::FETCH_ASSOC);

// echo json_encode($result);

// print_r($result);
// print_r($query);
// print_r($selectSQL);
// print_r($sqlFilter->finishFilter());
 ?>
