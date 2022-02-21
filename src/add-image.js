import kiwi from "./img.jpg";

function addImage() {
  const img = document.createElement("img");
  img.alt = "kiwi";
  img.width = 300;
  img.src = kiwi;
  const body = document.querySelector("body");
  // body.appendChild(img);
}

export default addImage;
