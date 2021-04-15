import Astroturf from "./Observer/Astroturf.js";
import Search from "./Observable/Search.js";
import Filter from "./Observable/Filter.js";
import { girisKontrol } from "./kullanici-giris.js";

window.onload = function () {

    girisKontrol();

    var filterList = [];




    response.forEach(element => {
        var saha = new Astroturf(element.sahaadi, "card", element.aciklama, "88 TL", element.resim1, element.resim2, element.sehir + "/" + element.ilce, element.ozellikler);
        saha.render();
        search.addPostOnList(saha);
        console.log(element.sahaadi);
    });

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

