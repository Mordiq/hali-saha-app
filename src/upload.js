class Image {
    constructor(name, fileLink) {
        this.fileName = name;
        this.imageFile = fileLink;
        console.log("Resim Dosyası Adı : " + this.fileName + " " + "Resim Linki : " + this.imageFile);
    }
}

class Kullanici {
    constructor(isimSoyisim, email, sifre) {
        this.name = isimSoyisim;
        this.mail = email;
        this.sifre = sifre;
    }

    kayit(params) { }


}

class HaliSaha {

}


class Upload {

    files = [];
    constructor(...Image) {
        console.log(Image);
        this.files = [Image];
        //alert(this.files);
    }

    //data

    //send function
    send() {
        alert(this.files);
    }
}


var a = new Upload(new Image("resim1.jpg", "./resim1.jpg"), new Image("aaa.png", "./assets/aaa.png"));


a.send()
class ImageUpload extends Upload {

}