import { ReactNode, useMemo } from 'react';
import useAdminSession from '~/auth/query/useAdminSession';
import { CurrentUserContext } from '~/context';

interface IAppWrapperProps {
  children: ReactNode;
}

const AppWrapper = ({ children }: IAppWrapperProps) => {
  const { data } = useAdminSession();

  const currentUser = useMemo(() => {
    if (!data?.admin) return null;
    return { uid: 'admin', nickname: 'admin', avatar: '', admin: true };
  }, [data]);

  return <CurrentUserContext.Provider value={currentUser}>{children}</CurrentUserContext.Provider>;
};

export default AppWrapper;
