const isClient = typeof window !== "undefined";

export const setAccessToken = (s: string) => {
  if (isClient) localStorage.setItem("x-auth", s);
};

export const getAccessToken = () => (isClient ? (localStorage.getItem("x-auth") || "") : "");
