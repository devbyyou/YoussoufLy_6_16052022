const getPhotographers2 = async function() {
  const photographers = await fetch("Front-End-Fisheye-main/data/photographers.json")
    .then((data) => data.json())
    .then((data) => data.photographers);

  return photographers;
}

const main = document.querySelector('.photograph-header');
getPhotographers2().then(
    (photographers) => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const id = urlSearchParams.get("id");
      const photographer = photographers.find((p) => p.id === parseInt(id));
      // Tu peux maintenant construire ta page avec les info du photographer
      const title = document.createElement('h2');
      title.innerText = photographer.name;
      main.appendChild(title);
    }
);