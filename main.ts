import { snsBank, ingBank, raboBank, Bank } from "./classes/bank";
import { Identiefiers } from "./modules/identifiers";
import { IYnabPaymentInfo } from "./interfaces/ynab";

export const convertFile = (
  mydata: Array<any>
): Array<IYnabPaymentInfo> | undefined => {
  for (let i in Identiefiers) {
    //Check whether we've identified the file
    if (Identiefiers[i].identify(mydata)) {
      //If we have a csv file with header, drop it
      if (Identiefiers[i].header != null) {
        mydata.shift();
      }

      let bank;
      switch (Identiefiers[i].shortname) {
        case "rabo":
          bank = new raboBank(
            Identiefiers[i].shortname,
            Identiefiers[i].header,
            mydata
          );
          break;
        case "ingb":
          bank = new ingBank(
            Identiefiers[i].shortname,
            Identiefiers[i].header,
            mydata
          );
          break;
        case "snsb":
          bank = new snsBank(
            Identiefiers[i].shortname,
            Identiefiers[i].header,
            mydata
          );
          break;
      }
      return bank.toYnab();
    }
  }
};
