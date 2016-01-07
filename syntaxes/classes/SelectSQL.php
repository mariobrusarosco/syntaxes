<?php

class SelectSQL extends StmtSQL{


  function __construct($tables,$fields = '*'){
    $this->tables   = "FROM {$tables} ";
    $this->fields   = $fields;
    // parent:: function __construct();
    return $this;
  }

  public function limit($limit){
    $this->limitClause = "LIMIT {$limit}";
    return $this;
  }

  public function orderBy($order, $flag = NULL){
    $this->orderByClause = "ORDER BY $flag{$order}";
    return $this;
  }

  public function convertToStr(){
    if(sizeof($this->whereClause) <= 0){
      $this->strStmt = "SELECT {$this->fields} {$this->tables} WHERE {$this->whereClause} {$this->orderByClause} {$this->limitClause}";
    }else{
      $this->strStmt = "SELECT {$this->fields} {$this->tables} WHERE";
      foreach($this->whereClause as $filter){
        $this->strStmt .= $filter;
      }
      $this->strStmt .= "{$this->orderByClause} {$this->limitClause}";
    }
    return $this->strStmt;
  }

  function __tostring(){
    return "{$this->strStmt}";
  }

}


//  SELECT * FROM $$tables;                                                                                                           (production)
//  SELECT $field,$field,$field FROM $table                                                                                         (production)
//  SELECT $field,$field,$field FROM $table ORDER BY $field                                                                         (production)
//  SELECT $field,$field,$field FROM $table ORDER BY $field LIMIT $value                                                            (production)
//  SELECT $field,$field,$field FROM $table LIMIT $value                                                                            (production)
//  SELECT $field,$field,$field FROM $table WHERE $field $operator $value                                                           (production)
//  SELECT $field,$field,$field FROM $table WHERE ($field $operator $value OR||AND $field $operator $value)                         (production)
//  SELECT $field,$field,$field FROM $table WHERE ($field $operator $value) OR||AND ($field $operator $value)                       (development)
//  SELECT $field,$field,$field FROM $table WHERE ($field $operator $value OR||AND $field $operator $value)  OR||AND                (development)
//                                                ($field $operator $value OR||AND $field $operator $value);
//  SELECT SUM(*field),$field FROM $table                                                                                           (development)
