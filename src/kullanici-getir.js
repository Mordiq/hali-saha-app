window.onload = function (){

 var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
        if (oReq.readyState == XMLHttpRequest.DONE) {
            console.log(oReq.response);
            var response = oReq.response;
            response = JSON.parse(response);
            console.log(response);


            response.forEach(element => {
                console.log(element)
                var postNode = document.createElement('div');
                postNode.className = "pencere-uyeler"


                var card =   '<div class="pencere-uye-dis" data-kisiid="'+element+'">'+
                '<div class="pencere-uye-resim">'+
                '<img src="'+element.profilfotografi+'">'+
                '</div>' +
                '<div class="pencere-uye-ad">'+
                '<p class="pencere-ad1">'+
                    element.adisoyadi + 
                '</p>'+
                '<p class="pencere-ad2">'+
                     element.kullaniciadi + 
                '</p>'+
                '</div>'+
                '<div class="pencere-icon">'+ 
                '<button class="pencere-iconp">+</button>' +
                '</div>'+
                '</div>';

                postNode.innerHTML = card;
                var postList = document.getElementById("pencere-uyeler-kapsa");
                postList.appendChild(postNode);

            });
             var eklebutonlar = document.getElementsByClassName("pencere-iconp");
               // alert(eklebutonlar.length); 
            for (var i = 0; i < eklebutonlar.length; i++) {
                eklebutonlar[i].addEventListener("click",function() {
                    //Burada randevu almak için post işlemi kodu olacak .
                })
            }

        }
    }
    oReq.open("GET", "../backend/kullanici-getir.php");
    oReq.send();




}