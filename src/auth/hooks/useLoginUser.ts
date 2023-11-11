import { useContext, useMemo } from "react";
import { CurrentUserContext } from "~/context";

const useLoginUser = () => {
  const user = useContext(CurrentUserContext);

  const { uid } = user || {};

  const isLogined = useMemo(() => (uid ? true : false), [uid]);

  return {
    uid,
    isLogined,
  };
};

export default useLoginUser;
