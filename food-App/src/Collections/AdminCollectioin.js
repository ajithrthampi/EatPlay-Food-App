import {db} from "../firebase"
import { collection, getDocs,
    addDoc, updateDoc, deleteDoc, doc ,getDoc } from "firebase/firestore"

const adminCollectionRef = collection(db, "adminLogin")
class AdminCollection {
    addAdmin = (newAdmin) => {
        return addDoc(adminCollectionRef, newAdmin )
    };
    updateAdmin = (id, updateAdmin) => {
        const adminDoc = doc(db, "adminLogin", id);
        return updateAdmin(adminDoc, updateAdmin )

    };
    getAllAdmin = () => {
        return getDocs(adminCollectionRef);
    };
    getadmin = (id) => {
        const user = doc(db, "adminLogin", id);
        return getDocs(user);
    }    
}    
export default new AdminCollection();