export function capitalize(string: string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}

export function downcase(string: string) {
  return string.slice(0, 1).toLowerCase() + string.slice(1);
}

export function calculateTime(time: number) {
  time = Math.round(time);
  const seconds = time % 60;
  const minutes = (time - seconds) / 60;

  return (
    String(minutes).padStart(1, "0") + ":" + String(seconds).padStart(2, "0")
  );
}

export function shuffleArray<Type>(arr: Type[]): Type[] {
  const shuffledArray = [...arr];

  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1));

    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}
