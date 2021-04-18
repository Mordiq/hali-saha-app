var oReq = new XMLHttpRequest();
oReq.onreadystatechange = function () {
    if (oReq.readyState == XMLHttpRequest.DONE) {
        console.log(oReq.response);
        var response = oReq.response;
        response = JSON.parse(response);
        console.log(response);


        response.forEach(element => {
            var player = new TeamPlayer(element.id, element.adisoyadi, element.sifre, element.gruplar, element.kullaniciadi, element.profilfotografi);
            player.render("kisiler-liste");
            oyuncuArama.addPostOnList(player);
        });
        
    }
}

oReq.open("GET", "../backend/kullanici-getir.php", false);
oReq.send();