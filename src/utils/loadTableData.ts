import tableData from "public/table/aery/data.json";

export const loadTableData = async () => {
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

  for (let i = 0; i < tableData.length; i++) {
    const level = tableData[i].level;
    const title = tableData[i].title;
    const artist = tableData[i].artist;
    const md5 = tableData[i].md5;
    const org_level = tableData[i].org_level;
    const folder = tableData[i].folder;
    const url = tableData[i].url;
    const url_diff = tableData[i].url_diff;
    const org_md5s = tableData[i].org_md5s;
    const org_md5 = tableData[i].org_md5;
    const comment = tableData[i].comment;
    const adddate = tableData[i].adddate;

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
