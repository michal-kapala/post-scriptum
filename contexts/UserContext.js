import React, { useEffect, useState } from "react";
import Constants from 'expo-constants';

export const UserContext = React.createContext();

const apiUrl = Constants.manifest.extra.apiUrl;

export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        loggedIn: false,
        token: '',
        userId: null,
        email: '',
        password: ''
    });

    useEffect(() => {
        console.log('UserContext updated: \n' + JSON.stringify(userData));
    }, [userData]);

    //Odświeża jwt kiedy skończy się jego ważność
    async function relogin() {
        var status, newToken = null, userId = null;
        const res = await fetch(`${apiUrl}/auth/login`, {
            body: JSON.stringify({
                email: userData.email,
                password: userData.password
            }),
            headers: { "Content-Type": "application/json" },
            method: 'POST'
        })
            .then(response => {
                status = response.status;
                return response.json();
            })
            .then(body => {
                var jsonStr = JSON.stringify(body);
                var jsonObj = JSON.parse(jsonStr);
                newToken = jsonObj.token;
                userId = jsonObj.user_id;
                if (status == 200) {
                    setUserData({
                        ...userData,
                        token: newToken,
                        userId: userId
                    });
                }
            });
        return { newToken, userId };
    }

    return (
        <UserContext.Provider value={{ userData, setUserData, relogin }}>
            {children}
        </UserContext.Provider>
    );
}