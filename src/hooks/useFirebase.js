import initializeFirebase from "../components/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";


// initialize firebase app
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const auth = getAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    // register a new user

    const registerUser = (email, password,location,history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((data) => {
                // Signed in
                // const user = userCredential.user;
                const destination = '/userlist';
                history.replace(destination);
                setAuthError('');
                console.log(data);
                setUser(data.user);
                // ...
            
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setAuthError(errorMessage);
                // ..
            })
            .finally(()=>setIsLoading(false));
    }

    // login existing user

    const loginUser = (email, password,location,history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((data) => {
                console.log(data);
                const destination ='/userlist';
                history.replace(destination);
                setAuthError('');
                setUser(data.user);
                
            })
            .catch((error) => {
                const errorMessage = error.message;
                setAuthError(errorMessage);
            })
            .finally(()=> setIsLoading(false));
    }

    // logout function

    const logout = () => {
            signOut(auth).then(() => {
            // Sign-out successful.
            }).catch((error) => {
            // An error happened.
                setAuthError(error.message);
            })
            .finally(()=> setIsLoading(false));    ;
        
    }

    // observe user's state change
    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUser(user);
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
    }, [])
    
    return {
        user,
        isLoading,
        registerUser,
        loginUser,
        logout,
        authError,
    }
}

export default useFirebase;