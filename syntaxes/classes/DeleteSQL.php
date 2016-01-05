<?php

class DeleteSQL extends StmtSQL{

  function __construct($tables){
      $this->tables = $tables;

      return $this;
  }

  public function convertToStr(){
    if(sizeof($this->whereClause) <= 0){
      $this->strStmt = "DELETE FROM {$this->tables} WHERE {$this->whereClause} {$this->orderByClause} {$this->limitClause}";
    }else{
      $this->strStmt = "DELETE FROM {$this->tables} WHERE";
      foreach($this->whereClause as $filter){
        $this->strStmt .= $filter;
      }
      $this->strStmt .= "{$this->orderByClause} {$this->limitClause}";
    }
    return $this->strStmt;
  }
}

?>
