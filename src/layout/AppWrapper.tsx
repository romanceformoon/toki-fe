import { ReactNode, useMemo } from "react";
import useSilentRefresh from "~/auth/query/useSilentRefresh";
import { CurrentUserContext } from "~/context";
import { IUser } from "~/types/user";

interface IAppWrapperProps {
  children: ReactNode;
  user: IUser;
}

const AppWrapper = ({ user, children }: IAppWrapperProps) => {
  useSilentRefresh();

  const currentUser = useMemo(() => {
    return user;
  }, [user]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default AppWrapper;
