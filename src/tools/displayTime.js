const padToTwo = (number) => (number <= 9 ? `0${number}` : number);

export const displayTime = (milSecond) => {
  let minutes = 0;
  let seconds = 0;
  if (milSecond < 0) {
    milSecond = 0;
  }
  if (milSecond < 100) {
    return `00:00:${padToTwo(milSecond)}`;
  }
  let remainMilSecond = milSecond % 100;
  seconds = (milSecond - remainMilSecond) / 100;
  if (seconds < 60) {
    return `00:${padToTwo(seconds)}:${padToTwo(remainMilSecond)}`;
  }
  let remainSeconds = seconds % 60;
  minutes = (seconds - remainSeconds) / 60;

  return `${padToTwo(minutes)}:${padToTwo(remainSeconds)}:${padToTwo(
    remainMilSecond
  )}`;
};
