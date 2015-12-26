<?php
echo "<pre>";
print_r($chosenLang = $_POST['lang']);

//@param $selectedLangs --> an array containing all selected langs in a  HTML <form>//
function getLangName($selectedLangs){
  foreach($selectedLangs as $language){
    $sql = "SELECT language.languageID FROM syntaxes.language WHERE language.languageDESC = {$lang}";
    //query//
    //$langsIDs[] = "ID";
  }

  return $langsIDs;
}

 ?>
