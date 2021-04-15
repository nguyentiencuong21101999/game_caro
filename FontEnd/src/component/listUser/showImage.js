const  showImage= (event,idShow)=>{
    var file = document.getElementById('img').files
    var myNode = document.getElementById(idShow);
    myNode.innerHTML = '';
    for (let i = 0; i < file.length; i++) {
        if (file.length > 0) {
            var fileToLoad = event.target.files[i] // lay hinh dau tien
            var fileReder = new FileReader();
            fileReder.onload = (fileLoaderEvent) => {
                var srcData = fileLoaderEvent.target.result // chueyn sang dang base 64
                var newImg = document.createElement('img');
                newImg.src = srcData;
                document.getElementById(idShow).innerHTML += newImg.outerHTML;
            }
            fileReder.readAsDataURL(fileToLoad);
        }

    }
}
const  showImageAvatar= (event,idInput,idShow)=>{
    var file = document.getElementById(idInput).files

    if (file.length > 0) {
        var fileToLoad = event.target.files[0] // lay hinh dau tien
        var fileReder = new FileReader();
        fileReder.onload = (fileLoaderEvent) => {
            var srcData = fileLoaderEvent.target.result // chueyn sang dang base 64
            var newImg = document.createElement('img');
            newImg.src = srcData;
            document.getElementById(idShow).innerHTML = newImg.outerHTML;
        }
        fileReder.readAsDataURL(fileToLoad);
    }
}

export {showImage,showImageAvatar}
