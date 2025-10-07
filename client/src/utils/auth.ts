export const getAuthUser = () => {
  const stored = localStorage.getItem("user");
  if (!stored) return null;
  const parsed = JSON.parse(stored);
  console.log("Auth user from localStorage:", parsed);
  return parsed;
};
