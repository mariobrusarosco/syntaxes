<?php
class FilterSQL{

  private     $conditions = [];
  protected   $booleanOperator;
  private     $strFilter;

  function __construct(ConditionSQL $condition = null){
    //IF YOU CREATE A FILTER WITHOUT PASSING A CONDITION TO IT... NOTHING SHOULD HAPPEN//
    ($condition != null) ? $this->strFilter = $condition->finishCondition() : false;
    return $this;
    // $this->strFilter = $condition->finishCondition();
  }

  function addCondition(ConditionSQL $condition){
    //CHECK IF THE CONDITION IS THE FIRST ONE IF IT ITS, THIS CONDITION SHOULD'T HAVE A BOOLEAN OPERATOR
    //SO.. CALL THE setBoolOp() METHOD TO THE PASSED ConditionSQL
      (empty($this->conditions)) ? $condition->setBoolOp(null): null;

    //ADD THE PASSED CONDITION INTO THE ARRAY NAMED $conditions//
      array_push($this->conditions,$condition);

      return $this;
  }

  function setBoolOp($booleanOperator){
    $this->booleanOperator = $booleanOperator;
    return $this;
  }

  function getBoollOp(){
    return $this->booleanOperator;
  }

  function finishFilter(){
    foreach($this->conditions as $condition){
      $this->strFilter .= " {$condition->booleanOperator} ({$condition->field} {$condition->operator} {$condition->value})";
    }
    return "(".$this->strFilter.")";
  }

  function __tostring(){
    return "{$this->strFilter}";

  }

}

?>
