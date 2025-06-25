import React, { createContext, useState } from 'react';

const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user,setUser]=useState(
    {
        email:"",
        fullName:
        {
            firstName:"",
            lastName:""
        }
    }
  );
  return (
    <UserDataContext.Provider value={{user,setUser}}>
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext };
export default UserContext;
