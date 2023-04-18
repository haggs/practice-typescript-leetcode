const aSet = new Set(['a', 'A', '@', '4']);
const eSet = new Set(['e', 'E', '3']);
const iSet = new Set(['i', 'I', 'l', '1', '|', '/', '\\', 'l']);
const sSet = new Set(['s', 'S', '5']);
const oSet = new Set(['o', 'O', '0']);

const SUBSTITUTIONS = new Map<string, Set<string>>([
  ['a', aSet],
  ['A', aSet],
  ['@', aSet],
  ['4', aSet],
  ['e', eSet],
  ['E', eSet],
  ['3', eSet],
  ['i', iSet],
  ['I', iSet],
  ['l', iSet],
  ['1', iSet],
  ['|', iSet],
  ['/', iSet],
  ['\\', iSet],
  ['l', iSet],
  ['o', oSet],
  ['O', oSet],
  ['0', oSet],
  ['s', sSet],
  ['S', sSet],
  ['5', sSet],
]);

const BAD_WORDS = ['mad', 'mother', 'bad', 'bong', 'kill'];

function isSubstitutionOf(a: string, b: string): boolean {
  const substitutionsOfB = SUBSTITUTIONS.get(b) || new Set();
  return substitutionsOfB.has(a) || a.toLowerCase() === b.toLowerCase();
}

function isSameWordWithSubstitutions(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; ++i) {
    if (!isSubstitutionOf(a[i], b[i])) {
      return false;
    }
  }

  return true;
}

/**
 * TODO: Make this work for substitutions of different sizes, like 0 -> OH
 */
export function containsBadWord(username: string): boolean {
  for (let i = 0; i < username.length; ++i) {
    const currentLetter = username[i];

    const badWordsStartingWithCurrentLetter = BAD_WORDS.filter((word) =>
      isSubstitutionOf(currentLetter, word[0]),
    );

    for (const badWord of badWordsStartingWithCurrentLetter) {
      const possibleBadWord = username.slice(i, i + badWord.length);
      if (isSameWordWithSubstitutions(possibleBadWord, badWord)) {
        return true;
      }
    }
  }

  return false;
}
