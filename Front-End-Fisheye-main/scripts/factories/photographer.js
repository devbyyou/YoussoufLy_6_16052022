function photographerFactory(data, profile) {
  const {
    city,
    country,
    name,
    tagline,
    price,
    portrait
  } = data;

  const firstname = name.split(" ")[0];
  const pictures = `Front-End-Fisheye-main/assets/photographers/Photographers_ID_Photos/${data.portrait}`;
  const pitures = `Front-End-Fisheye-main/assets/photographers/${firstname}/${profile.image}`;
  // affichage des donnée
  function getUserCardDOM() {
    // Créer le lien vers les photos 
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
    const divImg = document.createElement('div');
    divImg.ariaLabel = `vignette de ${name}`;
    img.alt = `${name}`;
    //html
    h2.textContent = name;
    h3pv.innerHTML = ` ${city}, ${country}`;
    h4tag.textContent = tagline;
    pric.innerHTML = `${price}€/jour`;
    //style
    img.style.borderRadius = "50%";
    h3pv.style = "color :#901C1C; font-size:20px; margin:5px;";
    h4tag.style = " font-size:17px; font-family: DM Sans; font-size: 10 px;font-weight: 400;line-height: 13 px;letter-spacing: 0 em; text-align: center; color:#00000;";
    pric.style = "font-family: DM Sans;font-size: 12px; font-weight: 400;line-height: 12px;letter-spacing: 0em;text-align: center;color: #757575;";
    //append child
    article.appendChild(createA);
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3pv);
    article.appendChild(h4tag);
    article.appendChild(pric);
    divImg.appendChild(img);
    createA.appendChild(divImg);

    return article;
  }

  return {
    city,
    country,
    tagline,
    price,
    name,
    pictures,
    getUserCardDOM
  };
}