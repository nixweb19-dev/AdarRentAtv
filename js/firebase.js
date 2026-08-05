import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// Kendi projenizin asıl ayarları (Screenshot'tan alındı)
const firebaseConfig = {
    apiKey: "AIzaSyB2wTknKXwextgMaom2hspOm5GSHzW4O8M",
    authDomain: "adar-atv.firebaseapp.com",
    projectId: "adar-atv",
    storageBucket: "adar-atv.firebasestorage.app",
    messagingSenderId: "672875398781",
    appId: "1:672875398781:web:bf5a95b287bbdcc884d314",
    measurementId: "G-2651RZR3NZ"
};

// Firebase Uygulamasını, Firestore Veritabanını ve Auth'u Başlat
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

/**
 * Rezervasyon formundan gelen verileri 'reservations' koleksiyonuna kaydeder.
 * Varsayılan olarak durumunu 'beklemede' (pending) yapar.
 * 
 * @param {Object} formData Kullanıcı form verileri
 * @returns {Promise<string>} Eklenen belgenin (document) ID'si
 */
export async function saveReservation(formData) {
    try {
        const reservationsRef = collection(db, "reservations");
        
        // Formdan gelen veriye ekstra yönetim alanları ekliyoruz
        const finalData = {
            ...formData,
            status: "beklemede", 
            createdAt: new Date().toISOString()
        };

        const docRef = await addDoc(reservationsRef, finalData);
        console.log("Rezervasyon başarıyla kaydedildi. Belge ID:", docRef.id);
        
        return docRef.id;
    } catch (error) {
        console.error("Firestore'a veri eklerken bir hata oluştu:", error);
        throw error; // Hatayı UI'da (main.js) yakalamak için fırlatıyoruz
    }
}

/**
 * Verilen rezervasyon ID'sine gore durum bilgisini Firestore'dan ceker.
 */
export async function getReservationStatus(docId) {
    try {
        const docRef = doc(db, "reservations", docId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            return docSnap.data().status;
        } else {
            return null; // Kayit bulunamadi
        }
    } catch (error) {
        console.error("Durum sorgulanirken hata olustu:", error);
        throw error;
    }
}
