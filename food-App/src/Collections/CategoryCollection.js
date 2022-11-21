import {db} from "../firebase"
import { collection, getDocs,
    addDoc, updateDoc, deleteDoc, doc ,getDoc } from "firebase/firestore"

const categoryCollectionRef = collection(db, "category") 
class CategoryCollection {
    addCategory = (newCategory) => {
        return addDoc(categoryCollectionRef, newCategory )
    };

    updateCategory = (id, updateCategory) => {
        const categoryDoc = doc(db, "category", id);
        return updateDoc(categoryDoc, updateCategory)
    };

    deleteCategory = (id) => {
        const categoryDoc = doc(db, "category", id);
        return deleteDoc(categoryDoc)
    };
    getAllCategory = () => {
        return getDocs(categoryCollectionRef);
    };

    getcategory = (id) => {
        const category = doc(db, "category", id);
        return getDocs(category);
    }
}

export default new CategoryCollection();
