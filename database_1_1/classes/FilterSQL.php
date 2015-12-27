<?php
class FilterSQL{

  private $conditions = [];
  // private $strCondition;
  // protected $strFilter;
  private $strFilter;

  function __construct(ConditionSQL $condition){
    $this->strFilter = $condition->strCondition;
    return $this;
    // $this->strFilter = $condition->finishCondition();
  }

  function addCondition($booleanOperator = NULL, ConditionSQL $condition){
      $this->strFilter .= " {$booleanOperator} {$condition->finishCondition() }";
      return $this;
  }

  function finishFilter(){
    return "({$this->strFilter})";
  }

  function __tostring(){
    return "{$this->strFilter}";

  }

}

?>
