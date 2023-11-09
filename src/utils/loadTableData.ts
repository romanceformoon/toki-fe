import TableData from "~/utils/TableData/data.json";

export const loadTableData = () => {
  const levelList: ILevelList = {
    "LEVEL 1": [],
    "LEVEL 2": [],
    "LEVEL 3": [],
    "LEVEL 4": [],
    "LEVEL 5": [],
    "LEVEL 6": [],
    "LEVEL 7": [],
    "LEVEL 8": [],
    "LEVEL 9": [],
    "LEVEL 10": [],
    "LEVEL 11": [],
    "LEVEL 12": [],
    "LEVEL 13": [],
    "LEVEL 14": [],
    "LEVEL 15": [],
    "LEVEL 16": [],
    "LEVEL 17": [],
    "LEVEL 18": [],
    "LEVEL 19": [],
    "LEVEL 20": [],
    "LEVEL DUMMY": [],
  };

  for (let i = 0; i < TableData.length; i++) {
    const level = TableData[i].level;
    const title = TableData[i].title;
    const artist = TableData[i].artist;
    const md5 = TableData[i].md5;
    const org_level = TableData[i].org_level;
    const folder = TableData[i].folder;
    const url = TableData[i].url;
    const url_diff = TableData[i].url_diff;
    const org_md5s = TableData[i].org_md5s;
    const org_md5 = TableData[i].org_md5;
    const comment = TableData[i].comment;
    const adddate = TableData[i].adddate;

    levelList[level].push({
      level,
      title,
      artist,
      md5,
      org_level,
      folder,
      url,
      url_diff,
      org_md5s,
      org_md5,
      comment,
      adddate,
    });
  }

  for (const folder of Object.keys(levelList)) {
    levelList[folder].sort((a, b) => {
      return a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
    });
  }

  return levelList;
};
