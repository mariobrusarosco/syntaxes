<?php

function __autoload($class){
  require_once("../classes/{$class}.php");
}

echo "<pre>";
//print_r($chosenLang = $_POST['lang']);

$conn = DB::connect("local");

//@param $selectedLangs --> an array containing all selected langs in a  HTML <form>//
function getLangName($selectedLangs){
  foreach($selectedLangs as $language){
    $sqlLanguages[] = "WHERE syntax.languageID = {$language}";
  }
  return $sqlLanguages;
}

//GET THE POST VARIABLE//
$chosenLangs = $_POST['lang'];
//CREATE AN ARRAY CONTAINING THE 'WHERE' CLAUSE FOR EACH LANGUAGE THAT WILL BE USED IN THE SELECT QUERY//
$langToSearch = getLangName($chosenLangs);
//CREATE A SELECT STMT CLASS//
$selectSQL = new SelectSQL("");
//
print_r($langToSearch);
 ?>
