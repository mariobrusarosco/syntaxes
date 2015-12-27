<?php
class ConditionSQL extends FilterSQL{

  protected $field;
  protected $operator;
  protected $value;
  public  $strCondition;

    function __construct($field,$operator,$value){
      $this->field     = $field;
      $this->operator  = $operator;
      $this->value     = $value;
      return $this;
    }

    function finishCondition(){
      return $this->strCondition = "{$this->field} {$this->operator} {$this->value}";
    }

    function __tostring(){
        return "{$this->finishCondition()}";
    }
}
?>
