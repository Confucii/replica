export function capitalize(string: string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}

export function shuffleArray(arr: any[]) {
  const shuffledArray = [...arr];

  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1));

    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}
