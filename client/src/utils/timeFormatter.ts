export const timeFormatter = (timestamp: string) => {
  return new Date(Number(timestamp)).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};
