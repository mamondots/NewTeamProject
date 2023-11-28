import React from 'react';
import { createContext } from 'react';
import useAdmin from '../hooks/useAdmin';

export const roleContext = createContext(null);

const RoleProvider = ({children}) => {
    const [admin, adminLoading] = useAdmin();
    return (
        <roleContext.Provider value={{admin, adminLoading}}>
            {children}
        </roleContext.Provider>
    );
};

export default RoleProvider;