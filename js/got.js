'use strict';

import charData from"../json/got.json" assert { type: "json" };

const characterContainer = document.querySelector(".container__characters");
const characterImage = document.querySelector(".img__character");
const characterName = document.querySelector(".name__character");
const characterBadge = document.querySelector(".badge__character");
const characterBio = document.querySelector(".bio__character");
const searchValue = document.querySelector(".input");
const buttonSearch = document.querySelector(".search");
const searchInfo = document.querySelector(".notFound");

let tileImages;

const aliveAndsortedCharData = charData
.sort((a, b) => {
    let x = a.portrait.slice(7).slice(0, -4);
    let y = b.portrait.slice(7).slice(0, -4);
    return x < y ? -1 : x > y ? 1 : 0;
})
.filter((char) => !char?.dead);

(() => {
    const tileTemplate = `
          <div class="tile">
              <img class="img_content" src="" />
              <div class="char_name"></div>
          </div>`;
  
    for (let i = 0; i < 48; i++) {
      characterContainer.innerHTML += tileTemplate;
    }

    const tileNames = document.querySelectorAll(".char_name");
    tileImages = document.querySelectorAll(".img_content");
    tileImages.forEach((img, i) => {
      img.setAttribute("src", `${aliveAndSortedCharData[i].portrait}`);
    });
    tileNames.forEach(
      (charName, i) => (charName.innerHTML = aliveAndSortedCharData[i].name)
    );
  })();

  const showDetails = (img, i) => {
    searchValue.value = "";
    searchInfo.innerHTML = "";
  
    tileImages.forEach((img) => img.classList.remove("selected"));
    img.classList.add("selected");
  
    if (aliveAndSortedCharData[i]?.picture.includes("jpg")) {
      characterImage.setAttribute("src", `${aliveAndSortedCharData[i].picture}`);
    } else {
      characterImage.setAttribute("src", `assets/pictures/noPic.jpg`);
    }
  
    characterName.innerHTML = `${aliveAndSortedCharData[i].name}`;
  
    if (aliveAndSortedCharData[i]?.house)
      characterBadge.setAttribute(
        "src",
        `../assets/houses/${aliveAndSortedCharData[i].house}.png`
      );
    else if (aliveAndSortedCharData[i]?.organization) {
      characterBadge.setAttribute(
        "src",
        `../assets/houses/${aliveAndSortedCharData[i].organization}.png`
      );
    } else {
      characterBadge.setAttribute("src", `../assets/houses/noHouse.png`);
    }
  
    characterBio.innerHTML = `${aliveAndSortedCharData[i].bio}`;
  };
  tileImages.forEach((img, i) => {
    img.addEventListener("click", () => {
      showDetails(img, i);
    });
  });
  buttonSearch.addEventListener("click", () => {
    const searchedCharacter = searchValue.value.toLowerCase().trim();
  
    for (const [i, char] of aliveAndSortedCharData.entries()) {
      if (
        char.name.toLowerCase().includes(searchedCharacter) &&
        searchedCharacter !== ""
      ) {
        showDetails(tileImages[i], i);
        break;
      } else {
        searchInfo.innerHTML = "No character found";
      }
    }
  });