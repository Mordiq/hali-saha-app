import Observer from '../lib/Observer.js';
class Team extends Observer {
    constructor(id, takimadi, kontejyan, oyuncular, aciklama, kurucu) {
        super();
        this.id = id;
        this.takimadi = takimadi;
        this.kontejyan = kontejyan;
        this.oyuncular = oyuncular.split(",");
        this.aciklama = aciklama;
        this.kurucu = kurucu;


    }

    render() {

        //TODO: Kurucu ve oyunculara görünecek.
        var postNode = document.createElement('div');
        postNode.className = "takim-container";
        this.element = postNode;

        var card = '<p class="takim-baslik">' + this.takimadi + '</p>' +
            '<div class="kisiler" id="' + "kisiler" + this.id + '">' +
            '</div>' +
            '<div class="takim-buttonlar">' +
            '<div class="oyuncu-ekle-button" data-takimid="' + this.id + '">' +
            '<p class="oyuncu-ekle-text"  data-takimid="' + this.id + '">Oyuncu Ekle</p>' +
            '</div>' +
            '<div class="takim-sil-button">' +
            '<p class="takim-sil-text">' +
            'Takım Sil' +
            '</p>' +
            '</div>' +
            '</div>';

        postNode.innerHTML = card;
        var postList = document.getElementById("takim-liste");
        postList.appendChild(postNode);
    }


    rerender() {
        this.element.remove();
        this.render();

        console.log("yeniden render edildi.")
    }


    _toArray(obj) {

        var newPlayerList = [];

        for (var i = 0; i < obj.length; i++) {
            newPlayerList.push(obj[i]);
        }

        return newPlayerList;
    }



    _updatePlayers() {
        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function () {
            if (oReq.readyState == XMLHttpRequest.DONE) {
                console.log(oReq.response);
                var response = oReq.response;
                response = JSON.parse(response);
                console.log(response);


                response.forEach(element => {
                    console.log(element)

                    this.oyuncular = element.oyuncular;

                });

            }
        }
        oReq.open("GET", "../backend/takimlari-getir.php", false);
        oReq.send();
    }

    addPlayer(player) {
        var id = this.id;
        //var players = this.oyuncular.split(",");



        if (!this.oyuncular.includes(player.id)) {

            this.oyuncular.push(player.id);

            var formData = new FormData();
            formData.append("id", this.id);
            formData.append("takimadi", this.takimadi);
            formData.append("kontejyan", this.kontejyan);
            formData.append("oyuncular", this.oyuncular.toString());
            formData.append("aciklama", this.aciklama);
            formData.append("kurucu", this.kurucu);
            console.log("Form Data Bilgileri")
            console.log(formData);
            //kapat();
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "../backend/takim-guncelle.php", true);
            xhr.send(formData);

            xhr.onload = function () {
                var res = xhr.response;

                var cevap = JSON.parse(res);
                console.log(cevap);
                //var k1 = document.getElementsByClassName("las la-times");

                //_updatePlayers();
                //Burada kullanıcının ekleme fonk. çağır.
                player.addToTeam(id);


            };
            //this.rerender();
            this._updatePlayers();

        }
    }


    removePlayer(player) {
        var id = this.id;
        if (this.oyuncular.includes(player.id)) {

            this.removeItem(player.id);

            var formData = new FormData();
            formData.append("id", this.id);
            formData.append("takimadi", this.takimadi);
            formData.append("kontejyan", this.kontejyan);
            formData.append("oyuncular", this.oyuncular.toString());
            formData.append("aciklama", this.aciklama);
            formData.append("kurucu", this.kurucu);
            console.log("Form Data Bilgileri")
            console.log(formData);
            //kapat();
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "../backend/takim-guncelle.php", true);
            xhr.send(formData);

            xhr.onload = function () {
                var res = xhr.response;

                var cevap = JSON.parse(res);
                console.log(cevap);
                //var k1 = document.getElementsByClassName("las la-times");

                //Burada kullanıcının ekleme fonk. çağır.
                //player.removeTeam(id);


            };

            this._updatePlayers();
            //this.rerender();
        }
    }





    update(data) {
        //Eğer postun içinde kendi karakterleri eşleşmiyorsa kendini gizleyecek.
        var name = this.takimadi;

        name = name.toLowerCase();

        var resultName = name.indexOf(data.toLowerCase());

        if (resultName == -1) {
            this.element.style.display = "none";
        } else {
            this.element.style.display = "";
        }

    }


    removeItem(item) {
        var arr = this.oyuncular;
        console.log("silinmeden önce : " + arr);
        var index = arr.indexOf(item);
        if (index > -1) {
            arr.splice(index, 1);
            this.oyuncular = arr;

            console.log("eleman silindi!" + arr);
        }

    }
}

export default Team;




