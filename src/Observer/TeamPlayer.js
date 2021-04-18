import Observer from '../lib/Observer.js';
class TeamPlayer extends Observer {
    constructor(id, adisoyadi, email, sifre, gruplar, kullaniciadi, profilfotografi) {
        super();
        this.id = id;
        this.adisoyadi = adisoyadi;
        this.email = email;
        this.sifre = sifre;
        this.gruplar = gruplar.split(",");
        this.kullaniciadi = kullaniciadi;
        this.profilfotografi = profilfotografi;
        //console.log("Özellikler : " + this.skills);
    }



    teamRender(listId) {
        var postNode = document.createElement('div');
        postNode.className = "kisi-takim-container";
        this.element = postNode;

        //var elementHTML = '<h3>' + this.name + '</h3>';

        var card = '<div class="profil-fotografi-container">' +
            '<img src = "' + this.profilfotografi + '"  class="kisi-profilfotografi">' +
            '</div >' +
            '<div class="kisi-bilgiler">' +
            '<p class="kisi-adisoyadi">' + this.adisoyadi + '</p>' +
            '<p class="kisi-kullaniciadi">' + this.kullaniciadi + '</p>' +
            '</div>' +
            '<div class="kisiyi-takimdan-sil" data-kisiid="' + this.id + '" data-teamid="' + listId + '">' +
            '<i class="las la-trash" id="takimdan-silme-icon" data-kisiid="' + this.id + '" data-teamid="' + listId + '"></i>' +
            '</div>';

        postNode.innerHTML = card;
        var postList = document.getElementById("kisiler" + listId);
        postList.appendChild(postNode);
    }


    removeTeam(teamId) {
        if (this.gruplar.includes(teamId)) {

            this.removeItem(teamId);

            var formData = new FormData();
            formData.append("id", this.id);
            formData.append("adisoyadi", this.adisoyadi);
            formData.append("email", this.email);
            formData.append("sifre", this.sifre);
            formData.append("gruplar", this.gruplar.toString());
            formData.append("kullaniciadi", this.kullaniciadi);
            formData.append("profilfotografi", this.profilfotografi);
            console.log("Form Data Bilgileri")
            console.log(formData);
            //kapat();
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "../backend/oyuncu-guncelle.php", true);
            xhr.send(formData);

            xhr.onload = function () {
                // var res = xhr.response;

                // var cevap = JSON.parse(res);
                // console.log(cevap);
                //var k1 = document.getElementsByClassName("las la-times");

                //_updatePlayers();
                //Burada kullanıcının ekleme fonk. çağır.
                //player.addToTeam();


            };

            //this._updatePlayers();
            //this.rerenderTeam();
            console.log("-----------------------Takım Silme Çalıştı-------------------");

            this._updateGroups();
        }
    }


    render(listId) {
        var postNode = document.createElement('div');
        postNode.className = "kisi-container";
        this.element = postNode;

        //var elementHTML = '<h3>' + this.name + '</h3>';

        var card = '<div class="profil-fotografi-container">' +
            '<img src = "' + this.profilfotografi + '"  class="kisi-profilfotografi">' +
            '</div >' +
            '<div class="kisi-bilgiler">' +
            '<p class="kisi-adisoyadi">' + this.adisoyadi + '</p>' +
            '<p class="kisi-kullaniciadi">' + this.kullaniciadi + '</p>' +
            '</div>' +
            '<div class="kisiyi-takima-ekle" data-kisiid="' + this.id + '">' +
            '<i class="las la-plus" id="takima-ekleme-arti-icon" data-kisiid="' + this.id + '"></i>' +
            '</div>';

        postNode.innerHTML = card;
        var postList = document.getElementById(listId);
        postList.appendChild(postNode);
    }


    rerender() {
        this.element.remove();
        this.render();
    }

    rerenderTeam() {
        this.element.remove();
        this.teamRender();
    }

    addToTeam(teamId) {
        //Bu fonksiyon takım içerisinden çağıralarak takıma oyuncu eklenince oyuncu da kendine takımın idsini ekleyecek.
        if (!this.gruplar.includes(teamId)) {

            this.gruplar.push(teamId);

            var formData = new FormData();
            formData.append("id", this.id);
            formData.append("adisoyadi", this.adisoyadi);
            formData.append("email", this.email);
            formData.append("sifre", this.sifre);
            formData.append("gruplar", this.gruplar.toString());
            formData.append("kullaniciadi", this.kullaniciadi);
            formData.append("profilfotografi", this.profilfotografi);
            console.log("Form Data Bilgileri")
            console.log(formData);
            //kapat();
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "../backend/oyuncu-guncelle.php", true);
            xhr.send(formData);

            xhr.onload = function () {
                // var res = xhr.response;

                // var cevap = JSON.parse(res);
                // console.log(cevap);
                //var k1 = document.getElementsByClassName("las la-times");

                //_updatePlayers();
                //Burada kullanıcının ekleme fonk. çağır.
                //player.addToTeam();



            };




            //this._updatePlayers();
            this._updateGroups();
            //this.rerenderTeam();
        }
    }

    _updateGroups() {
        var formData = new FormData();
        formData.append("email", localStorage.getItem("auth-user"));
        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function () {
            if (oReq.readyState == XMLHttpRequest.DONE) {
                console.log(oReq.response);
                var response = oReq.response;
                response = JSON.parse(response);
                console.log(response);


                response.forEach(element => {
                    console.log(element)

                    this.gruplar = element.gruplar;

                });

            }
        }
        oReq.open("POST", "../backend/profil-bilgileri.php", false);
        oReq.send(formData);
    }

    update(data) {
        //Eğer postun içinde kendi karakterleri eşleşmiyorsa kendini gizleyecek.
        var name = this.adisoyadi;
        var nick = this.kullaniciadi;
        name = name.toLowerCase();
        nick = nick.toLowerCase();
        var resultName = name.indexOf(data.toLowerCase());
        var resultNick = nick.indexOf(data.toLowerCase());
        if (resultName == -1 && resultNick == -1) {
            this.element.style.display = "none";
        } else {
            this.element.style.display = "";
        }

    }

    sendNotification(mesaj, takimId, tip) {
        var formData = new FormData();
        formData.append("kullanici_id", this.id);
        formData.append("mesaj", mesaj);
        formData.append("takimid", takimId);
        formData.append("tip", tip);
        console.log("Form Data Bilgileri")
        console.log(formData);
        //kapat();
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../backend/bildirim-gonder.php", true);
        xhr.send(formData);

        xhr.onload = function () {
            // var res = xhr.response;

            // var cevap = JSON.parse(res);
            // console.log(cevap);
            //var k1 = document.getElementsByClassName("las la-times");

            //_updatePlayers();
            //Burada kullanıcının ekleme fonk. çağır.
            //player.addToTeam();


        };

        //this._updatePlayers();

        //this.rerenderTeam();
    }


    removeItem(item) {
        var arr = this.gruplar;

        var index = arr.indexOf(item);
        if (index > -1) {
            arr.splice(index, 1);
            this.gruplar = arr;

            console.log("eleman silindi!");
        }

    }

}

export default TeamPlayer;




