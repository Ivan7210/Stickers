document.addEventListener("DOMContentLoaded", () => load());

let button = document.querySelector(".header > button");
button.addEventListener("click", () => {
  addSticker();
});

function addSticker(left = "50%", top = "50%", stickertitle = "", stickertext = "") {
  let sticker = document.createElement("div");
  sticker.style.left = left;
  sticker.style.top = top;
  let title = document.createElement("input");
  title.value = stickertitle;
  title.setAttribute("placeholder", "Заголовок")
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("button");

  let buttonHolder = document.createElement("div");
  buttonHolder.appendChild(deleteButton);

  let nav = document.createElement("nav");
  nav.appendChild(title);
  nav.appendChild(buttonHolder);



  let img = document.createElement("img");
  img.setAttribute("src", "./img/close.svg");
  deleteButton.appendChild(img);

  let textarea = document.createElement("textarea");
  textarea.value = stickertext;

  textarea.setAttribute("placeholder", "Введите текст заметки сюда...")

  sticker.appendChild(nav);
  sticker.appendChild(textarea);
  sticker.classList.add("sticker");
  deleteButton.addEventListener("click", () => {
    sticker.remove();
    save();
  });
  sticker.onchange = () => { save(); };


  stickerDnD(sticker);

  document.querySelector(".body__wrapper").appendChild(sticker);
  save();
}

function stickerDnD(sticker) {
  sticker.onmousedown = function (e) {

    let coords = getCoords(sticker);
    let shiftX = e.pageX - coords.left;
    let shiftY = e.pageY - coords.top;

    sticker.style.position = 'absolute';
    moveAt(e);

    sticker.style.zIndex = 1000;

    function moveAt(e) {
      sticker.style.left = e.pageX - shiftX + 'px';
      sticker.style.top = e.pageY - shiftY + 'px';
    }

    document.onmousemove = function (e) {
      moveAt(e);
    };

    sticker.onmouseup = function () {
      document.onmousemove = null;
      sticker.onmouseup = null; 
      save();
    };
    
  }

  sticker.ondragstart = function () {
    return false;
  };

  function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset


    };
  }
}

function save() {
  let stickersList = document.querySelectorAll(".sticker");
  stickersList = Array.from(stickersList);
  stickersList = stickersList.map(e => {
    return { "left": e.style.left, "top": e.style.top, "title": e.querySelector("input").value, "text": e.querySelector("textarea").value }
  });
  localStorage.setItem("stickers_info", JSON.stringify(stickersList));
}

function load() {
  try {
    let stickersList = JSON.parse(localStorage.getItem("stickers_info"));
    Array.from(stickersList).forEach((e) => addSticker(e.left, e.top, e.title, e.text));
  }
  catch{

  }
}






