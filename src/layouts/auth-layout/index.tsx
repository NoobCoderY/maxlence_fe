import { Outlet } from "react-router-dom";
import Header from "./components/header";

const AuthLayout = () => {
  return (
    <div className='min-h-screen'>
      <div className='flex justify-start items-between gap-2'>
        <div className='w-full'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
