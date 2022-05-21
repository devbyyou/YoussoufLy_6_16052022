let photographers = [];
async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
    // // et bien retourner le tableau photographers seulement une fois

  await fetch("data/photographers.json").then((response) => {return response.json();}).then((jsondata) => (photographers = jsondata.photographers));

  console.log(photographers);

  // return { photographers };
}
//---------------------------------TEST



const userDisplay = async () => {
  await getPhotographers();

  
  document.body.innerHTML = photographers
    .map(
      (user) =>
          `
        <div class="photographer_section">
        <img src=${user.portrait} alt="photo de ${user.name}">
        <h2>${user.name}</h2>
        <p>${user.city} </p>
        <em>  </em>
        </div>    
    `
    )
    .join("");
};
userDisplay();





//---------------------------------TEST








// async function displayData(photographers) {
//   const photographersSection = document.querySelector(".photographer_section");

//   photographers.forEach((photographer) => {
//     const photographerModel = photographerFactory(photographer);
//     const userCardDOM = photographerModel.getUserCardDOM();
//     photographersSection.appendChild(userCardDOM);
//   });
// }

// async function init() {
//   // Récupère les datas des photographes
//   const { photographers } = await getPhotographers();
//   displayData(photographers);
// }

// init();
