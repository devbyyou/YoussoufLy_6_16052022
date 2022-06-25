//Mettre le code JavaScript lié à la page photographer.html
const getPhotographer = async function() {
  // // et bien retourner le tableau photographers seulement une fois
  const photographers = await fetch("Front-End-Fisheye-main/data/photographers.json")
    .then((data) => data.json())
    .then((data) => data.photographers);

  console.log(photographers);

  return photographers;
}
getPhotographer();


const queryString_url_id = window.location.search;
console.log(queryString_url_id);

const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const id = urlSearchParams.get("id");
console.log(id);

// d'abord aller chercher json pour pouvoir afficher ces oeuvre
// pour aller chercher l'obj

const idProduitSelectionner = getPhotographer.find((element) => element.id === id);

console.log(idProduitSelectionner);
