async function downloadVideo() {
    const urlInput = document.getElementById('url').value;
    const resultDiv = document.getElementById('result');

    if (!urlInput) {
        alert('Masukkan URL TikTok terlebih dahulu!');
        return;
    }

    resultDiv.innerHTML = "Sedang memproses...";

    try {
        const response = await fetch(`https://api.ryzendesu.vip/api/downloader/ttdl?url=${encodeURIComponent(urlInput)}`, {
            headers: { 'accept': 'application/json' }
        });

        const data = await response.json();

        if (data.success && data.data && data.data.data && data.data.data.play) {
            resultDiv.innerHTML = `
                <video controls>
                    <source src="${data.data.data.play}" type="video/mp4">
                    Browser Anda tidak mendukung video.
                </video>
                <br>
                <a href="${data.data.data.play}" download>Download Video</a>
            `;
        } else {
            resultDiv.innerHTML = "Gagal mendapatkan video. Pastikan URL benar!";
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "Terjadi kesalahan. Coba lagi nanti.";
    }
}