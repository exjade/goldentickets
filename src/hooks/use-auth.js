// useAuthListener.js
import { useEffect, useState } from 'react';
import { authentication, firestore } from '../lib/firebase';

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = authentication.onAuthStateChanged((authUser) => {
            if (authUser) {
                // El usuario ha iniciado sesión, ahora obtén información adicional (como el rol) de Firestore.
                firestore
                    .collection('users')
                    .doc(authUser.uid)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            // Usuario encontrado en Firestore, establece el rol.
                            setUser({
                                uid: authUser.uid,
                                email: authUser.email,
                                role: doc.data().rol, // Asegúrate de que 'role' sea el nombre correcto del campo en Firestore.
                            });
                        } else {
                            // Usuario no encontrado en Firestore, establece el usuario sin rol.
                            setUser({
                                uid: authUser.uid,
                                email: authUser.email,
                                role: 'guest', // Puedes establecer un valor predeterminado si el usuario no tiene un rol.
                            });
                        }
                    });
            } else {
                // El usuario ha cerrado sesión.
                setUser({
                    role: 'guest', 
                });
            }
        });

        return () => unsubscribe();
    }, []);

    return { user };
};

export default useAuth;
