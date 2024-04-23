export default (distance: number, time: number): string => {
  const pace = time / (distance / 1000);

  const min = Math.floor(pace / 60);

  const sec = Math.round(pace - min * 60);

  return `${min}:${sec < 10 ? "0" + sec : sec} min/km`;
};
