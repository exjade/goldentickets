import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase'

export default function useAuthListener() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));


    const { firebase } = useContext(FirebaseContext);
    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                const {
                    uid,
                    email,
                    displayName,
                    photoURL,
                    lastLoginAt,
                    createdAt,
                    stsTokenManager
                } = authUser;
                //if we have an authUser, save it to localStorage
                localStorage.setItem('authUser', JSON.stringify({
                    uid,
                    email,
                    displayName,
                    photoURL,
                    lastLoginAt,
                    createdAt,
                    stsTokenManager
                }));
                setUser({
                    uid,
                    email,
                    displayName,
                    photoURL,
                    lastLoginAt,
                    createdAt,
                    stsTokenManager
                });
            } else {
                //if we dont have an authUser, clear the localStorage
                localStorage.removeItem('authUser');
                setUser(null);
            }

        });
        return () => listener();
    }, [firebase])

    return { user }
}