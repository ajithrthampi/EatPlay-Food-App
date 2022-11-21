import  {db} from "../firebase"
import { collection, getDocs, 
  addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"

    const productCollectionRef = collection(db, "products")
    class ProductCollection {

         addProduct = (newUser) => {
            return addDoc(productCollectionRef, newUser)
         ;}
         

        updateProduct = (id, updateProduct) => {
            const productDoc = doc(db, "products", id);
            return updateDoc(productDoc, updateProduct)
        };

        deleteUser = (id) => {
            const UserDoc = doc(db, "signupUser", id);
            return deleteDoc(UserDoc)
        };

        getAllProduct = () => {
            return getDocs(productCollectionRef);
        };

        getuser = (id) => {
            const productDoc = doc(db, "products", id);
            return getDocs(productDoc)
        }
    }

    export default ProductCollection