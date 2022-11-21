import {db} from "../firebase"
import { collection, getDocs,
    addDoc, updateDoc, deleteDoc, doc ,getDoc } from "firebase/firestore"

const signupCollectionRef = collection(db, "signupUser") 
class SignupCollection {
    addUser = (newUser) => {
        return addDoc(signupCollectionRef, newUser )
    };

    updateUser = (id, updateUser) => {
        const userDoc = doc(db, "signupUser", id);
        return updateDoc(userDoc, updateUser)
    };
    

    deleteUser = (id) => {
        const UserDoc = doc(db, "signupUser", id);
        return deleteDoc(UserDoc)
    };
    getAllUser = () => {
        return getDocs(signupCollectionRef);
    };

    getuser = (id) => {
        const user = doc(db, "signupUser", id);
        return getDocs(user);
    }
}

export default new SignupCollection();
