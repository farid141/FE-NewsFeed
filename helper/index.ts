export const formatTime = (timestamp: any) => {
  if (!timestamp) return "-";

  const date = new Date(timestamp);
  const now = new Date();

  const diff = now.getTime() - date.getTime(); // ✅ type-safe
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (seconds < 60) return `${seconds}s ago`;
  else if (minutes < 60) return `${minutes}m ago`;
  else if (hours < 24) return `${hours}h ago`;
  else `${days}d ago`;
};
