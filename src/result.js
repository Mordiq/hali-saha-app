import Astroturf from "./Observer/Astroturf.js";
import Search from "./Observable/Search.js";
window.onload = function () {


    var search = new Search();


    var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
        if (oReq.readyState == XMLHttpRequest.DONE) {
            //console.log(oReq.response);
            var response = oReq.response;
            response = JSON.parse(response);
            console.log(response);


            response.forEach(element => {
                var saha = new Astroturf(element.sahaadi, "card", element.aciklama, "88 TL", element.resim1, element.resim2);
                saha.render();
                search.addPostInList(saha);
                console.log(element.sahaadi);
            });


        }
    }
    oReq.open("GET", "../backend/sahalari-getir.php");
    oReq.send();





    //Arama İnputu ile arama

    var searchInput = document.getElementById("search-input");

    searchInput.addEventListener('keyup', function (e) {
        search.notify(searchInput.value);
    })




}

