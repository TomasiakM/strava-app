export default (time: number) => {
  const hours = Math.floor(time / (60 * 60));
  let rest = time % (60 * 60);

  const min = Math.floor(rest / 60);
  const sec = rest % 60;

  return `${hours < 10 ? `0${hours}` : hours}:${min < 10 ? `0${min}` : min}:${
    sec < 10 ? `0${sec}` : sec
  }`;
};
