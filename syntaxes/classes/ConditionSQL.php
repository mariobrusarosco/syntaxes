<?php
class ConditionSQL extends FilterSQL{

  protected $field;
  protected $operator;
  protected $value;
  protected $strCondition;

    function __construct($field,$operator,$value){
      $this->field     = $field;
      $this->operator  = $operator;
      $this->value     = $value;
    }

    function finishCondition(){
      return $this->strCondition = "{$this->field} {$this->operator} {$this->value}";
    }

    function __tostring(){
        return "{$this->finishCondition()}";
    }
}
?>
