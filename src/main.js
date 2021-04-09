import { giris } from './kullanici-giris.js';
import { kullaniciKayit } from './kullanici-kayit.js';
import { sahaGiris } from './saha-giris.js';
import { sehirler, secilenIlIndex, secilenIlceIndex, secilenIl, secilenIlce, resim1, resim2, ozellikler, sehirSecenek, ilceSecenek, resimUpload, dosyalariGetir, resimleriYukle, sahaKayit, onizleme, secenek, ozellikEkle, secilenIlIndexAyarla, secilenIlceIndexAyarla, secilenIlAyarla, secilenIlceAyarla } from './sehir.js';
import { ozellikleriGetir } from './ozellik.js';


window.onload = function () {

    // alert();

    /*!! */





    ozellikleriGetir();

    var b1 = document.getElementById("kullanici-kayit-link");

    b1.addEventListener("click", function () {
        document.getElementById("kullanici-kayit-form-arkaplan").style.display = "flex";
    });

    var b2 = document.getElementById("kullanici-giris-link");

    b2.addEventListener("click", function () {
        document.getElementById("kullanici-giris-form-arkaplan").style.display = "flex";
    });

    var b3 = document.getElementById("halisaha-kayit-link");
    b3.addEventListener("click", function () {
        document.getElementById("hali-saha-kayit-form-arkaplan").style.display = "flex";
    });

    var b4 = document.getElementById("halisaha-giris-link");
    b4.addEventListener("click", function () {
        document.getElementById("hali-saha-giris-form-arkaplan").style.display = "flex";
    });

    /*!! */





    var kullaniciKayitButton = document.getElementById("kullaniciGirisButton");
    kullaniciKayitButton.addEventListener("click", function () {
        var email = document.getElementById("giris-email").value;
        var sifre = document.getElementById("giris-sifre").value;
        giris(email, sifre);
    });


    var kapat = document.getElementById("kapat");

    kapat.addEventListener("click", function () {
        document.getElementById("kullanici-giris-form-arkaplan").style.display = "none";
    });


    var kullaniciKayitButton = document.getElementById("kullaniciKayitButton");

    kullaniciKayitButton.addEventListener("click", function () {

        var adiSoyadi = document.getElementById("adisoyadi").value;
        var email = document.getElementById("email").value;
        var sifre = document.getElementById("sifre").value;
        var kullaniciadi = document.getElementById("kullaniciadi").value;
        console.log(adiSoyadi + " " + email + " " + sifre + " " + kullaniciadi);
        kullaniciKayit(adiSoyadi, email, sifre, kullaniciadi);
        //document.getElementById("kullanici-kayit-form-arkaplan").style.display = "none";
        //test();
    });




    var sahaGirisButton = document.getElementById("haliSahaGirisButton");

    sahaGirisButton.addEventListener("click", function () {
        sahaGiris();
    });




    resimUpload();
    sehirler.forEach(sehirSecenek);

    var sehirlerSecim = document.getElementById("sehirler-secim");

    sehirlerSecim.addEventListener("change", function () {
        var secilenSehir = document.getElementById("sehirler-secim");
        //secilenIlIndex = secilenSehir.options.selectedIndex - 1;
        //alert(secilenIlIndex);
        secilenIlIndexAyarla(secilenSehir.options.selectedIndex - 1);
        ///alert(secilenIlIndex);//secilenIlIndex constant error debug
        //secilenIl = secilenSehir.options[secilenSehir.options.selectedIndex].text;

        secilenIlAyarla(secilenSehir.options[secilenSehir.options.selectedIndex].text);
        console.log("index değiştirildi" + secilenIlIndex);
        ilceSecenek();
    });
    var ilcelerSecim = document.getElementById("ilceler-secim");

    ilcelerSecim.addEventListener("change", function () {

        var secilenIlce = document.getElementById("ilceler-secim");
        //secilenIlceIndex = secilenIlce.options.selectedIndex - 1;
        secilenIlceIndexAyarla(secilenIlce.options.selectedIndex - 1);
        //secilenIlce = secilenIlce.options[secilenIlce.options.selectedIndex].text;
        secilenIlceAyarla(secilenIlce.options[secilenIlce.options.selectedIndex].text);
        //alert(secilenIlce);
    });

    var sahaKayitButton = document.getElementById("haliSahaKayitButton");
    sahaKayitButton.addEventListener("click", function () {

        sahaKayit();

    });


    var ozellikCheckboxlari = document.getElementsByClassName("kontrol");

    for (var i = 0; i < ozellikCheckboxlari.length; i++) {
        ozellikCheckboxlari[i].addEventListener("change", function () {
            alert();

        });
    }

    //secenek();



    var formKapatButton = document.getElementsByClassName("form-kapat-button");

    for (var i = 0; i < formKapatButton.length; i++) {
        formKapatButton[i].addEventListener("click", function (e) {
            var j = 0;
            var el = e.target.id;
            console.log("Tıklanan Elementin Id'si : " + e);
            formuKapat(el);
            console.log(j++);
        });
    }





    //Kapat butonlarını bul.
    //TODO: Kapatma fonksiyonu daha düzgün bir yöntem hâline getirelecek. => Bu hâli sunum için..

    var k1 = document.getElementsByClassName("las la-times");

    for (var i = 0; i < k1.length; i++) {
        k1[i].addEventListener("click", function (e) {
            console.log("Tıklanan Form : " + e.target.parentNode);
            e.target.parentNode.parentNode.parentNode.style.display = "none";
        });
    }

}



function formuKapat(elementId) {
    var el = parentBulma(elementId);
    el.style.display = "none";
}

function parentBulma(elementId) {
    var parentElement = document.getElementById(elementId);
    var bodyNode = document.getElementsByTagName("Body")[0];
    while (parentElement.parentNode != bodyNode) {
        parentElement = parentElement.parentNode;
    }

    return parentElement;
}
