// ----------------------------------------------------
// Anti-Inspect Security Script
// Bu dosya, sıradan kullanıcıların sağ tıklama ve geliştirici 
// seçeneklerini açmasını engellemek için tasarlanmıştır.
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sağ Tıklama (Context Menu) Engelleme
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // 2. Klavye Kısayolları Engelleme
    document.addEventListener('keydown', (e) => {
        // F12 Tuşu
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }

        // Ctrl + Shift + I (Geliştirici Araçları - Windows/Linux)
        // Cmd + Option + I (Mac)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
            e.preventDefault();
            return false;
        }

        // Ctrl + Shift + J (Geliştirici Araçları Console)
        if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
            e.preventDefault();
            return false;
        }

        // Ctrl + U (Kaynak Kodunu Görüntüle - Windows/Linux)
        // Cmd + Option + U (Mac)
        if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl + Shift + C (Element Seçici)
        if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
            e.preventDefault();
            return false;
        }
    });

    // Ekstra: Sürükle Bırak Koruması (İçerik çalınmasını zorlaştırmak için)
    document.addEventListener('dragstart', (e) => {
        if (e.target.nodeName.toLowerCase() === 'img') {
            e.preventDefault();
        }
    });
});
