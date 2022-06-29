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
const getDisplayPhotographer = function () {
  const main = document.querySelector(".photograph-header");

  getPhotographers2().then((photographers) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("idParams");
    const photographer = photographers.find((p) => p.id === parseInt(id));
    // Tu peux maintenant construire ta page avec les infos du photographer
    //
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

  getMedia().then((medias) => {
    const main2 = document.querySelector(".image_media");

    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("idParams");
    const media = medias.find((p) => p.photographerId === parseInt(id));
    console.log(media.photographerId);
    //

    const pictures3 = `Front-End-Fisheye-main/assets/${media.photographerId}/video1.mp4`;

    const lemp4 = document.createElement("video");
    lemp4.setAttribute("src", pictures3);
    lemp4.setAttribute("controls", pictures3);
    main2.appendChild(lemp4);

    let index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (let i = 0; i < index.length; i++) {
      let name = `${media.photographerId}`;
      const jpg = ".jpg";
      const pictures2 = `Front-End-Fisheye-main/assets/${name}/Portrait_${index[i]}${jpg}`;

      // function
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
          // console.log(this.status); // do something; the request has completed
        } else {
          index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
          index.pop();
          console.log(index);
        }
        if (media.photographerId == 930) {
          console.log("");

          index.push(10);
          
        }
      };
      xhr.open("HEAD", pictures2); // replace with URL of your choosing
      xhr.send();

      const img3 = document.createElement("img");

      img3.setAttribute("src", pictures2);
      main2.appendChild(img3);
      console.log(index[i]);
    }

    //

    //
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
