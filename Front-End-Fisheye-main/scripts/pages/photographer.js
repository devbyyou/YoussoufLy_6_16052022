//Mettre le code JavaScript lié à la page photographer.html
const getPhotographers2 = async function () {
  const photographers = await fetch(
      "Front-End-Fisheye-main/data/photographers.json"
    )
    .then((data) => data.json())
    .then((data) => data.photographers);

  // console.log(photographers);
  return photographers;
};
async function getProfiles2() {
  const profiles = await fetch("Front-End-Fisheye-main/data/profiles.json")
    .then((data) => data.json())
    .then((data) => data.profiles);
  // console.log(profiles);
  return profiles;
}
const getMedia = async function () {
  const medias = await fetch("Front-End-Fisheye-main/data/photographers.json")
    .then((data) => data.json())
    .then((data) => data.media);
  // console.log(medias);
  return medias;
};
// -----
// --------------
// -----
const getDisplayPhotographer = function (photographers, profiles, medias) {
  const main = document.querySelector(".photograph-header");
  const nomContactTitle = document.getElementById("nomContact");
  //parti pour contactez- moi
  getPhotographers2().then((photographers) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("idParams");
    const photographer = photographers.find((p) => p.id === parseInt(id));
    // construire page avec les infos du photographer
    const name = `${photographer.name}`;
    const firstname = name.split(" ")[0];
    // Créer le lien vers les photos 
    const imagesLink = `Front-End-Fisheye-main/assets/photographers/Photographers_ID_Photos/`;
    // --// déclaration
    const title = document.createElement("h2");
    const location = document.createElement("h3");
    const pTagline = document.createElement("p");
    const img = document.createElement("img");
    img.setAttribute("src", `${imagesLink}${photographer.portrait}`);
    //contact décla
    const contactTitle = document.createElement("h4");
    //html
    // titleContact.innerText = photographer.name;
    title.innerText = photographer.name;
    location.innerHTML = `${photographer.city}, ${photographer.country}`;
    pTagline.textContent = photographer.tagline;
    // Contact html
    contactTitle.innerText = photographer.name;
    //Contact Style
    nomContactTitle.className = "title-Contact";
    //Style
    img.className = "img_photographers";
    pTagline.className = "tagline";
    //appendChild
    main.appendChild(title);
    main.appendChild(location);
    main.appendChild(pTagline);
    main.appendChild(img);
    nomContactTitle.appendChild(contactTitle);

  });
  //parti pour Portfolio
  const getPhotographerMedia = function (photographers, medias) {
    const photographerMedia = {};
    photographers.forEach((photographer) => {
      photographerMedia[photographer.id] = medias.filter(
        (media) => media.photographerId === photographer.id
      );
    });
    // console.log(photographerMedia);
    return photographerMedia;
  }
  var mediasById = getPhotographerMedia(photographers, medias);
  // récupère les data d'un photographe par son id 
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("idParams");
  const photographerMedia = mediasById[id];
  // Récupère les data du photographe par son id 
  const photographer = photographers.find((p) => p.id === parseInt(id));
  // construire le nom avec un - entre les 2 noms
  const name = `${photographer.name}`;
  const firstname = name.split(" ")[0];
  // Créer le lien vers les photos 
  const imagesLink = `Front-End-Fisheye-main/assets/photographers/${firstname}/`;
  // Afficher les photos du photographe
  const photos = document.querySelector(".image_media");
  photographerMedia.forEach((media) => {
    //décla
    // const img = document.createElement("img");
    // img.setAttribute("src", `${imagesLink}${media.image}`);
    const portfolio = document.querySelector('#portfolio')
    if (media.image) {
      portfolio.innerHTML +=
        `
    <div class="image_media">
      <a href="" class="">
        <img class="img_card" src="${imagesLink}${media.image}" alt="Photo"/>
        </a>
        <div class="description">
          <p class="description_title">${media.title}</p> <span class="description_likes">${media.likes}<i class="fas fa-heart"></i></span> 
        </div>
    </div>
    `
    } else if (media.video) {
      portfolio.innerHTML +=
        `
    <div class="image_media">
    <a href="" class="">
    <video src="${imagesLink}${media.video}" class="video" controls muted type="video/mp4"> 
    </video>
    </a>
    <div class="description">
    <p class="description_title">${media.title}</p> <span class="description_likes">${media.likes}<i class="fas fa-heart"></i></span> 
    </div>
  </div>
  `;
    }
  });
  // ------------------------------------------------------------------
  // ---------------------------------------Parti likes 
  // ------------------------------------------------------------------
  const encartLikes = document.getElementById('injecteNbrLikes')
  const likesNbr = document.createElement('p')

  let totalLikes = photographerMedia.reduce((sum, medi) => sum += medi.likes, 0);
  // console.log(totalLikes);
  likesNbr.innerHTML = `${totalLikes} <i class="fas fa-heart" aria-label="icone coeur"></i>`
  likesNbr.style = ''
  encartLikes.appendChild(likesNbr)
  // -------------------------------------incrémentation likes 
  const descriptionLikes = document.querySelectorAll('.description_likes')
  descriptionLikes.forEach(desrc => {
    
   const onClick = function () {
     desrc.innerHTML = `${+desrc.innerText + 1} <i class="fas fa-heart" aria-label="icone coeur"></i>`;
     likesNbr.innerHTML = `${+likesNbr.innerText + 1} <i class="fas fa-heart" aria-label="icone coeur"></i>`;
     const heart = document.querySelector('i')
     desrc.style.color= "#F1A9A0"
     desrc.removeEventListener("click",onClick)
    }
     desrc.addEventListener("click",onClick)
  });
  // ---------------------------------------------------------------------------------
  class Lightbox {
    static init() {
      const links = Array.from(
        document.querySelectorAll('img[src$=".jpg"], video[src$=".mp4"]')
      )
      const gallery = links.map(link => link.getAttribute('src'))

      links.forEach(link => link.addEventListener("click", e => {
        e.preventDefault()
        new Lightbox(e.currentTarget.getAttribute('src'), gallery)
      }))
    }
    constructor(url, images) {
      this.element = this.buildDOM(url)
      this.images = images
      this.loadImage(url)
      this.loadVideo(url)
      this.onKeyUp = this.onKeyUp.bind(this)
      document.body.appendChild(this.element)
      document.addEventListener('keyup', this.onKeyUp)
    }
    loadImage(url) {
      this.url = null
      const image = new Image()
      const container = this.element.querySelector('.lightbox__container')
      container.innerHTML = ''
      const title = document.createElement('h2')
      title.className = "titre_lightbox"
      // -------------------------------------------------link For find image 
      var mediasById = getPhotographerMedia(photographers, medias);
      const urlSearchParams = new URLSearchParams(window.location.search);
      const id = urlSearchParams.get("idParams");
      const photographerMedia = mediasById[id];
      const photographer = photographers.find((p) => p.id === parseInt(id));
      const name = `${photographer.name}`;
      const firstname = name.split(" ")[0];
      const imagesLink = `Front-End-Fisheye-main/assets/photographers/${firstname}/`;
      photographerMedia.forEach((media) => {
        if (url === `${imagesLink}${media.image}`) {
          // --------------------------------------------------link For find image 
          image.onload = () => {
            title.innerHTML = `${media.title}`
            container.appendChild(image)
            container.appendChild(title)
            this.url = url
          }
        }
      })
      image.src = url
    }
    loadVideo(url) {
      this.url = null
      const video = document.createElement('video');
      video.canPlayType('video/mp4')
      video.setAttribute('controls', 'videofile.mp4');
      const container = this.element.querySelector('.lightbox__container')
      container.innerHTML = ''
      const title = document.createElement('h2')
      title.className = "titre_lightbox"

      // -------------------------------------------------link For find video 
      var mediasById = getPhotographerMedia(photographers, medias);
      const urlSearchParams = new URLSearchParams(window.location.search);
      const id = urlSearchParams.get("idParams");
      const photographerMedia = mediasById[id];
      const photographer = photographers.find((p) => p.id === parseInt(id));
      const name = `${photographer.name}`;
      const firstname = name.split(" ")[0];
      const imagesLink = `Front-End-Fisheye-main/assets/photographers/${firstname}/`;
      photographerMedia.forEach((media) => {
        // --------------------------------------------------link For find video 
        if (url === `${imagesLink}${media.video}`) {
          title.innerHTML = `${media.title}`
          container.appendChild(video)
          container.appendChild(title)
          this.url = url
        }
      })
      video.src = url
    }

    // ferme la lightbox
    onKeyUp(e) {
      if (e.key == 'Escape') {
        this.close(e)
      } else if (e.key == 'ArrowLeft') {
        this.prev(e)
      } else if (e.key == 'ArrowRight') {
        this.next(e)
      }
    }
    close(e) {
      e.preventDefault()
      this.element.classList.add('fadeOut')
      window.setTimeout(() => {
        this.element.parentElement.removeChild(this.element)
      }, 500)
      document.removeEventListener('keyup', this.onKeyUp)
    }
    /**
     * @param {MouseEvent|KeyboardEvent} e 
     */
    next(e) {
      e.preventDefault()
      let i = this.images.findIndex(image => image === this.url)
      if (i === this.images.length - 1) {
        i = -1
      }
      this.loadImage(this.images[i + 1])
      this.loadVideo(this.images[i + 1])
    }

    /**
     * @param {MouseEvent|KeyboardEvent} e 
     */
    prev(e) {
      e.preventDefault()
      let i = this.images.findIndex(image => image === this.url)
      if (i === 0) {
        i = this.images.length
      }
      this.loadImage(this.images[i - 1])
      this.loadVideo(this.images[i - 1])
    }
    /**
     * @param {string} url URL de l'image
     * @return {HTMLElement}
     */

    buildDOM(url) {
      const dom = document.createElement('div')
      dom.classList.add('lightbox')
      dom.innerHTML = `<button class="lightbox__close"> </button>
      <button class="lightbox__next"> </button>
      <button class="lightbox__prev"> </button>
      <div class="lightbox__container"></div>`
      dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
      dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
      dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))
      return dom
    }
  }
  Lightbox.init();
};

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers2();
  const profiles = await getProfiles2();
  const medias = await getMedia();
  getDisplayPhotographer(photographers, profiles, medias);
}
init();