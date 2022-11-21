import {db} from "../firebase"
import { collection, getDocs,
    addDoc, updateDoc, deleteDoc, doc ,getDoc } from "firebase/firestore"
    import { useUserAuth } from '../context/UserAuthContext'

  
    // const uid = user.uid;
    

const CartUserCollectionRef = collection(db, "userCart")


class CartUserCollection {
    addCart = (newCart) => {
        return addDoc(CartUserCollectionRef, newCart)
    };

    updateCart = (id, updateCart) => {
        const userDoc = doc(db, "userCart", id);
        return updateDoc(userDoc, updateCart)
    };

    getAllCarts = () => {
        return getDocs(CartUserCollectionRef);
    };

    deleteCart = (id) => {
        const UserDoc = doc(db, "userCart", id);
        return deleteDoc(UserDoc)
    };

} 
 export default new CartUserCollection();