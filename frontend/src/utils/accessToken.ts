const isClient = typeof window !== "undefined";

let accessToken = "";
export const setAccessToken = (s: string) => {
  if (isClient) localStorage.setItem("x-auth", s);
  accessToken = s;
};

export const getAccessToken = () => {
  if (isClient) {
    if (!localStorage.getItem("x-auth") && accessToken) {
      setAccessToken(accessToken);
    }
    return localStorage.getItem("x-auth");
  }
  return accessToken;
};
