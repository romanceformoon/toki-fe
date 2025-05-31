import { useContext, useMemo } from 'react';
import { CurrentUserContext } from '~/context';

const useLoginUser = () => {
  const user = useContext(CurrentUserContext);

  const { uid, nickname, avatar } = user || {};

  const isLogined = useMemo(() => (uid ? true : false), [uid]);

  return {
    uid,
    nickname,
    avatar,
    isLogined
  };
};

export default useLoginUser;
