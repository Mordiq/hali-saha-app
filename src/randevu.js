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
            postNode.className = "main"

            var card ='<div class="saharesmi" >'+
            '<img src="'+ element.resim1 + '" alt="saha resmi">' +
            '<div class="saha-ad">'+
            '<p class="saha-adi">'+
            element.sahaadi +
            '</p>'+
            '<div class="randevu">'+
            '<div class="saatler">'+
            '<div class="saat">'+
            '</div>';

            postNode.innerHTML = card;
            var postList = document.getElementById("main");
            postList.appendChild(postNode);

        });


    }
}
oReq.open("GET", "../backend/saha-bilgi.php");
oReq.send();




}