import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const ProtectedRoute = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user ? <Outlet /> : <Navigate to='/login' />;
};


const RoleProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) {
    return <Navigate to='/login' />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to='/forbidden' />; 
  }
  return <Outlet />;
};


export {ProtectedRoute,RoleProtectedRoute}