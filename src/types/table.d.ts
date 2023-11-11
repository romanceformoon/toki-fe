interface ILevelList {
  [level: string]: ISongData[];
}

interface ISongData {
  md5: string;
  org_level: number;
  title: string;
  artist: string;
  folder: string;
  level: string;
  lr2_bmsid?: string;
  url: string;
  url_diff: string;
  name_diff?: string;
  org_md5s: string[];
  org_md5: string;
  comment: string;
  adddate: string;
}

