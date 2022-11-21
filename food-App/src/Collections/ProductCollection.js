import {db} from "../firebase"
import { collection, getDocs,
    addDoc, updateDoc, deleteDoc, doc ,getDoc } from "firebase/firestore"

const ProductCollectionRef = collection(db, "products") 
class ProductCollection {
    addProducts = (newProduct) => {
        return addDoc(ProductCollectionRef, newProduct )
    };

    updateProducts = (id, updateProducts) => {
        const userDoc = doc(db, "products", id);
        return updateDoc(userDoc, updateProducts)
    };

    deleteUser = (id) => {
        const UserDoc = doc(db, "products", id);
        return deleteDoc(UserDoc)
    };
    
    getAllProducts = () => {
        return getDocs(ProductCollectionRef);
    };

    getProducts = (id) => {
        const user = doc(db, "products", id);
        return getDocs(user);
    }

    
}

export default new ProductCollection();
