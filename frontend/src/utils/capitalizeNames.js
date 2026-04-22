/**
 * Capitalizes the first letter of the first name and last name
 * @param {string} fullName - The full name string
 * @returns {string} - The name with first and last word capitalized
 */
export const capitalizeFirstAndLastName = (fullName) => {
  if (!fullName || typeof fullName !== 'string') return '';

  const words = fullName.trim().split(/\s+/).filter(word => word.length > 0);
  
  if (words.length === 0) return '';
  
  if (words.length === 1) {
    // Only one word - capitalize first letter
    return words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
  }
  
  // Multiple words - capitalize first letter of first and last word
  const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
  const lastWord = words[words.length - 1].charAt(0).toUpperCase() + words[words.length - 1].slice(1).toLowerCase();
  const middleWords = words.slice(1, -1);
  
  return [firstWord, ...middleWords, lastWord].join(' ');
};
