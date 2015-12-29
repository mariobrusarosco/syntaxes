<?php

abstract class StmtSQL{

  protected $tables;
  protected $fields;
  protected $values;
  protected $fieldsAndValues;
  protected $strStmt;
  protected $whereClause;

  function __construct(){}

  public function where(FilterSQL $filter){
    $this->whereClause = "WHERE {$filter->finishFilter()}";
    return $this;
  }

  public function addWhere(){
    
  }

  public function join($joinType,$joinedTable,$commonField){
    $this->tables .= "{$joinType} JOIN {$joinedTable} USING({$commonField}) ";
    return $this;
  }
  // abstract function setToString(){ }

}
?>
