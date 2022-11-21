import {db} from "../firebase"
import { collection, getDocs,
    addDoc, updateDoc, deleteDoc, doc ,getDoc } from "firebase/firestore"
import userEvent from "@testing-library/user-event"

const CartUidCollectionRef = collection(db, "Carts" ) 
class CartUidCollection {

    getAllCartUid = () => {
        return getDocs(CartUidCollectionRef);
    };
}
export default new CartUidCollection();