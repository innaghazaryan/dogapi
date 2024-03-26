const BASE_URL = "https://dog.ceo/api/breeds";
const RANDOM_IMAGE_URL = `${BASE_URL}/image/random`;
const ALL_BREEDS_URL = `${BASE_URL}/list/all`;
const button = document.querySelector("#button");
const showBreedsButton = document.getElementById("show-breeds");
const image = document.getElementById("image");
const breedContainer = document.getElementById("breed-container");
const breedImageContainer = document.querySelector(".breed-image-container");
button.addEventListener("click", () => {
  const request = new XMLHttpRequest();
  request.open("GET", RANDOM_IMAGE_URL);
  request.send();
  request.addEventListener("load", () => {
    image.src = JSON.parse(request.response).message;
  });
});
function onBreedClick(breed) {
  const xml = new XMLHttpRequest();
  xml.open("GET", `https://dog.ceo/api/breed/${breed}/images`);
  xml.send();
  xml.addEventListener("load", () => {
    breedImageContainer.innerHTML = "";
    const response = JSON.parse(xml.response);
    response.message.slice(0, 10).forEach((breedImageSrc) => {
      let img = document.createElement("img");
      img.src = breedImageSrc;
      breedImageContainer.append(img);
    });
  });
}
function onShowBreedsButtonClick() {
  const xml = new XMLHttpRequest();
  xml.open("GET", ALL_BREEDS_URL);
  xml.send();
  xml.addEventListener("load", () => {
    const breedsObj = JSON.parse(xml.response).message;
    for (let breed in breedsObj) {
      const li = document.createElement("li"); //addEventListener onBreedClick
      li.addEventListener("click", function () {
        onBreedClick(breed);
      });
      li.append(breed);
      breedContainer.append(li);
    }
    showBreedsButton.removeEventListener("click", onShowBreedsButtonClick);
  });
}
showBreedsButton.addEventListener("click", onShowBreedsButtonClick);
