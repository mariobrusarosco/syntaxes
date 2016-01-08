<?php

final class DB{

  // private $absPath = realpath($_SERVER['DOCUMENT_ROOT']);

  public function __construct(){ }

  public static function connect(){
      //
      // try{
      //   //PARSE THE INI FILE//
      //   if(!file_exists("./config/{$connType}.ini")){
      //     throw new Exception("error");
      //   }else{
      //     $iniConfig = parse_ini_file("./config/{$connType}.ini");
      //   }
      //
      // }catch(Exception $error){
      //   $iniConfig = parse_ini_file("../config/{$connType}.ini");
      // }
      //
      // //GET THE VARIABLES INSIDE THE .ini FILE//
      // $dbType   = isset($iniConfig['type'])     ? $iniConfig['type']      : NULL;
      // $dbDriver = isset($iniConfig['driver'])   ? $iniConfig['driver']    : NULL;
      // $dbHost   = isset($iniConfig['host'])     ? $iniConfig['host']      : NULL;
      // $dbName   = isset($iniConfig['dbName'])   ? $iniConfig['dbName']    : NULL;
      // $dbUser   = isset($iniConfig['user'])     ? $iniConfig['user']      : NULL;
      // $dbPass   = isset($iniConfig['pass'])     ? $iniConfig['pass']      : NULL;
      // $dbPort   = isset($iniConfig['port'])     ? $iniConfig['port']      : NULL;
      //
      // //CHECK IF ALL PARAMETERS WERE GIVEN//
      // if(empty($dbType) || empty($dbHost) || empty($dbName) || empty($dbUser) || empty($dbPass)){
      //   $error =  new Exception("At least one of the necessary parameters are missing");
      //   echo "Error: " . $error->getMessage();
      //   // print_r($iniConfig);
      // }

      $myPDO = new PDO("mysql:host=localhost;dbname=syntaxes","mario","brusarosco");             //LOCAL//
      // $myPDO = new PDO("mysql:host=localhost;dbname=cl58-syntaxes","cl58-syntaxes","Ek!VkgsGk"); //REMOTE//

      // try{
          //CREATE A PDO OBJECT WITHOUT A PORT VALUE//
          // if(!empty($dbPort)){
            // $myPDO = new PDO("mysql:host={$dbHost};dbname={$dbName};port={$dbPort}","{$dbUser}","{$dbPass}");
          // }else{
            // echo "port is empty";
            // $myPDO = new PDO("mysql:host={$dbHost};dbname={$dbName}","{$dbUser}","{$dbPass}");
          // }

        //SET SOME PDO PROPERTIES E RETURN A INSTANCE OF A PDO OBJECT//
        $myPDO->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      // }
        return $myPDO;
      // catch(PDOException $pdoError){
      //   echo "Message: {$pdoError->getMessage()}<br>";
      //   echo "Code: {$pdoError->getCode()}";
      // }

  }//END OF function connect() //
}//END OF final class DB//
 ?>
