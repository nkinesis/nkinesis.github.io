const myImage = document.querySelector("#me")
myImage.addEventListener('dblclick', () => {
    myImage.src = "img/other/me2.jpg"
    document.querySelector("#topics").addEventListener('dblclick', () => {
        window.location = "space-invaders.html"
    })
})