type AeryLevel =
  | 'LEVEL 1'
  | 'LEVEL 2'
  | 'LEVEL 3'
  | 'LEVEL 4'
  | 'LEVEL 5'
  | 'LEVEL 6'
  | 'LEVEL 7'
  | 'LEVEL 8'
  | 'LEVEL 9'
  | 'LEVEL 10'
  | 'LEVEL 11'
  | 'LEVEL 12'
  | 'LEVEL 13'
  | 'LEVEL 14'
  | 'LEVEL 15'
  | 'LEVEL 16'
  | 'LEVEL 17'
  | 'LEVEL 18'
  | 'LEVEL 19'
  | 'LEVEL 20'
  | 'LEVEL 20+'
  | 'LEVEL DUMMY'
  | 'OLD CHARTS';

type ILevelList = Record<AeryLevel, ISongData[]>;

interface ISongData {
  md5: string;
  org_level: number;
  title: string;
  artist: string;
  folder: AeryLevel;
  level: AeryLevel;
  lr2_bmsid?: string;
  url: string;
  url_diff: string;
  name_diff?: string;
  org_md5s: string[];
  org_md5: string;
  comment: string;
  adddate: string;
}
