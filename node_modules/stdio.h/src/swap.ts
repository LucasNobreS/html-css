export default function swap(x: [any], y: [any]): void {
  [x[0], y[0]] = [y[0], x[0]];
}