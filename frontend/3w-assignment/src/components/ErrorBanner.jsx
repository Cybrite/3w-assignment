export const ErrorBanner = ({ message }) => {
  if (!message) return null;
  return <div className="banner">{message}</div>;
};
