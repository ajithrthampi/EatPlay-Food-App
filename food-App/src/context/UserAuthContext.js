import { createContext, useContext, useEffect, useState,useReducer } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged
  } from "firebase/auth"
  import { auth } from "../firebase";

// export const StateContext = createContext(); 
const userAuthContext = createContext();

// export const StateProvider = ({reducer, initialState, children}) => (
//     <StateContext.Provider value={useReducer(reducer, initialState)}>
//     {children}
//   </StateContext.Provider>
// );
  
export function UserAuthContextProvider({ children}) {
    const [user, setUser] = useState("");

     function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
     }
     
     function logIn(email, password) {
        console.log("email",email);
        return signInWithEmailAndPassword(auth, email, password);
     }
     function logOut() {
        return signOut(auth);
     }

     function adminlogIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
     }

     useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);

        });
        return () => {
            unsubscribe();
        }

     }, []);

    return (
        <userAuthContext.Provider value={{user, signUp, logIn, logOut}}>
            {children}
        </userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext);

} 
// export const useStateValue = () => useContext(StateContext) 