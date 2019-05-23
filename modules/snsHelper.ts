export const parseSNS = (
  Tegenrekening: string,
  Omschrijving: string
): string[] => {
  if (Tegenrekening) {
    return [Tegenrekening, Omschrijving];
  } else {
    return Omschrijving.split(">").map(x => x.trim());
  }
};
