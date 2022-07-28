//Mettre le code JavaScript lié à la page photographer.html
const getPhotographers2 = async function () {
  const photographers = await fetch(
      "Front-End-Fisheye-main/data/photographers.json"
    )
    .then((data) => data.json())
    .then((data) => data.photographers);

  console.log(photographers);

  return photographers;
};

async function getProfiles2() {
  const profiles = await fetch("Front-End-Fisheye-main/data/profiles.json")
    .then((data) => data.json())
    .then((data) => data.profiles);
  console.log(profiles);

  return profiles;
}
const getMedia = async function () {
  const medias = await fetch("Front-End-Fisheye-main/data/photographers.json")
    .then((data) => data.json())
    .then((data) => data.media);
  console.log(medias);

  return medias;
};
// -----
// --------------
// -----

const getDisplayPhotographer = function (photographers, profiles, medias) {
  const main = document.querySelector(".photograph-header");
  //parti pour contactez- moi
  getPhotographers2().then((photographers) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("idParams");
    const photographer = photographers.find((p) => p.id === parseInt(id));
    // construire page avec les infos du photographer
    const name = `${photographer.name}`;
    const firstname = name.split(" ")[0];
    // Créer le lien vers les photos 
    const imagesLink = `Front-End-Fisheye-main/assets/photographers/photographers_ID_Photos/`;
    // --// déclaration
    const title = document.createElement("h2");
    const location = document.createElement("h3");
    const pTagline = document.createElement("p");
    const img = document.createElement("img");
    img.setAttribute("src", `${imagesLink}${photographer.portrait}`);
    //html
    title.innerText = photographer.name;
    location.innerHTML = `${photographer.city}, ${photographer.country}`;
    pTagline.textContent = photographer.tagline;
    //Style
    img.className = "img_photographers";
    pTagline.className = "tagline";
    //appendChild
    main.appendChild(title);
    main.appendChild(location);
    main.appendChild(pTagline);
    main.appendChild(img);
  });
  //parti pour Portfolio
  const getPhotographerMedia = function (photographers, medias) {
    const photographerMedia = {};
    photographers.forEach((photographer) => {
      photographerMedia[photographer.id] = medias.filter(
        (media) => media.photographerId === photographer.id
      );
    });
    console.log(photographerMedia);
    return photographerMedia;
  }
  var mediasById = getPhotographerMedia(photographers, medias);
  // récupère les data d'un photographe par son id 
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("idParams");
  const photographerMedia = mediasById[id];
  // Récupère les data du photographe par son id 
  const photographer = photographers.find((p) => p.id === parseInt(id));
  // construire le nom avec un - entre les 2 noms
  const name = `${photographer.name}`;
  const firstname = name.split(" ")[0];
  // Créer le lien vers les photos 
  const imagesLink = `Front-End-Fisheye-main/assets/photographers/${firstname}/`;
  // Afficher les photos du photographe
  const photos = document.querySelector(".image_media");
  photographerMedia.forEach((media) => {
    //décla
    // const img = document.createElement("img");
    // img.setAttribute("src", `${imagesLink}${media.image}`);
    const portfolio = document.querySelector('#portfolio')
    if (media.image) {
      portfolio.innerHTML +=
        `
    <div id="image_media">
      <a href="" class="">
        <img class="img_card" src="${imagesLink}${media.image}" alt="Photo"/>
        <div class="description">
          <p class="description_title">${media.title}</p> <span class="description_likes">${media.likes}<i class="fas fa-heart"></i></span> 
        </div>
      </a>
    </div>
    `
    } else if (media.video) {
      portfolio.innerHTML +=
        `
    <div id="image_media">
    <a href="" class="">
    <video controls
    width="250"
    height="200px"
    muted>
    <source class="video" src="${imagesLink}${media.video}"
            type="video/webm">
    <source class="video" src="${imagesLink}${media.video}"
            type="video/mp4">
    </video>
    <div class="description">
    <p class="description_title">${media.title}</p> <span class="description_likes">${media.likes}<i class="fas fa-heart"></i></span> 
   </div>
    </a>
  </div>
  `;

    }
    
  });
};

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers2();
  const profiles = await getProfiles2();
  const medias = await getMedia();
  getDisplayPhotographer(photographers, profiles, medias);
}
init();