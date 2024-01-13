interface IUser {
  uid: string;
  nickname: string;
  avatar: string;
}

interface IUserGameInfo {
  uid: string;
  avatar: string;
  nickname: string;
  clearDan: IDan;
  exp: number;
  lr2Id: string;
  rating: number;
}
