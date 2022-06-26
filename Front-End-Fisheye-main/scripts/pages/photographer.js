const getPhotographers2 = async function() {
  const photographers = await fetch("Front-End-Fisheye-main/data/photographers.json")
    .then((data) => data.json())
    .then((data) => data.photographers);

  return photographers;
}

getPhotographers2().then(
    (photographers) => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const id = urlSearchParams.get("id");
      const photographer = photographers.find((p) => p.id == id);
      console.log(photographer);
    }
);
