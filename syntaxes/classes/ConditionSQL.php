<?php
class ConditionSQL extends FilterSQL{

  protected $field;
  protected $operator;
  protected $value;
  public    $strCondition;

    function __construct($field,$operator,$value,$booleanOperator = null){
      $this->field     = $field;
      $this->operator  = $operator;
      $this->value     = $value;
      ($booleanOperator !== null) ? $this->setBoolOp($booleanOperator) : $this->booleanOperator = null;
      return $this;
    }

    function finishCondition(){
      //IF A BOOLEAN OPERATOR IS SET...//
      if($this->booleanOperator !== null){
        //THIS IS THE CONDITION WITH A BOOLEAN OPERATOR, CONVERTED TO A STRING //
        return $this->strCondition = "{$this->booleanOperator} {$this->field} {$this->operator} {$this->value}";
      }else{
        //THIS IS THE CONDITION WITH NO BOOLEAN OPERATOR, CONVERTED TO A STRING //
        return $this->strCondition = "{$this->field} {$this->operator} {$this->value}";
      }
    }

    function __tostring(){
        return "{$this->finishCondition()}";
    }
}
?>
