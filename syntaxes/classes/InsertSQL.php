<?php
class InsertSQL extends StmtSQL{
/* --------- METHODS------------ */

/* ====== construct(1,2,3) =======
  1) String ==> "table's name"
  2) String ==> "field_1,field_2,field_3,..."
  3) Array  ==> [ [val_1,val_2] , [val_3,val_4] , [...] , ... ]
*/

  private $insertFields;

  function __construct($table, $insertFields,$values){
    $this->table          = $table;
    $this->insertFields   = $insertFields;
    $this->newValues      = $this->values($values);
    // $this->newValues      = SELF::values($values);
  }

  function values(array $values){
    foreach($values as $row){
      $this->newValues[] = "(". implode(",",$row) . ")";
    }
    return implode(",",$this->newValues);
  }

  public function convertToStr(){
    return $this->strStmt = "INSERT INTO {$this->table} ({$this->insertFields}) VALUES {$this->newValues};";
  }

  function __tostring(){
    return "{$this->strStmt}";
  }

}

 ?>
