/**
 * Capitalizes the first letter of the first name and last name
 * Only capitalizes when the input ends with a space or at the end of typing
 * @param {string} fullName - The full name string
 * @returns {string} - The name with first and last word capitalized
 */
export const capitalizeFirstAndLastName = (fullName) => {
  if (!fullName || typeof fullName !== 'string') return fullName;

  const words = fullName.trim().split(/\s+/).filter(word => word.length > 0);
  
  if (words.length === 0) return '';
  
  if (words.length === 1) {
    // Only one word - don't modify, return as is
    return fullName;
  }
  
  // Only capitalize if we have complete words (input ends with space or has multiple complete words)
  const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
  const lastWord = words[words.length - 1].charAt(0).toUpperCase() + words[words.length - 1].slice(1).toLowerCase();
  const middleWords = words.slice(1, -1).map(word => word.toLowerCase());
  
  // Preserve the original spacing
  return [firstWord, ...middleWords, lastWord].join(' ') + (fullName.endsWith(' ') ? ' ' : '');
};
