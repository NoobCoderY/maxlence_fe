export const validateEmail = (email: string) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};



  export const dummyUsers = [
    {
      id: 1,
      name: 'Yash',
      email: 'yash@gmail.com',
      role: 'Admin',
      status: 'Inactive',
    },
    {
      id: 2,
      name: 'John',
      email: 'john@gmail.com',
      role: 'User',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Jane',
      email: 'jane@gmail.com',
      role: 'Project Manager',
      status: 'Pending',
    },
    {
      id: 4,
      name: 'Alice',
      email: 'alice@gmail.com',
      role: 'Project Coordinator',
      status: 'Inactive',
    },
    {
      id: 5,
      name: 'Bob',
      email: 'bob@gmail.com',
      role: 'User',
      status: 'Active',
    },
  ];
