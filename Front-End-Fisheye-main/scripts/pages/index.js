function getPhotographers() {
  // // et bien retourner le tableau photographers seulement une fois
  const photographers = fetch("data/photographers.json")
    .then((data) => data.json())
    .then((data) => data.photographers);

  console.log(photographers);
  return photographers;
}

function getUser() {
  const profiles = fetch("data/profiles.json")
    .then((data) => data.json())
    .then((data) => data.profiles);

  console.log(profiles);

  return profiles;
}
//---------------------------------TEST
// const userDisplay = async () => {
//   await getPhotographers();

//   document.body.innerHTML = photographers
//     .map(
//       (user) =>
//         `
//         <div class="photographer_section">
//         <img src="${user.portrait}" alt="photo de ${user.name}">
//         <h2>${user.name}</h2>
//         <p>${user.city} </p>

//         </div>
//     `
//     )
//     .join("");
// };
// userDisplay();
//---------------------------------TEST

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
  const profiles = await getUser();
  displayData(photographers, profiles);
}
init();