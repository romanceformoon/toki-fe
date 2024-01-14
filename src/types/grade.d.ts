interface IGrade {
  [level: string]: {
    [tier: string]: {
      fc_ratio: string;
      hard_ratio: string;
      groove_ratio: string;
      easy_ratio: string;
      level: string;
      title: string;
    }[];
  };
}
