import Astroturf from "./Observer/Astroturf.js";
import Search from "./Observable/Search.js";
import Filter from "./Observable/Filter.js";
window.onload = function () {
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

    var search = new Search();


    var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
        if (oReq.readyState == XMLHttpRequest.DONE) {
            //console.log(oReq.response);
            var response = oReq.response;
            response = JSON.parse(response);
            console.log(response);


            response.forEach(element => {
                var saha = new Astroturf(element.sahaadi, "card", element.aciklama, "88 TL", element.resim1, element.resim2, element.sehir + "/" + element.ilce, element.ozellikler);
                saha.render();
                search.addPostOnList(saha);
                console.log(element.sahaadi);
            });


        }
    }
    oReq.open("GET", "../backend/sahalari-getir.php");
    oReq.send();

    var filterList = [];





    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == XMLHttpRequest.DONE) {
            //console.log(oReq.response);
            var response = req.response;
            response = JSON.parse(response);
            console.log(response);


            response.forEach(element => {

                var filter = new Filter(element.ozellikadi);

                filter.render();

                var cards = search.Observers;

                //console.log("CARDS İÇERİĞİ : " + cards);
                cards.forEach(element => {
                    console.log("Nesne : " + element.name);
                    filter.addPostOnList(element);
                });


                filterList.push(filter);

            });


        }
    }
    req.open("GET", "../backend/ozellikleri-getir.php");
    req.send();



    var filters = document.getElementById("sabit-filtreler");

    filters.addEventListener("click", function (e) {

        if (e.target.tagName == "button") {
            e.target.backgroundColor = "#6583FE";
        }

        filterList.forEach(f => {
            if (f.filterName == e.target.textContent) {
                f.updateList(e.target.textContent);

                console.log("Filtereler : => " + f.filterName);
            }
        });

    })

    // for (var i = 0; i < filters.length; i++) {
    //     filters[i].addEventListener("click", function () {
    //         alert();

    //         filterList.forEach(el => {
    //             if (el.filterName == filters[i].textContent) {
    //                 alert("aha buldum!");
    //             }
    //         });
    //     });
    // }



    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == XMLHttpRequest.DONE) {
            //console.log(oReq.response);
            var response = req.response;
            response = JSON.parse(response);
            console.log(response);


            response.forEach(element => {

                var filter = new Filter(element.ozellikadi);

                filter.render();

                var cards = search.Observers;

                //console.log("CARDS İÇERİĞİ : " + cards);
                cards.forEach(element => {
                    console.log("Nesne : " + element.name);
                    filter.addPostOnList(element);
                });


                filterList.push(filter);

            });


        }
    }
    req.open("GET", "../backend/ozellikleri-getir.php");
    req.send();



    var filters = document.getElementById("sabit-filtreler");

    filters.addEventListener("click", function (e) {

        if (e.target.tagName == "button") {
            e.target.backgroundColor = "#6583FE";
        }

        filterList.forEach(f => {
            if (f.filterName == e.target.textContent) {
                f.updateList(e.target.textContent);

                console.log("Filtereler : => " + f.filterName);
            }
        });

    })

    // for (var i = 0; i < filters.length; i++) {
    //     filters[i].addEventListener("click", function () {
    //         alert();

    //         filterList.forEach(el => {
    //             if (el.filterName == filters[i].textContent) {
    //                 alert("aha buldum!");
    //             }
    //         });
    //     });
    // }


    //Arama İnputu ile arama

    var searchInput = document.getElementById("search-input");

    searchInput.addEventListener('keyup', function (e) {
        search.notify(searchInput.value);
    })




}

