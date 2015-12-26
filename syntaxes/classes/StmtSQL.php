<?php

abstract class StmtSQL{

  protected $table;
  protected $fields;
  protected $values;
  protected $fieldsAndValues;
  protected $strStmt;
  protected $whereClause;

  function __construct(){}

  public function where(FilterSQL $filter){
    $this->whereClause = "WHERE {$filter->finishFilter()}";
  }
  // abstract function setToString(){ }

}
?>
