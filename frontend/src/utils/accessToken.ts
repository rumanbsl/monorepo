export const setAccessToken = (s: string) => {
  localStorage.setItem("x-auth", s);
};

export const getAccessToken = () => localStorage.getItem("x-auth") || "";
