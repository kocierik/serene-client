export const secondsToTime = (seconds: number = 0) => {
  const timeString = new Date(1000 * seconds).toISOString().slice(15, 19);
  return timeString;
};

export const formatDuration = (duration: number = 0) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
