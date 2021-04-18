

export function giris(email, sifre) {

    var formData = new FormData();
    formData.append("email", email);
    formData.append("sifre", sifre);
    console.log("Form Data Bilgileri")
    console.log(formData);
    console.log(email + " " + sifre);
    //kapat();
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./backend/kullanici-giris.php", true);
    xhr.send(formData);

    xhr.onload = function () {
        console.log(this.response);
        var res = this.response;
        if (res == "true") {
            //Buraya Uygulamanın Arama Sayfası linki verilecek.
            localStorage.setItem("auth-user", email);

            window.location.replace("./pages/sonuc.html");
        }
    };
}

export function girisKontrol() {
    var user;
    if (localStorage.getItem("auth-user") != null) {
        user = localStorage.getItem("auth-user");

        console.log("Giriş yapan kullanıcı : " + user);
        var girislinkleri = document.getElementsByClassName("giris-linkleri");
        for (var i = 0; i < girislinkleri.length; i++) {
            girislinkleri[i].style.display = 'none';
        }

        var kullanicilinkleri = document.getElementsByClassName("kullanici-linkleri");

        for (var i = 0; i < kullanicilinkleri.length; i++) {
            kullanicilinkleri[i].style.display = 'display: block !important;';
        }
    } else {
        var kullanicilinkleri = document.getElementsByClassName("kullanici-linkleri");

        for (var i = 0; i < kullanicilinkleri.length; i++) {
            kullanicilinkleri[i].style.cssText = 'display:none !important;';
        }

        window.location.replace("../index.html");
    }
}