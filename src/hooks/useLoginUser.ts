import { useContext, useMemo } from 'react';
import { CurrentUserContext } from '~/context';

const useLoginUser = () => {
  const user = useContext(CurrentUserContext);

  const { uid, nickname, avatar, admin } = user || {};

  const isLogined = useMemo(() => (uid ? true : false), [uid]);

  return {
    uid,
    nickname,
    avatar,
    isLogined,
    admin
  };
};

export default useLoginUser;
