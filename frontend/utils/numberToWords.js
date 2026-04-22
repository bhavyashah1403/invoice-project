/**
 * Convert number to words in Indian numbering system
 * Supports Lakh, Crore, and Paise
 */

const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];

const teens = [
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

const scales = [
  { value: 10000000, name: "Crore" },
  { value: 100000, name: "Lakh" },
  { value: 1000, name: "Thousand" },
  { value: 100, name: "Hundred" },
];

function convertTwoDigits(num) {
  if (num === 0) return "";
  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];
  const tensDigit = Math.floor(num / 10);
  const onesDigit = num % 10;
  return tens[tensDigit] + (onesDigit ? " " + ones[onesDigit] : "");
}

function convertWholeNumber(num) {
  if (num === 0) return "Zero";

  let result = "";
  let remaining = num;

  for (const scale of scales) {
    if (remaining >= scale.value) {
      const quotient = Math.floor(remaining / scale.value);
      
      if (scale.value >= 100000) {
        // For Crore and Lakh, we can have two digits
        result += convertTwoDigits(quotient) + " " + scale.name + " ";
      } else {
        // For Thousand and Hundred, we handle differently
        result += convertTwoDigits(quotient) + " " + scale.name + " ";
      }
      
      remaining = remaining % scale.value;
    }
  }

  // Add ones and tens for the remainder
  if (remaining > 0) {
    result += convertTwoDigits(remaining);
  }

  return result.trim();
}

export function numberToWords(num) {
  // Handle invalid inputs
  if (num === null || num === undefined || num === "") return "";
  
  const numberValue = parseFloat(num);
  
  if (isNaN(numberValue)) return "";
  
  if (numberValue === 0) return "Zero";
  
  if (numberValue < 0) return "Minus " + numberToWords(Math.abs(numberValue));

  // Split into whole and decimal parts
  const parts = numberValue.toString().split(".");
  const wholeNumber = parseInt(parts[0], 10);
  const decimalPart = parts[1];

  let result = convertWholeNumber(wholeNumber);

  // Add paise (decimal part)
  if (decimalPart) {
    const paise = parseInt(decimalPart.padEnd(2, "0").substring(0, 2), 10);
    if (paise > 0) {
      result += " and " + convertTwoDigits(paise) + " Paise";
    }
  }

  return result;
}
