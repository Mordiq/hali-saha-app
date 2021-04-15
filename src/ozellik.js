import { secenek } from './sehir.js';

var results = null;

export async function ozellikleriGetir() {

    var oReq = new XMLHttpRequest();
    //oReq.addEventListener("load", sonuc);
    oReq.open("GET", "./backend/ozellikleri-getir.php");
    oReq.send();

    oReq.onload = function () {
        console.log("Özellikler sonuc : " + this.response);
        results = JSON.parse(oReq.response);
        console.log("Results => " + results[0]["ozellikadi"])
        sonuc();

    }


    console.log("--------------------------------------------------------");


}

async function sonuc() {
    console.log("sonuc fonk çağrıldı")
    if (results != null) {
        console.log("sonuc fonk null değil")
        for (var i = 0; i < results.length; i++) {

            console.log("Özellik = > " + results[i]["ozellikadi"]);

            var secenekEl = '<div class="kontrol-kutu">' +
                '<label class="container">' +
                '<p class="checkbox-text">' + results[i]["ozellikadi"] + '</p>' +
                '<input type="checkbox" class="ozellik-check-input">' +
                '<span class="checkmark"></span>' +
                '</label>' +
                '</div>';
            var secenekDiv = document.getElementById("secenekler-div");

            var kontrolDiv = document.createElement("div");
            kontrolDiv.className = "kontrol-kutu";
            kontrolDiv.innerHTML = secenekEl;
            secenekDiv.append(kontrolDiv);

            secenek();
        }
    } else {
        console.log("Sonuclar boş")
    }

}

