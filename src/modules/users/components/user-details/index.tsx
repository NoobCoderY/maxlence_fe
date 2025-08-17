import { useEffect, useState } from 'react';
import UserInfo from './user-info';
import { useUserDetailsQuery } from '../../services/userApi';
import { useParams } from 'react-router-dom';
import { User } from '../../models';

export default function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);

  const { data: userDetails, refetch: refetchUser } = useUserDetailsQuery({
    userId: userId || '',
  });

  useEffect(() => {
    if (userDetails?.data) {
      setUser(userDetails.data);
    }
  }, [userDetails]);

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  const handleUpdateUser = (field: keyof User, value: string) => {
    setUser((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  return (
    <div className='container mx-auto p-4 sm:p-6 max-w-7xl'>
      <h1 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900'>
        User Details
      </h1>
      {user && (
        <UserInfo
          user={user}
          onUpdateUser={handleUpdateUser}
          onRefetch={refetchUser}
        />
      )}
    </div>
  );
}
