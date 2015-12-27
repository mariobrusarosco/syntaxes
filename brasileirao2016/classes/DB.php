<?php

final class DB{

  // private $absPath = realpath($_SERVER['DOCUMENT_ROOT']);

  public function __construct(){ }

  public static function connect($connType){
    if($connType == "local"){

      $myPDO = new PDO("mysql:host=localhost;dbname=brasileiro2016","mario","brusarosco");

    }else{
      $myPDO = new PDO("mysql:host=localhost;dbname=cl58-bras2016","cl58-bras2016","K-TBqE6fE");
    }

    return $myPDO;
  }


  // public static function connect($connType){
  //
  //     //PARSE THE INI FILE//
  //     $iniConfig = parse_ini_file("/var/www/html/mariobrusarosco/brasileiro2016/config/{$connType}.ini");
  //
  //     print_r($iniConfig);
  //
  //     //GET THE VARIABLES INSIDE THE .ini FILE//
  //     $dbType   = isset($iniConfig['type'])     ? $iniConfig['type']      : NULL;
  //     $dbDriver = isset($iniConfig['driver'])   ? $iniConfig['driver']    : NULL;
  //     $dbHost   = isset($iniConfig['host'])     ? $iniConfig['host']      : NULL;
  //     $dbName   = isset($iniConfig['dbName'])   ? $iniConfig['dbName']    : NULL;
  //     $dbUser   = isset($iniConfig['user'])     ? $iniConfig['user']      : NULL;
  //     $dbPass   = isset($iniConfig['pass'])     ? $iniConfig['pass']      : NULL;
  //     $dbPort   = isset($iniConfig['port'])     ? $iniConfig['port']      : NULL;
  //
  //     print_r($dbType);
  //
  //     //CHECK IF ALL PARAMETERS WERE GIVEN//
  //     if(empty($dbType) || empty($dbHost) || empty($dbName) || empty($dbUser) || empty($dbPass)){
  //       $error =  new Exception("At least one of the necessary parameters are missing");
  //       echo "Error: " . $error->getMessage();
  //     }
  //
  //
  //     try{
  //
  //       switch($dbType){
  //         // MYSQL  ----> FOR LOCAL OR REMOTE//
  //         case "local":
  //         case "remote":
  //         //CREATE A PDO OBJECT WITH A PORT VALUE//
  //         if(!empty($dbPort)){
  //           $myPDO = new PDO("mysql:host={$dbHost};dbname={$dbName};port={$dbPort}","{$dbUser}","{$dbPass}");
  //         }
  //         //CREATE A PDO OBJECT WITHOUT A PORT VALUE//
  //         else{
  //           // echo "port is empty";
  //           $myPDO = new PDO("mysql:host={$dbHost};dbname={$dbName}","{$dbUser}","{$dbPass}");
  //         }
  //           break;
  //
  //         // SQL SERVER   ----> FOR LOCAL OR REMOTE//
  //         case "sql_server":
  //
  //           break;
  //       }//END OF switch($dbType)//
  //
  //       //SET SOME PDO PROPERTIES E RETURN A INSTANCE OF A PDO OBJECT//
  //       $myPDO->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
  //       // print_r($myPDO);
  //       return $myPDO;
  //     }
  //     catch(PDOException $pdoError){
  //       echo "Message: {$pdoError->getMessage()}<br>";
  //       echo "Code: {$pdoError->getCode()}";
  //     }
  //
  // }//END OF function connect() //
}//END OF final class DB//
 ?>
