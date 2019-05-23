import { parseSNS } from "../modules/snsHelper";
import { convertFlow } from "../modules/convertFlow";
import { IYnabPaymentInfo } from "../interfaces/ynab";

export class Bank {
  shortname: string;
  header: string[] | null;
  fileexport: Array<any>;

  constructor(
    shortname: string,
    header: string[] | null,
    fileexport: Array<any>
  ) {
    this.shortname = shortname;
    this.header = header;
    this.fileexport = fileexport;
  }
}

export class raboBank extends Bank {
  constructor(shortname, header, fileexport) {
    super(shortname, header, fileexport);
  }
  //Methods
  toYnab(): Array<IYnabPaymentInfo> {
    return this.fileexport.map(function(x) {
      return {
        Date: x[4],
        Payee: x[9],
        Category: "",
        Memo: x[19],
        Outflow: convertFlow(x[6], "out"),
        Inflow: convertFlow(x[6], "in")
      };
    });
  }
}

export class ingBank extends Bank {
  constructor(shortname, header, fileexport) {
    super(shortname, header, fileexport);
  }
  //Methods
  toYnab(): Array<IYnabPaymentInfo> {
    return this.fileexport.map(function(x) {
      return {
        Date: x[0].replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"),
        Payee: x[1],
        Category: "",
        Memo: x[8],
        Outflow: convertFlow(x[5] + x[6], "out"),
        Inflow: convertFlow(x[5] + x[6], "in")
      };
    });
  }
}

export class snsBank extends Bank {
  constructor(shortname, header, fileexport) {
    super(shortname, header, fileexport);
  }
  //Methods
  toYnab(): Array<IYnabPaymentInfo> {
    return this.fileexport.map(function(x) {
      return {
        Date: x[0].replace(/(\d{2})\-(\d{2})\-(\d{4})/, "$3-$2-$1"),
        Payee: parseSNS(x[3], x[17])[0],
        Category: "",
        Memo: parseSNS(x[3], x[17])[1],
        Outflow: convertFlow(x[10], "out"),
        Inflow: convertFlow(x[10], "in")
      };
    });
  }
}
