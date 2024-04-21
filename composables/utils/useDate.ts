export default (date: string) => {
  const d = new Date(date);

  return {
    date: d.toLocaleDateString(),
    time: d.toLocaleTimeString(),
    dateTime: d.toLocaleString(),
  };
};
