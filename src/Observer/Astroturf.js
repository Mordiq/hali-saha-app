import Observer from '../lib/Observer.js';
class Astroturf extends Observer {
    constructor(name, className, info, price, image1, image2) {
        super();
        this.name = name;
        this.className = className;
        this.info = info;
        this.price = price;
        this.image1 = image1;
        this.image2 = image2;
        this.element = null;
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
            '<p class="card__title text--medium">' +
            this.name +
            '</p>' +
            '<div class="card__aciklama">' +
            '<p>' + this.info + '</p>' +
            '</div >' +
            '<div class="card__info">' +
            '<p class="fiyat">' + this.price + '</p>' +
            '<p class="saat"> / Saat</p>' +
            '<button class="card__price text--medium">Randevu Al</button>' +
            ' </div >' +
            '</div > ';

        postNode.innerHTML = card;
        var postList = document.getElementById("card-list");
        postList.appendChild(postNode);
    }

    update(data) {
        //Eğer postun içinde kendi karakterleri eşleşmiyorsa kendini gizleyecek.
        var name = this.name;
        name = name.toLowerCase();
        var result = name.indexOf(data.toLowerCase());
        
        if (result == -1) {
            this.element.style.display = "none";
        } else {
            this.element.style.display = "";
        }
    }
}

export default Astroturf;




