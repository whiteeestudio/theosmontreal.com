export const formatMultilineText = (text?: string) => {
  if (!text) {
    return undefined;
  }
  return text
    .trim()
    .split("\n")
    .filter((line) => !!line);
};
