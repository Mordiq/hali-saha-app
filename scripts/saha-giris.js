window.onload = function () {



}

export function sahaGiris() {
    var sahamail = document.getElementById("halisaha-giris-email").value;
    var sahasifre = document.getElementById("halisaha-giris-sifre").value;
    var form = new FormData();
    form.append("sahamail", sahamail);
    form.append("sahasifre", sahasifre);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/Hali-Saha-Uygulamasi/backend/saha-giris.php", true);
    xhr.send(form);

    xhr.onload = function () {
        console.log(this.response);
        var res = this.response;
        if (res == "true") {
            //Buraya Uygulamanın Arama Sayfası linki verilecek.
            window.location.replace("http://localhost/HaliSahaUygulamasi/pages/sahayonetim.html");

        }
    };
}