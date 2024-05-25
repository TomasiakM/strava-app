export default (num: number): string => {
  const distance = num / 1000;

  if (distance > 1000) {
    const thousands = (distance / 1000).toFixed();
    return `${thousands}k`;
  }

  return distance.toFixed(0).toString();
};
