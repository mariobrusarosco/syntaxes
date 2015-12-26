<?php
class FilterSQL{

  private $conditions = [];
  private $strCondition;

  function __construct(ConditionSQL $condition){
    $this->strCondition = $condition->finishCondition();
  }

  function addCondition($booleanOperator = NULL, ConditionSQL $condition){
      $this->strCondition .= " {$booleanOperator} {$condition->finishCondition() }";
  }

  function finishFilter(){
    return "({$this->strCondition})";
  }

  function __tostring(){
    return "{$this->strCondition}";

  }

}

?>
