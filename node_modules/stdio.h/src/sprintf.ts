import { _char, _str } from "stdio.h/src";

type ValuesConv = {
  value: any,
  isValue: boolean
}

export default function sprintf(str: _str | _char, format: string, ...value: any[] ) {
      let arr_str = format.split("");
  for (let i = 0; i < format.length - 1; i++) {
    let value_conv: ValuesConv = {
      value: "",
      isValue: false
    };
    if (arr_str[i] === "%" && !!value[0]) {
      switch (arr_str[i + 1]) {
        case "i":
        case "d":
          value_conv.value = Math.floor(value[0]);
          value_conv.isValue = true;
          break;
        case "f":
          value_conv.value = parseFloat(value[0]);
          value_conv.isValue = true;
          break;
        case "s":
        case "c":
          value_conv.value = value[0].toString();
          value_conv.isValue = true;
          break;
      }
      if (value_conv.isValue) {
        arr_str[i] = value_conv.value;
        value.shift();
        arr_str[i + 1] = "";
      }
    }
  }
//   console.log(arr_str.join(""));
  str[0] = arr_str.join("");
}