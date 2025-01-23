import React from "react";

export const AppContext = React.createContext();

const AppContextProvider = (props) => {
    const [role, setRole] = React.useState("");
    const [id, setId] = React.useState("");
    
    const value = {
        role,
        setRole,
        id,
        setId,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
export default AppContextProvider;
