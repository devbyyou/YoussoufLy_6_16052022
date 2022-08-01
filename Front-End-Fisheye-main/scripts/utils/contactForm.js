function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";


}

// ---------------------------------------------------------------------------------
// -------------------------------------
// -------------------------------------
// ---------------------------------------------------------------------------------

const form = document.querySelector("form");
const inputs = document.querySelectorAll(
    'input[type="text"], textarea[type="text"], input[type="password"]'
);
// const progressBar = document.getElementById("progress-bar");
let prenom, email, nom, msg;

const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector("." + tag + "-container");
    const span = document.querySelector("." + tag + "-container > span");

    if (!valid) {
        // container.classList.add("error");
        // span.textContent = message;
    } else {
        // container.classList.remove("error");
        // span.textContent = message;
    }
};

const pseudoChecker = (value) => {
    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        errorDisplay("prenom", "Le pseudo doit faire entre 3 et 20 caractères");
        prenom = null;
    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay(
            "prenom",
            "Le pseudo ne doit pas contenir de caractères spéciaux"
        );
        prenom = null;
    } else {
        errorDisplay("prenom", "", true);
        prenom = value;
    }
};

const emailChecker = (value) => {
    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
        errorDisplay("email", "Le mail n'est pas valide");
        email = null;
    } else {
        errorDisplay("email", "", true);
        email = value;
    }
};

const passwordChecker = (value) => {
    // progressBar.classList = "";

    if (
        value.length > 0 && (value.length < 3 || value.length > 20)
    ) {
        errorDisplay(
            "nom",
            "Minimum de 8 caractères, une majuscule, un chiffre et un caractère spécial"
        );
        // progressBar.classList.add("progressRed");
        nom = null;
    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay(
            "nom",
            "Le pseudo ne doit pas contenir de caractères spéciaux"
        );
        nom = null;
    } else {
        errorDisplay("nom", "", true);
        nom = value;
    }
};

const confirmChecker = (value) => {
    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        errorDisplay("msg", "Les mots de passe ne correspondent pas");
        msg = null;
    } else if (!value.match()) {
        // /^[a-zA-Z0-9_.-]*$/
        errorDisplay(
            "nom",
            "Le pseudo ne doit pas contenir de caractères spéciaux"
        );
        msg = null;
    } else {
        errorDisplay("msg", "", true);
        msg = value;
    }
};

inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        switch (e.target.id) {
            case "prenom":
                pseudoChecker(e.target.value);
                break;
            case "email":
                emailChecker(e.target.value);
                break;
            case "nom":
                passwordChecker(e.target.value);
                break;
            case "msg":
                confirmChecker(e.target.value);
                break;
            default:
                nul;
        }
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (prenom && email && nom || msg) {
        const data = {
            prenom,
            email,
            nom,
            msg,
        };
        console.log(data);

        inputs.forEach((input) => (input.value = ""));
        // progressBar.classList = ""; 

        prenom = null;
        email = null;
        nom = null;
        msg = null;
        alert("Message envoyée !");
        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";
        //   location.reload();
    } else {
        alert("veuillez remplir correctement les champs");
    }
});