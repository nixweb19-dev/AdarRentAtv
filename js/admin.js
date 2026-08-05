import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { db, auth } from "./firebase.min.js";

document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const loginScreen = document.getElementById('loginScreen');
    const adminLayout = document.getElementById('adminLayout');
    const loginForm = document.getElementById('adminLoginForm');
    const loginError = document.getElementById('loginError');
    const logoutBtn = document.getElementById('logoutBtn');
    const tableBody = document.getElementById('reservationsTableBody');
    
    let unsubscribeSnapshot = null;

    // ----------------------------------------------------
    // 1. Firebase Auth State Listener (Giriş Durumu Kontrolü)
    // ----------------------------------------------------
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Kullanıcı giriş yapmışsa paneli göster
            loginScreen.style.display = 'none';
            adminLayout.style.display = 'flex';
            loadData(); // Veritabanını dinlemeye başla
        } else {
            // Kullanıcı giriş yapmamışsa login ekranını göster
            loginScreen.style.display = 'flex';
            adminLayout.style.display = 'none';
            
            // Eğer veritabanı dinleniyorsa dinlemeyi durdur (güvenlik için)
            if (unsubscribeSnapshot) {
                unsubscribeSnapshot();
                unsubscribeSnapshot = null;
            }
        }
    });

    // ----------------------------------------------------
    // 2. Giriş (Login) Form Gönderimi
    // ----------------------------------------------------
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('adminEmail').value.trim();
        const password = document.getElementById('adminPassword').value;
        const btn = document.getElementById('loginBtn');
        
        loginError.style.display = 'none';
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Kontrol Ediliyor...';
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Başarılı olursa onAuthStateChanged otomatik tetiklenip UI'ı değiştirecek
            loginForm.reset();
        } catch (error) {
            console.error("Giriş hatası:", error);
            loginError.style.display = 'block';
            loginError.textContent = "Hatalı e-posta veya şifre. Lütfen tekrar deneyin.";
        } finally {
            btn.disabled = false;
            btn.innerHTML = 'Sisteme Gir';
        }
    });

    // ----------------------------------------------------
    // 3. Çıkış (Logout) İşlemi
    // ----------------------------------------------------
    logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            await signOut(auth);
            // Başarılı çıkış onAuthStateChanged'i tetikler ve login ekranına atar
        } catch (error) {
            console.error("Çıkış yapılamadı:", error);
            alert("Çıkış yapılamadı. Lütfen tekrar deneyin.");
        }
    });

    // ----------------------------------------------------
    // 4. Verileri Yükleme ve Dinleme İşlemi (onSnapshot)
    // ----------------------------------------------------
    function loadData() {
        if (unsubscribeSnapshot) return; // Zaten dinleniyorsa tekrar başlatma
        
        const reservationsRef = collection(db, "reservations");
        const q = query(reservationsRef, orderBy("createdAt", "desc"));

        unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
            tableBody.innerHTML = ''; 

            if (snapshot.empty) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="7" class="empty-state">
                            <i class="fa-solid fa-inbox"></i>
                            <p>Henüz hiç rezervasyon bulunmuyor.</p>
                        </td>
                    </tr>
                `;
                return;
            }

            snapshot.forEach((documentSnapshot) => {
                const data = documentSnapshot.data();
                const row = createTableRow(documentSnapshot.id, data);
                tableBody.appendChild(row);
            });
            
        }, (error) => {
            console.error("Veri dinleme hatası:", error);
            // Eğer Firestore kurallarına (rules) takılırsa bu hata döner (Örn: auth olmayan denediğinde)
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-state" style="color: #f87171;">
                        <i class="fa-solid fa-triangle-exclamation" style="opacity: 1; color: #f87171;"></i>
                        <p style="margin-bottom: 0.5rem; font-weight: 500;">Verilere erişim reddedildi veya bağlantı hatası.</p>
                        <small style="color: rgba(255,255,255,0.5);">Giriş yaptığınızdan ve Firebase kurallarınızın doğru olduğundan emin olun.</small>
                    </td>
                </tr>
            `;
        });
    }

    /**
     * Gelen Firestore verisini HTML Table Row (tr) formatına çevirir
     */
    function createTableRow(id, data) {
        const tr = document.createElement('tr');
        
        let formattedDate = '-';
        if (data.date) {
            const dateObj = new Date(data.date);
            formattedDate = dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
        }

        const statusRaw = data.status || 'beklemede';
        const statusClass = statusRaw.toLowerCase().replace(' ', '-'); 
        const statusText = statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1);
        
        if (statusRaw === 'onaylandı') {
            tr.classList.add('row-approved');
        }

        const fullName = `${data.firstName || '-'} ${data.lastName || '-'}`;
        const phone = data.phone || '-';
        const serviceName = data.serviceName || '-';
        const peopleCount = data.peopleCount ? `${data.peopleCount} Kişi` : '-';
        
        const approveBtn = statusRaw !== 'onaylandı' ? 
            `<button class="btn-action approve" data-id="${id}" data-action="approve"><i class="fa-solid fa-check"></i> Onayla</button>` : '';
        const cancelBtn = statusRaw !== 'iptal edildi' ? 
            `<button class="btn-action cancel" data-id="${id}" data-action="cancel"><i class="fa-solid fa-xmark"></i> İptal</button>` : '';
            
        tr.innerHTML = `
            <td>
                <div class="customer-info">
                    <strong>${fullName}</strong>
                    <span>Yaş: ${data.age || '-'}</span>
                </div>
            </td>
            <td>${phone}</td>
            <td><span class="service-badge">${serviceName}</span></td>
            <td>
                <div class="date-time">
                    <span>${formattedDate}</span>
                    <span>${data.time || '-'}</span>
                </div>
            </td>
            <td>${peopleCount}</td>
            <td>
                <div class="customer-info">
                    <span style="font-family: monospace; font-size: 0.85em; color: #34d399;">${data.ipAddress || '-'}</span>
                    <span style="font-size: 0.75em; opacity: 0.6; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${data.userAgent || ''}">
                        ${data.userAgent ? data.userAgent.split(' ')[0] : '-'}
                    </span>
                </div>
            </td>
            <td>
                <span class="status-badge ${statusClass}">
                    ${statusText}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    ${approveBtn}
                    ${cancelBtn}
                    <button class="btn-action delete" data-id="${id}" data-action="delete" title="Sil">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </td>
        `;
        
        return tr;
    }

    // ----------------------------------------------------
    // Tablodaki İşlem Butonlarını Dinleme (Event Delegation)
    // ----------------------------------------------------
    tableBody.addEventListener('click', async (e) => {
        const btn = e.target.closest('.btn-action');
        if (!btn) return; 

        const docId = btn.getAttribute('data-id');
        const action = btn.getAttribute('data-action');
        const docRef = doc(db, "reservations", docId);

        try {
            if (action === 'approve') {
                btn.disabled = true;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
                await updateDoc(docRef, { status: "onaylandı" });
            } 
            else if (action === 'cancel') {
                btn.disabled = true;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
                await updateDoc(docRef, { status: "iptal edildi" });
            } 
            else if (action === 'delete') {
                const isConfirmed = confirm("Bu rezervasyonu kalıcı olarak silmek istediğinize emin misiniz?");
                if (isConfirmed) {
                    btn.disabled = true;
                    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
                    await deleteDoc(docRef);
                }
            }
        } catch (error) {
            console.error("İşlem gerçekleştirilemedi:", error);
            alert("İşlem sırasında bir hata oluştu veya yetkiniz yok.");
            btn.disabled = false;
        }
    });
});
