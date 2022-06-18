function getPhotographers() {
  // // et bien retourner le tableau photographers seulement une fois
  const photographers = fetch("Front-End-Fisheye-main/data/photographers.json")
    .then((data) => data.json())
    .then((data) => data.photographers);

  console.log(photographers);
  return photographers;
}

async function getProfiles() {
  // Penser à remplacer par les données récupérées dans le json
  const profiles = await fetch("Front-End-Fisheye-main/data/profiles.json")
    .then((data) => data.json())
    .then((resultat) => resultat.profiles);

  console.log(profiles);

  // et bien retourner le tableau photographers seulement une fois
  return  profiles ;
}

function displayData(photographers, profiles) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const [profile] = profiles.filter(
      (profile) => profile.photographerId == photographer.id
    );
    const photographerModel = photographerFactory(photographer, profile);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  const profiles = await getProfiles();
  displayData(photographers, profiles);
}
init();