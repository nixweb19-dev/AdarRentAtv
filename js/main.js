import { saveReservation } from './firebase.min.js';

const servicesData = {
    kapuz: {
        title: "KAPUZ KANYONU",
        subtitle: "ATV SAFARİ TURU",
        icon: '<i class="fa-solid fa-mountain-sun"></i>',
        htmlContent: `
            <div class="prose">
                <p class="lead" style="margin-bottom: 0.5rem; font-size: 0.95rem;">Doğanın kalbine uzanan eşsiz bir maceraya hazır mısın? Adrenalin ve serinlik dolu deneyim seni bekliyor!</p>
                
                <div class="prose-grid">
                    <div class="prose-section">
                        <h4>Tur Detayları</h4>
                        <ul class="check-list">
                            <li><strong>60 KM</strong> Off-Road Parkuru</li>
                            <li><strong>3 Saat</strong> Macera</li>
                            <li><strong>1 Saat</strong> Kanyonda Yüzme</li>
                        </ul>
                    </div>
                    
                    <div class="prose-section">
                        <h4>Olanaklar</h4>
                        <ul class="check-list">
                            <li>Fotoğraf/Video molaları</li>
                            <li>Çiftler ve gruplar için ideal</li>
                        </ul>
                    </div>
                </div>
                
                <div class="prose-section" style="margin-bottom: 0.5rem; padding: 0.75rem;">
                    <div class="price-box single-price" style="margin-top:0;">
                        <div class="price-item"><span>Fiyat (Sup Dahil)</span><strong>4.500₺</strong></div>
                    </div>
                    <p style="margin-top: 0.5rem; font-size: 0.85rem;"><strong>Katılım:</strong> Tek ya da 2 kişi binebilirsiniz.</p>
                </div>
                
                <p class="conclusion" style="margin-top: 0.5rem; padding: 0.75rem;">
                    <strong>Dikkat:</strong> Kontenjan sınırlıdır!<br>
                    <strong>İletişim:</strong> 0545 577 07 71
                </p>
            </div>
        `,
        timeSlots: ["09:00", "11:00", "13:00", "15:00", "17:00"]
    },
    cennet: {
        title: "CENNET",
        subtitle: "ATV SAFARİ TURU",
        icon: '<i class="fa-solid fa-leaf"></i>',
        htmlContent: `
            <div class="prose">
                <p class="lead" style="margin-bottom: 0.5rem; font-size: 0.95rem;">Şehrin gürültüsünden uzaklaşıp doğanın kalbinde eşsiz bir maceraya hazır olun!</p>
                
                <div class="prose-grid">
                    <div class="prose-section">
                        <h4>Tur Detayları</h4>
                        <ul class="check-list">
                            <li><strong>25 KM</strong> Orman Parkuru</li>
                            <li><strong>2 Saat</strong> Kesintisiz Macera</li>
                            <li>Rehber eşliğinde güvenli sürüş</li>
                        </ul>
                    </div>
                    
                    <div class="prose-section">
                        <h4>Olanaklar</h4>
                        <ul class="check-list">
                            <li>Doğal manzara molaları</li>
                            <li>Tozlu yollar ve çam ormanları</li>
                            <li>Çiftler ve gruplar için ideal</li>
                        </ul>
                    </div>
                </div>
                
                <div class="prose-section" style="margin-bottom: 0.5rem; padding: 0.75rem;">
                    <div class="price-box multi-price" style="margin-top:0;">
                        <div class="price-item"><span>Tek Kişi (Single)</span><strong>1.750₺</strong></div>
                        <div class="price-item"><span>İki Kişi (Double)</span><strong>2.500₺</strong></div>
                    </div>
                </div>
                
                <p class="conclusion" style="margin-top: 0.5rem; padding: 0.75rem;">
                    Doğanın içinde 2 saat boyunca gerçek safari ruhunu yaşamaya hazır mısın?<br>
                    <strong>Dikkat:</strong> Kontenjan sınırlıdır.
                </p>
            </div>
        `,
        timeSlots: ["09:00", "11:00", "13:00", "15:00", "17:00"]
    },
    anahard: {
        title: "ANA HARD",
        subtitle: "OFF-ROAD PARKURU",
        icon: '<i class="fa-solid fa-truck-monster"></i>',
        htmlContent: `
            <div class="prose">
                <p class="lead" style="margin-bottom: 0.5rem; font-size: 0.95rem;">Adrenalini zirvede yaşayacağınız unutulmaz bir dağ macerasına hazır mısınız?</p>
                
                <div class="prose-grid">
                    <div class="prose-section">
                        <h4>Seanslar (1-1.5 Saat)</h4>
                        <ul class="check-list">
                            <li><strong>Gündüz:</strong> 10:00, 14:00, 17:00</li>
                            <li><strong>Gece:</strong> 19:00, 22:00</li>
                        </ul>
                    </div>

                    <div class="prose-section">
                        <h4>Katılım Şartları</h4>
                        <ul class="check-list">
                            <li>Sürücü: 16+ Yaş</li>
                            <li>Yolcu: 5+ Yaş</li>
                            <li>Ehliyet gerektirmez</li>
                        </ul>
                    </div>
                </div>

                <div class="prose-section" style="margin-bottom: 0.5rem; padding: 0.75rem;">
                    <div class="price-box multi-price" style="margin-top:0;">
                        <div class="price-item"><span>Tek Kişi ATV</span><strong>1.400₺</strong></div>
                        <div class="price-item"><span>İki Kişi (Tek ATV)</span><strong>2.200₺</strong></div>
                    </div>
                </div>
                
                <p class="conclusion" style="margin-top: 0.5rem; padding: 0.75rem;">Macera, doğa ve özgürlüğü bir arada yaşayacağınız bu benzersiz deneyim için en uygun seansı seçin.</p>
            </div>
        `,
        timeSlots: ["10:00", "14:00", "17:00", "19:00", "22:00"]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Global State
    let activeServiceId = null;

    // Elements
    const serviceModal = document.getElementById('serviceModal');
    const bookingModal = document.getElementById('bookingModal');
    const serviceBtns = document.querySelectorAll('.service-btn');
    
    // Service Modal Elements
    const closeServiceModalBtn = document.getElementById('closeServiceModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalContent = document.getElementById('modalContent');
    const btnOpenBooking = document.getElementById('btnOpenBooking');

    // Booking Modal Elements
    const closeBookingModalBtn = document.getElementById('closeBookingModal');
    const bookingServiceTitle = document.getElementById('bookingServiceTitle');
    const timeSelect = document.getElementById('time');
    const dateInput = document.getElementById('date');
    const bookingForm = document.getElementById('bookingForm');

    // Success Modal Elements
    const successModal = document.getElementById('successModal');
    const btnSuccessOk = document.getElementById('btnSuccessOk');
    const successMessageText = document.getElementById('successMessageText');

    // ----------------------------------------------------
    // Modal & Navigation Logic
    // ----------------------------------------------------

    function openServiceModal(serviceId) {
        const data = servicesData[serviceId];
        if (!data) return;
        activeServiceId = serviceId;

        modalIcon.innerHTML = data.icon;
        modalTitle.textContent = data.title;
        modalSubtitle.textContent = data.subtitle;

        let contentHTML = '';
        if (data.htmlContent) {
            contentHTML = data.htmlContent;
        } else {
            contentHTML = '<ul class="detail-list">';
            data.details.forEach(item => {
                const highlightClass = item.highlight ? 'highlight-text' : '';
                contentHTML += `<li class="${highlightClass}"><i class="${item.icon}"></i> <span>${item.text}</span></li>`;
            });
            contentHTML += '</ul>';

            if (data.prices && data.prices.length > 0) {
                contentHTML += '<div class="price-box multi-price">';
                data.prices.forEach(p => {
                    contentHTML += `<div class="price-item"><span>${p.label}</span><strong>${p.amount}</strong></div>`;
                });
                contentHTML += '</div>';
            } else if (data.price) {
                contentHTML += `
                    <div class="price-box single-price">
                        <div class="price-item">
                            <span>${data.priceText}</span>
                            <strong>${data.price}</strong>
                        </div>
                    </div>`;
            }
        }
        modalContent.innerHTML = contentHTML;
        
        serviceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function openBookingModal() {
        if (!activeServiceId) return;
        
        serviceModal.classList.remove('active');
        
        const data = servicesData[activeServiceId];
        bookingServiceTitle.textContent = `${data.title} ${data.subtitle}`;

        timeSelect.innerHTML = '<option value="" disabled selected>Seans Seçiniz</option>';
        data.timeSlots.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        });

        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);

        setTimeout(() => {
            bookingModal.classList.add('active');
        }, 300);
    }

    function closeAllModals() {
        serviceModal.classList.remove('active');
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function goBackToServiceModal() {
        bookingModal.classList.remove('active');
        setTimeout(() => {
            serviceModal.classList.add('active');
        }, 300);
    }

    function closeSuccessModal() {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ----------------------------------------------------
    // Event Listeners
    // ----------------------------------------------------

    serviceBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openServiceModal(btn.getAttribute('data-id'));
        });
    });

    btnOpenBooking.addEventListener('click', openBookingModal);
    closeServiceModalBtn.addEventListener('click', closeAllModals);
    closeBookingModalBtn.addEventListener('click', goBackToServiceModal);

    serviceModal.addEventListener('click', (e) => {
        if (e.target === serviceModal) closeAllModals();
    });
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) closeAllModals();
    });
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) closeSuccessModal();
    });
    btnSuccessOk.addEventListener('click', closeSuccessModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
            closeSuccessModal();
        }
    });

    // ----------------------------------------------------
    // Form Submission & Firebase Integration
    // ----------------------------------------------------
    
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 1. Rate Limiting Kontrolü (10 dakika)
        const now = Date.now();
        const lastSubmitTime = localStorage.getItem('lastReservationTime');
        if (lastSubmitTime && (now - lastSubmitTime < 10 * 60 * 1000)) {
            alert('Çok sık form gönderdiniz. Lütfen spam koruması gereği 10 dakika sonra tekrar deneyin.');
            return;
        }

        // 2. Telefon Doğrulama (Regex)
        const phoneValue = document.getElementById('phone').value.trim();
        const phoneRegex = /^(05|5)\d{9}$/; // Sadece 05 veya 5 ile başlayan 10-11 haneli TR numaraları
        if (!phoneRegex.test(phoneValue.replace(/\s+/g, ''))) {
            alert('Lütfen geçerli bir Türkiye cep telefonu numarası giriniz (Örn: 05xx xxx xx xx).');
            return;
        }
        
        const submitBtn = document.querySelector('button[form="bookingForm"]');
        const originalBtnHTML = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> İşleniyor...';
        submitBtn.disabled = true;

        try {
            // 3. reCAPTCHA v3 Token (İstemci Tarafı Entegrasyonu)
            if (typeof grecaptcha !== 'undefined') {
                await new Promise((resolve) => {
                    grecaptcha.ready(function() {
                        grecaptcha.execute('RECAPTCHA_SITE_KEY_BURAYA_GELECEK', {action: 'submit'}).then(function(token) {
                            // Gerekirse bu token backend'e gönderilir
                            resolve(token);
                        });
                    });
                });
            }

            // 4. IP ve Cihaz Bilgisi Çekme
            let ipAddress = 'Bilinmiyor';
            try {
                const ipRes = await fetch('https://api.ipify.org?format=json');
                const ipData = await ipRes.json();
                ipAddress = ipData.ip;
            } catch (err) {
                console.error("IP alınamadı:", err);
            }
            const userAgent = navigator.userAgent;

            // 5. Form Verilerini Topla (IP ve Cihaz eklendi)
            const formData = {
                serviceId: activeServiceId,
                serviceName: servicesData[activeServiceId].title,
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                phone: phoneValue,
                age: parseInt(document.getElementById('age').value),
                peopleCount: parseInt(document.getElementById('peopleCount').value),
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                ipAddress: ipAddress,
                userAgent: userAgent
                // status ve createdAt firebase.js'de otomatik eklenecek
            };

            // 6. Veriyi Firebase'e Gönder
            await saveReservation(formData);

            // Başarılı olduğunda Rate Limit kaydını güncelle
            localStorage.setItem('lastReservationTime', Date.now());

            // 7. Başarılı İşlem Bildirimi
            submitBtn.innerHTML = '<i class="fa-solid fa-check-double"></i> Randevu Alındı!';
            submitBtn.style.background = "#22c55e"; 
            submitBtn.style.color = "#fff";
            
            setTimeout(() => {
                successMessageText.textContent = `Sayın ${formData.firstName} ${formData.lastName}, rezervasyon talebiniz başarıyla alındı. Size en kısa sürede dönüş sağlayacağız.`;
                
                // Formu Sıfırla ve Yeni Modalı Aç
                bookingModal.classList.remove('active');
                successModal.classList.add('active');
                bookingForm.reset();
                
                // Butonu Varsayılan Haline Döndür
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;
                submitBtn.style.background = "";
                submitBtn.style.color = "";
            }, 1000);

        } catch (error) {
            // Hata Durumu Kontrolü
            console.error('Rezervasyon gönderim hatası:', error);
            alert('Form gönderilirken bir hata oluştu. Lütfen bağlantınızı veya Firebase yapılandırmanızı kontrol edip tekrar deneyin.');
            
            submitBtn.innerHTML = originalBtnHTML;
            submitBtn.disabled = false;
        }
    });

    // ----------------------------------------------------
    // Cookie / KVKK Banner Logic
    // ----------------------------------------------------
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    
    if (cookieBanner && acceptCookiesBtn) {
        // Eğer daha önce kabul edilmemişse göster (ufak bir gecikmeyle)
        if (!localStorage.getItem('cookiesAccepted')) {
            setTimeout(() => {
                cookieBanner.classList.add('active');
                cookieBanner.setAttribute('aria-hidden', 'false');
            }, 2000);
        }

        // Kabul et butonuna basıldığında
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('active');
            cookieBanner.setAttribute('aria-hidden', 'true');
        });
    }

});
