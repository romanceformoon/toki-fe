interface IUser {
  uid: string;
  nickname: string;
  avatar: string;
  admin: boolean;
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

type RankingUser = Pick<IUserGameInfo, 'uid' | 'avatar' | 'nickname' | 'clearDan' | 'exp'>;

type RatingRankingUser = Pick<
  IUserGameInfo,
  'uid' | 'avatar' | 'nickname' | 'clearDan' | 'rating' | 'exp'
>;
