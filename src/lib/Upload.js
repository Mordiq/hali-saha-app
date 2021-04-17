

class Upload {

    constructor(fileInputId, filePickButton) {
        this.fileInputId = fileInputId;
        this.resim1 = "";
        var files = document.getElementById(fileInputId).files;
        var fileForm = new FormData();

        console.log("resim adedi : " + files.length);
        fileForm.append("file", files[0]);
        var kayitButton = document.getElementById(filePickButton);
        kayitButton.addEventListener("click", function () {

        });
        this.resimleriYukle(fileForm, files[0]);



    }

    resimleriYukle(fileForm, file) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../backend/image_upload.php", true);
        xhr.send(fileForm);

        //Yüklenen resim link olarak image src olarka verilecek.

        xhr.onload = function () {
            //console.log("yüklenen resim : " + this.resim1);
            console.log(xhr.response);
            if (this.resim1 === "") {

            }

            this.resim1 = "." + xhr.response;
            console.log("resim bir deger : " + this.resim1);
            fileForm.delete(file);
            document.getElementById("pp").src = this.resim1;

        };
    }



    send(callback) {

        callback();
    }


    urlGetir() {
        return this.resim1;
    }

}

export default Upload;