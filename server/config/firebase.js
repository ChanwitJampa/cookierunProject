import { initializeApp } from "firebase/app"
import { getDatabase, set, ref, get ,update} from "firebase/database"
const connectFirebase =()=>{
    const firebaseConfig = {
        databaseURL: "https://cookierun-4d830-default-rtdb.asia-southeast1.firebasedatabase.app/"
    }
    
    const app = initializeApp(firebaseConfig)
    const db = getDatabase(app)
    return db;
}



export default connectFirebase