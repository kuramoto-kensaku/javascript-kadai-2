"use strict";

let result = document.getElementById("result");

let myFlg = 1;  //直前に押したものが数字：０　演算子、AC,=：１

let mode = "integer_mode";  //整数入力中：integer_mode　少数入力中：decimal_mode

let type = "zero";  //整数の先頭文字が０：zero　０以外：not_zero

let afterEqual = "stay";  //＝を押した後："after"　それ以外:"stay＂



function get_calc(btn) {

  myFlg = 0;
  
  if (btn.value == "AC") {
     result.value = "";
     myFlg = 1;
     mode = "integer_mode";
     type = "zero";
     afterEqual = "stay";
  } else if (result.value == "" && ["0","00"].includes(btn.value)){
     result.value = "";
  } else if (type == "zero" && ["0","00"].includes(btn.value)) {
     myFlg =1;
     return;
  } else if (afterEqual == "after"){
     result.value = btn.value;
     afterEqual = "stay";
     type = "not_zero";
  } else {
     result.value += btn.value;
     type = "not_zero";
  }
}

function get_ope(btn) {
  
  if (result.value == "" && ["+","/","*","-"].includes(btn.value)){
     result.value = "";
  } else if (myFlg == 0 && ["+","/","*","-"].includes(btn.value)) {
     myFlg =1;
     mode = "integer_mode";
     result.value += btn.value;
  } else if (afterEqual == "after" && ["+","/","*","-"].includes(btn.value)){
     myFlg =1;
     mode = "integer_mode";
     result.value += btn.value;
  } else if (myFlg == 1 && ["+","/","*","-"].includes(btn.value)){
     mode = "integer_mode";
     result.value = result.value.slice(0,-1);
     result.value += btn.value;
  }
  
  type = "zero";
  
  afterEqual = "stay";
  
}

function get_dec(btn) {
  
   if (mode == "decimal_mode") {
    return;
  } else if ((result.value == "" || afterEqual == "after") && btn.value == ".") {
    result.value = "0.";
    type = "not_zero";
    mode = "decimal_mode";
  } else if(myFlg == 1 && btn.value == "."){
    result.value += "0.";
    type = "not_zero";
    mode = "decimal_mode";
  } else {
    result.value += btn.value;
    mode = "decimal_mode";
  }
  
  afterEqual = "stay";
  
}

function get_equal() {
  
  result.value = new Function("return " + result.value)();
  myFlg = 1;
  mode = "integer_mode";
  type = "zero";
  afterEqual = "after";
}