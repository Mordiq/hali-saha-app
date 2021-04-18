import { girisKontrol } from "./kullanici-giris.js";
import Search from './Observable/Search.js';
import Team from "./Observer/Team.js";
import TeamPlayer from "./Observer/TeamPlayer.js";


window.onload = function () {
    girisKontrol();

    var oyuncuArama = new Search();
    var takimlarimdaArama = new Search();

    var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
        if (oReq.readyState == XMLHttpRequest.DONE) {
            console.log(oReq.response);
            var response = oReq.response;
            response = JSON.parse(response);
            console.log(response);


            response.forEach(element => {
                console.log(element)

                if (element.kurucu == localStorage.getItem("auth-user")) {
                    var takim = new Team(element.id, element.takimadi, element.takimkontejyan, element.oyuncular, element.aciklama, element.kurucu);
                    takim.render();
                    takimlarimdaArama.addPostOnList(takim);

                    //Takımın içinde yazan oyuncuları diziolarak al
                    takim.oyuncular.forEach(playerId => {
                        console.log("PlayerId : " + playerId)


                        var oReq = new XMLHttpRequest();
                        oReq.onreadystatechange = function () {
                            if (oReq.readyState == XMLHttpRequest.DONE) {
                                console.log(oReq.response);
                                var response = oReq.response;
                                response = JSON.parse(response);
                                console.log(response);


                                response.forEach(element => {

                                    if (playerId == element.id) {
                                        var player = new TeamPlayer(element.id, element.adisoyadi, element.email, element.sifre, element.gruplar, element.kullaniciadi, element.profilfotografi);
                                        player.teamRender(takim.id);
                                    }

                                });


                                var kullaniciSilmeButtonlar = document.getElementsByClassName("kisiyi-takimdan-sil");
                                for (var i = 0; i < kullaniciSilmeButtonlar.length; i++) {
                                    kullaniciSilmeButtonlar[i].addEventListener("click", function (e) {
                                        var pId = e.target.getAttribute("data-kisiid");
                                        oyuncuArama.observers.forEach(oyuncu => {
                                            if (oyuncu.id == e.target.getAttribute("data-kisiid")) {
                                                console.log("-*-");
                                                takimlarimdaArama.observers.forEach(el => {
                                                    if (el.oyuncular.includes(oyuncu.id)) {
                                                        el.removePlayer(oyuncu);
                                                    }
                                                });

                                                //takim.removePlayer(oyuncu);
                                                //oyuncu.removeTeam(e.target.getAttribute("data-teamid"))
                                                oyuncu.sendNotification(takim.takimadi + " isimli takımdan çıkarıldınız!", takim.id, "silme");
                                                console.log("----------------Kullanıcı silme sonrası------------------")
                                            }
                                        });

                                    })
                                }


                            }


                        }

                        oReq.open("GET", "../backend/kullanici-getir.php", false);
                        oReq.send();





                    });
                }

            });



            var oyuncuEklemeButonlari = document.getElementsByClassName("oyuncu-ekle-button");

            for (var i = 0; i < oyuncuEklemeButonlari.length; i++) {
                oyuncuEklemeButonlari[i].addEventListener("click", function (e) {
                    localStorage.setItem("selectedTeamId", e.target.getAttribute("data-takimid"));
                    var takimid = e.target.getAttribute("data-takimid");
                    document.getElementById("takima-ekle").style.display = "flex";
                });
            }




        }
    }
    oReq.open("GET", "../backend/takimlari-getir.php", false);
    oReq.send();


    var takimlardaAramaInput = document.getElementById("takim-arama-input");
    takimlardaAramaInput.addEventListener("keyup", function (e) {
        takimlarimdaArama.notify(takimlardaAramaInput.value);
    });



    takimlarimdaArama.observers.forEach(takim => {



    });






    var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
        if (oReq.readyState == XMLHttpRequest.DONE) {
            console.log(oReq.response);
            var response = oReq.response;
            response = JSON.parse(response);
            console.log(response);


            response.forEach(element => {
                var player = new TeamPlayer(element.id, element.adisoyadi, element.email, element.sifre, element.gruplar, element.kullaniciadi, element.profilfotografi);
                player.render("kisiler-liste");
                oyuncuArama.addPostOnList(player);
            });



            var kisiEkleme = document.getElementsByClassName("kisiyi-takima-ekle");
            for (var i = 0; i < kisiEkleme.length; i++) {
                kisiEkleme[i].addEventListener("click", function (e) {
                    var playerId = e.target.getAttribute("data-kisiid")


                    //Bu id'ye ait takımı bul ve içindeki güncelleme fonksiyonunu çağır ve içine bu oyuncuyu ver.
                    takimlarimdaArama.observers.forEach(t => {
                        if (t.id == localStorage.getItem("selectedTeamId")) {


                            //Eğer aradığım takımı bulursam oyuncular içinde arama yapıyorum.

                            oyuncuArama.observers.forEach(oyuncu => {
                                if (oyuncu.id == playerId) {

                                    //Oyuncular içinde oyuncuyu bulursam takımın oyuncu ekleme fonksiyonuna bulduğum oyuncuyu veriyorum.

                                    t.addPlayer(oyuncu);

                                    oyuncu.sendNotification(t.takimadi + " isimli bir takıma eklendiniz!", t.id, "ekleme");
                                }
                            });

                        }
                    });
                });
            }
        }
    }

    oReq.open("GET", "../backend/kullanici-getir.php", false);
    oReq.send();

    var oyuncuAramaInput = document.getElementById("kisi-arama-input");

    oyuncuAramaInput.addEventListener('keyup', function (e) {
        //alert(oyuncuAramaInput.value)
        oyuncuArama.notify(oyuncuAramaInput.value);
    })



    //Takım Ekleme Formunu açma
    var takimOlusturmaButton = document.getElementById("takim-olusturma-button");
    takimOlusturmaButton.addEventListener("click", function () {
        document.getElementById("takim-olustur-form-arkaplan").style.display = "flex";
    });

    var takimOlusturmaKapat = document.getElementById("takim-olusturma-kapat");
    takimOlusturmaKapat.addEventListener("click", function () {
        document.getElementById("takim-olustur-form-arkaplan").style.display = "none";
    });

    var takimOlustur = document.getElementById("takim-olustur-buttonu");
    takimOlustur.addEventListener("click", function () {
        //Form değerlerini al
        var takimAdi = document.getElementById("takim-adi-input").value;
        var takimAciklama = document.getElementById("takim-aciklama-input").value;
        var kontejyan = document.getElementById("count").value;

        var formData = new FormData();

        formData.append("takimadi", takimAdi);
        formData.append("aciklama", takimAciklama);
        formData.append("kontejyan", kontejyan);
        formData.append("kurucu", localStorage.getItem("auth-user"))
        console.log("Form Data Bilgileri")
        console.log(formData);
        //kapat();
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../backend/takim-olustur.php", true);
        xhr.send(formData);

        xhr.onload = function () {
            console.log(this.response);
            //var k1 = document.getElementsByClassName("las la-times");
            document.getElementById("takim-olustur-form-arkaplan").style.display = "none";

        };
        //FormDataya koy ve post et.
    });



    var incrementButton = document.getElementById("incrementButton");
    incrementButton.addEventListener("click", function () {
        var teamCount = document.getElementById("count").value;
        if (teamCount == "") {
            teamCount = 0;
        }
        setIncCounter(teamCount);
    });

    var decreaseButton = document.getElementById("decreaseButton");
    decreaseButton.addEventListener("click", function () {
        var teamCount = document.getElementById("count").value;
        if (teamCount == "") {
            teamCount = 0;
        }
        setDecCounter(teamCount);
    });


    function setIncCounter(v) {
        document.getElementById("count").value = ++v;
    }

    function setDecCounter(v) {
        document.getElementById("count").value = --v;
    }


    var oyuncuEklemeKapat = document.getElementById("oyuncu-ekle-form-kapat-container");
    oyuncuEklemeKapat.addEventListener("click", function () {
        document.getElementById("takima-ekle").style.display = "none";
    });


    // var oReq = new XMLHttpRequest();
    // oReq.onreadystatechange = function () {
    //     if (oReq.readyState == XMLHttpRequest.DONE) {
    //         console.log(oReq.response);
    //         var response = oReq.response;
    //         response = JSON.parse(response);
    //         console.log(response);


    //         response.forEach(element => {
    //             //console.log(element)
    //             var postNode = document.createElement('div');
    //             postNode.className = "pencere-uyeler"


    //             var card = '<div class="pencere-uye-dis" data-kisiid="' + element + '">' +
    //                 '<div class="pencere-uye-resim">' +
    //                 '<img src="' + element.profilfotografi + '">' +
    //                 '</div>' +
    //                 '<div class="pencere-uye-ad">' +
    //                 '<p class="pencere-ad1">' +
    //                 element.adisoyadi +
    //                 '</p>' +
    //                 '<p class="pencere-ad2">' +
    //                 element.kullaniciadi +
    //                 '</p>' +
    //                 '</div>' +
    //                 '<div class="pencere-icon">' +
    //                 '<button class="pencere-iconp">+</button>' +
    //                 '</div>' +
    //                 '</div>';

    //             postNode.innerHTML = card;
    //             var postList = document.getElementById("pencere-uyeler-kapsa");
    //             //postList.appendChild(postNode);

    //         });
    //         var eklebutonlar = document.getElementsByClassName("pencere-iconp");
    //         // alert(eklebutonlar.length);
    //         // for (var i = 0; i < eklebutonlar.length; {
    //         //     eklebutonlar[i].addEventListener("click", function () {
    //         //         //Burada randevu almak için post işlemi kodu olacak .
    //         //     });
    //         // }

    //     }
    // }
    // oReq.open("GET", "../backend/kullanici-getir.php");
    // oReq.send();




}