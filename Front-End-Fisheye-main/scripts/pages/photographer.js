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

  getPhotographers2().then((photographers) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("idParams");
    const photographer = photographers.find((p) => p.id === parseInt(id));
    // construire page avec les infos du photographer
    const name = `${photographer.name}`;
    const firstname = name.split(" ")[0];
    const pictures = `Front-End-Fisheye-main/assets/photographers_image/Portrait_${firstname}.jpg`;
    // --// déclaration
    const title = document.createElement("h2");
    const location = document.createElement("h3");
    const pTagline = document.createElement("p");
    const img = document.createElement("img");
    img.setAttribute("src", pictures);
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
    const img = document.createElement("img");
    img.setAttribute("src", `${imagesLink}${media.image}`);
    photos.appendChild(img);
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