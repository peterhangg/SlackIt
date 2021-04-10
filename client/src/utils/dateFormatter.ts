export const dateFormatter = (timestamp: string) => {
  const today = new Date().toDateString();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const messageDate = new Date(Number(timestamp));
  let messageTime = new Date(Number(timestamp)).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  if (messageDate.toDateString() === today) {
    return `Today at ${messageTime}`;
  }

  if (messageDate.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${messageTime}`;
  }

  return messageDate.toDateString();
};
