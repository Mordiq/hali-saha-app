 var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
        if (oReq.readyState == XMLHttpRequest.DONE) {
            //console.log(oReq.response);
            var response = oReq.response;
            response = JSON.parse(response);
            console.log(response);


            response.forEach(element => {
                console.log(element)
                var postNode = document.createElement('div');
                postNode.className = "pencere-kapsa"


                var card ='<div class="pencere-orta">'+
                '<div class="pencere-icerik">'+
                '<div class="pencere-uyeler-kapsa">'+
                '<div class="pencere-uyeler">'+
                '<div class="pencere-uye-ad">'+
                '<div class="pencere-uye-dis">'+
                '<p class="pencere-ad1">'+
                element.adisoyadi + 
                '</p>'+
                '<p class="pencere-ad2">' + 
                element.kullaniciadi+
                '</p>' +
                '</div>';

                postNode.innerHTML = card;
                var postList = document.getElementById("pencere-kapsa");
                postList.appendChild(postNode);

            });


        }
    }
    oReq.open("GET", "kullanici-getir.php");
    oReq.send();