function photographerFactory(data, profile) {
  const { name, portrait, city } = data;
  const firstname = name.split(" ")[0];

  const picture = `Front-End-Fisheye-main/assets/photographers/${firstname}/${profile.image}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);

    const h2 = document.createElement("h2");
    h2.textContent = name;
    const p = document.createElement("p");
    p.textContent = city;
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(p);
    return article;
  }

  return { name, picture, city, getUserCardDOM };
}
