export function generateReference5Digits(prefix, fixedLetter, number) {
    const maxNumber = 99999;
    const numStr = number.toString().padStart(5, '0');
  
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letterIndex = Math.floor(number / (maxNumber + 1));
    const changingLetter = letters[letterIndex % letters.length];
  
    return `${prefix}-${fixedLetter}${changingLetter}${numStr}`;
  }
  
  
  export function generateReference5DigitsFromRef(prefix, maxRef) {
    const maxNumber = 99999;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
    if (!maxRef) {
      return `${prefix}-AA00000`;
    }
  
    const [_, changingLetters, numStr] = maxRef.match(/([A-Z]{2})(\d{5})/);
    let number = parseInt(numStr, 10);
    let nextChangingLetters = changingLetters;
  
    // Incrementar el número
    number += 1;
  
    // Si el número supera el máximo, reiniciarlo a 1 y actualizar las letras
    if (number > maxNumber) {
      number = 1;
      const firstLetter = changingLetters.charCodeAt(0);
      const secondLetter = changingLetters.charCodeAt(1);
  
      if (secondLetter < 90) { // 'Z'
        nextChangingLetters = `${String.fromCharCode(firstLetter)}${String.fromCharCode(secondLetter + 1)}`;
      } else {
        nextChangingLetters = `${String.fromCharCode(firstLetter + 1)}A`;
      }
    }
  
    const numStrPadded = number.toString().padStart(5, '0');
    return `${prefix}-${nextChangingLetters}${numStrPadded}`;
  }
  