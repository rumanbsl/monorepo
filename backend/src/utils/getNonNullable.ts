/**
 * @description The returntype only produce truthy value, but not deterministic
 * @param input Object type
 */
export default function nonNullable<T extends Record<string, unknown>>(input: Partial<T>) {
  type inputKeys = keyof typeof input;
    type Truthy<T extends inputKeys = inputKeys> = NonNullable<typeof input[T]>;
    const nonNulls = {} as { [key in inputKeys]?: Truthy<key> };

    (Object.keys(input) as inputKeys[]).forEach((key) => {
      if (
        typeof input[key] === "number"
        || typeof input[key] === "boolean"
        || input[key]
      ) nonNulls[key] = input[key] as Truthy;
    });

    return nonNulls;
}
