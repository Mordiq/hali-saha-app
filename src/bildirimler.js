import { girisKontrol } from "./kullanici-giris.js";
import UserNotification from "./lib/UserNotification.js";
window.onload = function () {

    girisKontrol();



    var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
        if (oReq.readyState == XMLHttpRequest.DONE) {
            //console.log(oReq.response);
            var response = oReq.response;
            response = JSON.parse(response);
            console.log(response);


            response.forEach(element => {

                console.log("get istegi gösterimi")
                //console.log(element.bildirim_mesaj);
                console.log(element["bildirim_mesaj"]);


                var bildirim = new UserNotification(element.takim_id, element.kullanici_id, element.bildirim_mesaj, element.tip);
                bildirim.render();
            });


        }
    }
    oReq.open("GET", "../backend/bildirim-getir.php");
    oReq.send();

}