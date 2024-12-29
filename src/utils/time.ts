export const formattedDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const istDate = date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    ...options,
  });

  return istDate;
};
