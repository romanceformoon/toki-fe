import { ReactNode, useMemo, useState } from 'react';
import useCheckUser from '~/auth/query/useCheckUser';
import useSilentRefresh from '~/auth/query/useSilentRefresh';
import { CurrentUserContext } from '~/context';

interface IAppWrapperProps {
  children: ReactNode;
}

const AppWrapper = ({ children }: IAppWrapperProps) => {
  const [isRefreshed, setIsRefreshed] = useState<boolean>(false);

  useSilentRefresh({ setIsRefreshed });
  const { data: userData } = useCheckUser({ isRefreshed, setIsRefreshed });

  const currentUser = useMemo(() => {
    return userData && userData.data ? userData.data.user : null;
  }, [userData]);

  return <CurrentUserContext.Provider value={currentUser}>{children}</CurrentUserContext.Provider>;
};

export default AppWrapper;
