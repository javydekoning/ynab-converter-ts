export const convertFlow = (amount: string, direction: string): string => {
  switch (true) {
    case /^(\+|Bij|\d)/.test(amount) && direction == "in":
      return amount.replace(/^(\+|Bij|\d)/, "");
    case /^(\-|Af)/.test(amount) && direction == "out":
      return amount.replace(/^(\-|Af)/, "");
    default:
      return "";
  }
};
