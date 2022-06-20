// Photo upload part
const image_upload = document.getElementById('image-upload')
const preview = document.getElementById('preview')

let arrayFiles
image_upload.onchange = (e) => {
    arrayFiles = Array.from(e.target.files)

    preview.innerHTML = ''
    arrayFiles.forEach((file, index) => {
        if ( file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/svg' ){
            preview.innerHTML +=`<div class="preview-box shadow-sm border border-light border-5 my-1">
                                    <img style="object-fit:cover" src="${URL.createObjectURL(file)}" alt="">
                                    <i index=${index} class="fa-solid fa-trash-can"></i>
                                </div>`
        } else {
            alert(`"${file.name}" This file is Invalid`)
        }
    })
}


preview.onclick = (e) => {
    if (e.target.classList.contains('fa-solid')) {
        let index = e.target.getAttribute('index')
        arrayFiles.splice(index, 1)
        e.target.parentElement.remove()
    }
}






// CV upload part
const cv_upload = document.getElementById('cv-upload')
const list_group = document.querySelector('.list-group')

cv_upload.onchange = (e) => {
    let file = e.target.files[0]
    
    if (file.type == 'application/pdf'){
        list_group.innerHTML = `<li class="list-group-item d-flex justify-content-between">${file.name} <button class="btn-close"></button></li>`

    } else {
        alert(`"${file.name}" This file is Invalid`)
    }
    
}