import Observer from '../lib/Observer.js';
class Astroturf extends Observer {
    constructor(id, name, className, info, price, image1, image2, city, skills) {
        super();
        this.id = id;
        this.name = name;
        this.className = className;
        this.info = info;
        this.price = price;
        this.image1 = image1;
        this.image2 = image2;
        this.city = city;
        this.element = null;
        this.skills = skills;
        //console.log("Özellikler : " + this.skills);
    }

    render() {
        var postNode = document.createElement('div');
        postNode.className = this.className;
        this.element = postNode;

        //var elementHTML = '<h3>' + this.name + '</h3>';

        var card = '<div class="card__image-container">' +
            '<img src="' + this.image1 + '" alt="saha resmi">' +
            '</div >' +
            '<div class="card__content">' +
            '<div class="card__konum">' +
            '<p id="marker" class="fas fa-map-marker-alt"></p> ' + this.city + '</p>' + '</div>' +
            '<p class="card__title text--medium">' +
            this.name +
            '</p>' +
            '<div class="card__aciklama">' +
            '<p>' + this.info + '</p>' +
            '</div >' +
            '<div class="card__info">' +
            '<p class="fiyat">' + this.price + '</p>' +
            '<p class="saat"> / Saat</p>' +
            '<button id="randevu-alma" class="card__price text--medium" data-sahaid="' + this.id + '">Randevu Al</button>' +
            ' </div >' +
            '</div > ';

        postNode.innerHTML = card;
        var postList = document.getElementById("card-list");
        postList.appendChild(postNode);
    }


    filter(filterData) {

        var skillList = this.skills;
        skillList = skillList.split(",");
        console.log(skillList);
        console.log("------------------------------------");
        console.log("ELEMENTIN ÖZELLİĞİ => " + typeof (skillList));
        console.log("------------------------------------");
        //alert("Üzerime bastın mouse çek!");

        if (skillList.includes(filterData)) {
            this.element.style.display = "none";
            console.log("gizledim");
        } else {
            this.element.style.display = "";
        }
    }

    update(data) {
        //Eğer postun içinde kendi karakterleri eşleşmiyorsa kendini gizleyecek.
        var name = this.name;
        var city = this.city;
        name = name.toLowerCase();
        city = city.toLowerCase();
        var resultName = name.indexOf(data.toLowerCase());
        var resultCity = city.indexOf(data.toLowerCase());
        if (resultName == -1 && resultCity == -1) {
            this.element.style.display = "none";
        } else {
            this.element.style.display = "";
        }
    }
}

export default Astroturf;




