export function powerset(input: number[]): number[][] {
  if (!input.length) {
    return [[]];
  }

  // With example input [1,2,3]
  // The result is powerset([1,2]) + (powerset([1,2]) with 3 added to each result)
  // powerset([1,2]) = [[], [1], [2], [1,2]]
  // powerset([1,2]) with 3 added to each result = [[3], [1, 3], [2, 3], [1,2,3]]
  // powerset([1, 2, 3]) = [[], [1], [2], [1,2], [3], [1, 3], [2, 3], [1,2,3]]

  const last = input[input.length - 1];
  const powersetOfAllButLast = powerset(input.slice(0, -1));
  const withLastAdded = powersetOfAllButLast.map((set) => [...set, last]);

  return [...powersetOfAllButLast, ...withLastAdded];
}
