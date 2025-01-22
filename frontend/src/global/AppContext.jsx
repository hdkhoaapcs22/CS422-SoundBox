import React from "react";

export const AppContext = React.createContext();

const AppContextProvider = (props) => {
    const [role, setRole] = React.useState("");
    const value = {
        role,
        setRole,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
export default AppContextProvider;
