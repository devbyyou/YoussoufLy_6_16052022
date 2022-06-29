function photographerFactory(data, profile) {
  const { city, country, name, tagline, price, portrait } = data;

  const firstname = name.split(" ")[0];

  const pictures = `Front-End-Fisheye-main/assets/photographers/${firstname}/${profile.image}`;

  // affichage des donnée
  function getUserCardDOM() {
    // déclaration
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", pictures);
    const h2 = document.createElement("h2");
    const h3pv = document.createElement("h3");
    const h4tag = document.createElement("h4");
    const pric = document.createElement("p");
    const createA = document.createElement("a");
    createA.setAttribute("href", `./photographer.html?idParams=${data.id}`);
    const createb = document.createElement("a");
    createb.setAttribute("href", `./photographer.html?idParam=${data.id}`);

    //html
    h2.textContent = name;
    h3pv.innerHTML = ` ${city}, ${country}`;
    h4tag.textContent = tagline;
    pric.innerHTML = `${price}€/jour`;
    //style
    img.style.borderRadius = "50%";
    h3pv.style = "color :red; font-size:20px; margin:5px;";
    h4tag.style = "text-align:center;font-weight: bold; font-size:17px;";
    pric.style = "opacity:0.5;";
    //append child
    article.appendChild(createA);
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3pv);
    article.appendChild(h4tag);
    article.appendChild(pric);
    createA.appendChild(img);
    createA.appendChild(h2);

    return article;
  }

  return { city, country, tagline, price, name, pictures, getUserCardDOM };
}
