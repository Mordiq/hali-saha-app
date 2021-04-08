

//Kulllanici Kayit Fonksiyonu

export function kullaniciKayit(adiSoyadi, email, sifre, kullaniciAdi) {

    var formData = new FormData();

    formData.append("adisoyadi", adiSoyadi);
    formData.append("email", email);
    formData.append("sifre", sifre);
    formData.append("kullaniciadi", kullaniciAdi);
    console.log("Form Data Bilgileri")
    console.log(formData);
    //kapat();
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./backend/kullanici-kayit.php", true);
    xhr.send(formData);

    xhr.onload = function () {
        console.log(this.response);
        //var k1 = document.getElementsByClassName("las la-times");
        document.getElementById("kullanici-kayit-form-arkaplan").style.display = "none";

    };
}


//Get işlemi örneği
function test() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1", false);
    xhr.send();
    console.log(xhr.responseText);
}

