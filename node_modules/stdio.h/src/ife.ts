export default function ife(
  c: boolean,
  truef: CallableFunction,
  elsef: CallableFunction
) {
  if (c) return truef();
  else return elsef();
}
