import {db} from "../firebase"
import { collection, getDocs,
    addDoc, updateDoc, deleteDoc, doc ,getDoc } from "firebase/firestore"

const CouponCollectionRef = collection(db, "Coupon") 
class CouponCollection {
    addCoupon = (newCoupon) => {
        return addDoc(CouponCollectionRef, newCoupon )
    };
    deleteCoupon = (id) => {
        const CouponDoc = doc(db, "Coupon", id);
        return deleteDoc(CouponDoc)
    };
    getAllCoupon = () => {
        return getDocs(CouponCollectionRef);
    };


}

export default new CouponCollection();