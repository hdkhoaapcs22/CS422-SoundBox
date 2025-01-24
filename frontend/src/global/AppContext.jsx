import React from "react";

export const AppContext = React.createContext();

const AppContextProvider = (props) => {
    const [role, setRole] = React.useState("");
    const [artistId, setArtistId] = React.useState("");
    const [listenerId, setListenerId] = React.useState("");

    const value = {
        role,
        setRole,
        artistId,
        setArtistId,
        listenerId,
        setListenerId,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
export default AppContextProvider;
