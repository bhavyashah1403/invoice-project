export const capitalizeFirstAndLastName = (fullName) => {
  if (!fullName || typeof fullName !== 'string') return fullName;

  // Preserve trailing space while user is still typing
  const trailingSpace = fullName.endsWith(' ') ? ' ' : '';
  
  const words = fullName.trim().split(/\s+/).filter(word => word.length > 0);
  
  if (words.length === 0) return trailingSpace;

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return capitalizedWords.join(' ') + trailingSpace;
};