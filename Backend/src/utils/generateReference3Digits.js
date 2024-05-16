export function generateReference3Digits(prefix, fixedLetter, number) {
  const maxNumber = 999;
  const numStr = number.toString().padStart(3, '0');

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letterIndex = Math.floor(number / (maxNumber + 1));
  const changingLetter = letters[letterIndex % letters.length];

  return `${prefix}-${fixedLetter}${changingLetter}${numStr}`;
}

export function generateReference3DigitsFromRef(prefix, fixedLetter, maxRef) {
  const maxNumber = 999;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  if (!maxRef) {
    return `${prefix}-${fixedLetter}A000`;
  }

  const [_, refFixedLetter, changingLetter, numStr] = maxRef.match(/([A-Z])([A-Z])(\d{3})/);
  let number = parseInt(numStr, 10);
  let nextFixedLetter = refFixedLetter;
  let nextChangingLetter = changingLetter;

  // Incrementar el número
  number += 1;

  // Si el número supera el máximo, reiniciarlo a 1 y actualizar las letras
  if (number > maxNumber) {
    number = 1;
    nextChangingLetter = String.fromCharCode(changingLetter.charCodeAt(0) + 1);
    
    // Si la changingLetter supera 'Z', reiniciarla a 'A' y avanzar la fixedLetter
    if (nextChangingLetter > 'Z') {
      nextChangingLetter = 'A';
      nextFixedLetter = String.fromCharCode(refFixedLetter.charCodeAt(0) + 1);
    }
  }

  const numStrPadded = number.toString().padStart(3, '0');
  return `${prefix}-${nextFixedLetter}${nextChangingLetter}${numStrPadded}`;
}
