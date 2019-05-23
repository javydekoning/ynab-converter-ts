import { IBankIdentifier } from "../interfaces/bankIdentifiers";
import { isEqual } from "../modules/isEqual";

const IdentifierRabo: IBankIdentifier = {
  shortname: "rabo",
  header: [
    "IBAN/BBAN",
    "Munt",
    "BIC",
    "Volgnr",
    "Datum",
    "Rentedatum",
    "Bedrag",
    "Saldo na trn",
    "Tegenrekening IBAN/BBAN",
    "Naam tegenpartij",
    "Naam uiteindelijke partij",
    "Naam initi�rende partij",
    "BIC tegenpartij",
    "Code",
    "Batch ID",
    "Transactiereferentie",
    "Machtigingskenmerk",
    "Incassant ID",
    "Betalingskenmerk",
    "Omschrijving-1",
    "Omschrijving-2",
    "Omschrijving-3",
    "Reden retour",
    "Oorspr bedrag",
    "Oorspr munt",
    "Koers"
  ],
  identify: function(exportfile: string[]): boolean {
    return isEqual(exportfile[0], this.header);
  }
};

const IdentifierSNS: IBankIdentifier = {
  shortname: "snsb",
  header: null,
  identify: function(exportfile) {
    return /NL\d{2}SNSB\d{10}/.test(exportfile[0][1]);
  }
};

const IdentifierING: IBankIdentifier = {
  shortname: "ingb",
  header: [
    "Datum",
    "Naam / Omschrijving",
    "Rekening",
    "Tegenrekening",
    "Code",
    "Af Bij",
    "Bedrag (EUR)",
    "MutatieSoort",
    "Mededelingen"
  ],
  identify: function(exportfile: string[]): boolean {
    return isEqual(exportfile[0], this.header);
  }
};

export const Identiefiers = [IdentifierRabo, IdentifierSNS, IdentifierING];
