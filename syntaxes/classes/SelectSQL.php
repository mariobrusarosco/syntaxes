<?php
class SelectSQL extends StmtSQL{

  private $orderByClause = NULL;
  private $limitClause   = NULL;

  function __construct($table,$fields = '*'){
    $this->table  = $table;
    $this->fields = $fields;
    // parent:: function __construct();
  }

  public function limit($limit){
    $this->limitClause = "LIMIT {$limit}";
  }

  public function orderBy($order, $flag = NULL){
    $this->orderByClause = "ORDER BY $flag{$order}";
  }

  // public function where(FilterSQL $filter){
  //   $this->whereClause = "WHERE {$filter->finishFilter()}";
  // }

  public function selectFunction(){

  }

  public function convertToStr(){
    return $this->strStmt = "SELECT {$this->fields} FROM {$this->table} {$this->whereClause} {$this->orderByClause} {$this->limitClause}";
  }

  function __tostring(){
    return "{$this->strStmt}";
  }

}


//  SELECT * FROM $table;                                                                                                           (production)
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
