<?php
class UpdateSQL extends StmtSQL {

  function __construct($table,$fields,$values){
    $this->table           = $table;
    $this->fields          = $fields;
    $this->values          = $values;
    $this->fieldsAndValues = $this->arrangeStmt($fields,$values);
    // $this->fieldsAndValues = SELF::arrangeStmt($fields,$values);
  }

  function arrangeStmt(array $fields, array $values){
    //THROW AN ERROR IF YOU PASS MORE FIELDS THAN VALUES OR OTHERWISE//
    if(sizeof($fields) != sizeof($values)){
      throw new Exception("Error. The number of passed fields and values are not equal.");
    }

    for($i = 0; $i < sizeof($fields) ;$i++){
      $this->fieldsAndValues[] = "{$fields[$i]} = {$values[$i]}";
    }
    return implode(",",$this->fieldsAndValues);
  }

  public function convertToStr(){
    return $this->strStmt = "UPDATE {$this->table} SET {$this->fieldsAndValues} {$this->whereClause}";
  }

  function __tostring(){
    return "{$this->strStmt}";
  }
}
?>
