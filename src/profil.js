import { girisKontrol } from './kullanici-giris.js';
import Upload from './lib/Upload.js';

var profilId = "";
var gruplar = [];
var uploadProfilFotografi = "";
var url = ""
var yeniUrl = ""
window.onload = function () {


    girisKontrol();

    var form = new FormData();
    form.append("email", localStorage.getItem("auth-user"));
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../backend/profil-bilgileri.php", true);
    xhr.send(form);

    xhr.onload = function () {
        console.log(this.response);
        var res = this.response;



        res = JSON.parse(res);

        console.log(res);
        profilId = res[0]["id"];
        gruplar = res[0]["gruplar"];
        document.getElementById("profil-ad-soyad").value = res[0]["adisoyadi"];
        document.getElementById("profil-email").value = res[0]["email"];
        document.getElementById("profil-sifre").value = res[0]["sifre"];
        document.getElementById("profil-kullanici-adi").value = res[0]["kullaniciadi"];
        document.getElementById("pp").src = res[0]["profilfotografi"];

        var pageUrl = new URL(document.getElementById("pp").src);
        url = pageUrl.pathname.split("/");
        //url = "../" + url[2] + "/" + url[3];
        //url = "../" + url[url.length - 2] + "/" + url[url.length - 1];
        yeniUrl = "../uploads/" + url[url.length - 1];

        //document.getElementById("pp").src = url;
    };



    //Dosya seçme butonunun değişimini algıla.
    var uploadButton = document.getElementById("pp-upload").onchange = function () {

        uploadProfilFotografi = new Upload("pp-upload", "guncelle");

    }
    //Upload nesnesi oluştur.
    //Dosyayı upload nesnesine ver
    //Yükleme
    //Önizleme

    //Güncelleme
    var profilGuncelleButton = document.getElementById("guncelle");
    profilGuncelleButton.addEventListener("click", function () {
        var id = profilId;
        var adsoyad = document.getElementById("profil-ad-soyad").value;
        var email = document.getElementById("profil-email").value;
        var sifre = document.getElementById("profil-sifre").value;
        var kullaniciGruplar = gruplar;
        var kullaniciadi = document.getElementById("profil-kullanici-adi").value;
        var pp = yeniUrl;


        var form = new FormData();
        form.append("id", id);
        form.append("adsoyad", adsoyad);
        form.append("email", email);
        form.append("sifre", sifre);
        form.append("gruplar", kullaniciGruplar);
        form.append("kullaniciadi", kullaniciadi);
        form.append("profilfotografi", pp);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../backend/profil-guncelle.php", true);
        xhr.send(form);

        xhr.onload = function () {
            console.log(xhr.response);
        }

    });
}