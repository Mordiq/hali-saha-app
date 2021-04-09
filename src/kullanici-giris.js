window.onload = function () {




}


export function giris(email, sifre) {

    var formData = new FormData();
    formData.append("email", email);
    formData.append("sifre", sifre);
    console.log("Form Data Bilgileri")
    console.log(formData);
    console.log(email + " " + sifre);
    //kapat();
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./backend/kullanici-giris.php", true);
    xhr.send(formData);

    xhr.onload = function () {
        console.log(this.response);
        var res = this.response;
        if (res == "true") {
            //Buraya Uygulamanın Arama Sayfası linki verilecek.
            window.location.replace("./pages/sonuc.html");
        }
    };
}