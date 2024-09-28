const myImage = document.querySelector("#me");
const date = new Date();
const day = date.getDate();
const month = date.getMonth();

// Em 21 de agosto de 1996 a produção do Chevrolet Monza foi encerrada, totalizando 857.810 vendas em território brasileiro
if (day === 21 && month === 8) {
  myImage.src = "img/other/me2.jpg";
}

if (myImage) {
  myImage.addEventListener("dblclick", () => {
    myImage.src = "img/other/me2.jpg";
    document.querySelector("#topics").addEventListener("dblclick", () => {
      window.location = "space-invaders.html";
    });
  });
}
