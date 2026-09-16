type ValuesConv = {
  value: any,
  isValue: boolean
}
export function printf(str: string, ...value: any[]) {
  let arr_str = str.split("");
  for (let i = 0; i < str.length - 1; i++) {
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
  console.log(arr_str.join(""));
}

export type i8 = number;
export type _i8 = [number];

export type i32 = number;
export type _i32 = [number];

export type i16 = number;
export type _i16 = [number];

export type int = number;
export type _int = [number];

export type float = number;
export type _float = [number];

export type double = number;
export type _double = [number];

export type char = string;
export type _char = [string];
export type _str = [string];

import ifes from "./ife";
export const ife = ifes;

// for func
import swap_pt from './swap'
export const swap = swap_pt;
import sprintf_pt from "./sprintf";
export const sprintf = sprintf_pt;
