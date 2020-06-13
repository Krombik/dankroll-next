export const moveFromTo = (arr: any[], from: number, to: number) =>
  arr[from] === undefined || arr[to] === undefined
    ? arr
    : from > to
    ? [
        ...arr.slice(0, to),
        arr[from],
        ...arr.slice(to, from),
        ...arr.slice(from + 1),
      ]
    : [
        ...arr.slice(0, from),
        ...arr.slice(from + 1, to + 1),
        arr[from],
        ...arr.slice(to + 1),
      ];
