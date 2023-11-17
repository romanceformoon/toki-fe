interface IGraph {
  [count: string]: {
    [level: string]: number;
  };
}

interface IHistory {
  [level: string]: {
    title: string;
    clear: string;
    exp: number;
    bp: number;
    rate: number;
    md5: string;
  }[];
}

type IDan =
  | "None"
  | "1 DAN"
  | "2 DAN"
  | "3 DAN"
  | "4 DAN"
  | "5 DAN"
  | "6 DAN"
  | "7 DAN"
  | "8 DAN"
  | "9 DAN"
  | "10 DAN"
  | "KAIDEN DAN"
  | "OVERJOY DAN";
