export default function extractCookies<T extends Record<string, unknown>>(str: string) {
  const cookiesRaw: string[] = str.split("; ");
  const cookies = cookiesRaw.reduce((acc, c) => {
    const [key, value] = c.split("=");
    (acc as any)[key] = value;
    return acc;
  }, {} as T);

  return cookies;
}
