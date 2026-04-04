/**
 * Pluralizes a word
 *
 * @param   {string} singularWord Word in singular form
 * @param   {number} count        Count to use to determine whether to return the pluralized word
 * @returns {string}              Pluralized word
 */
export const plur = (singularWord: string, count: number): string => {
  if (count > 1 || count === 0) {
    return `${singularWord}s`;
  }

  return singularWord;
};
