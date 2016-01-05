<?php

abstract class StmtSQL{

  protected $tables;
  protected $fields;
  protected $values;
  protected $fieldsAndValues;

  protected $strStmt;

  protected $whereClause = [];
  protected $orderByClause = NULL;
  protected $limitClause   = NULL;

  function __construct(){}

  public function where(FilterSQL $filter){
    $this->whereClause[] = "{$filter->getBoollOp()} {$filter->finishFilter()}";
    return $this;
  }

  public function join($joinType,$joinedTable,$commonField){
    $this->tables .= "{$joinType} JOIN {$joinedTable} USING({$commonField}) ";
    return $this;
  }

}
?>
