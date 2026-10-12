/* =========================================================
   1. MENU BURGER (téléphone)
   Au clic sur le burger, on ajoute ou on retire
   la classe "ouvert" sur le menu.
========================================================= */

const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");

if (burger) {
    burger.addEventListener("click", function () {
        const ouvert = menu.classList.toggle("ouvert");
        burger.classList.toggle("ouvert");
        burger.setAttribute("aria-expanded", ouvert);
    });
}


/* =========================================================
   2. COMPTEURS ANIMÉS (page d'accueil)
   Quand les chiffres apparaissent à l'écran,
   ils montent de 0 jusqu'à leur valeur.
========================================================= */

const compteurs = document.querySelectorAll(".compteur");

function animerCompteur(element) {
    const cible = Number(element.dataset.cible);
    const duree = 1500; // en millisecondes
    const debut = performance.now();

    function etape(maintenant) {
        const progression = Math.min((maintenant - debut) / duree, 1);
        element.textContent = Math.floor(progression * cible);

        if (progression < 1) {
            requestAnimationFrame(etape);
        } else {
            element.textContent = cible;
        }
    }

    requestAnimationFrame(etape);
}

if (compteurs.length > 0) {
    const observateur = new IntersectionObserver(function (entrees) {
        entrees.forEach(function (entree) {
            if (entree.isIntersecting) {
                animerCompteur(entree.target);
                observateur.unobserve(entree.target);
            }
        });
    }, { threshold: 0.5 });

    compteurs.forEach(function (compteur) {
        observateur.observe(compteur);
    });
}


/* =========================================================
   3. FILTRES (page Programmes)
   Au clic sur un filtre, on cache les programmes
   qui n'ont pas la bonne catégorie.
========================================================= */

const filtres = document.querySelectorAll(".filtre");
const programmes = document.querySelectorAll("[data-categorie]");

filtres.forEach(function (bouton) {
    bouton.addEventListener("click", function () {

        // Le bouton cliqué devient noir
        filtres.forEach(function (autre) {
            autre.classList.remove("actif");
        });
        bouton.classList.add("actif");

        // On affiche ou on cache chaque programme
        const choix = bouton.dataset.filtre;

        programmes.forEach(function (programme) {
            if (choix === "tous" || programme.dataset.categorie === choix) {
                programme.style.display = "";
            } else {
                programme.style.display = "none";
            }
        });
    });
});


/* =========================================================
   4. VÉRIFICATION DU FORMULAIRE (page Contact)
   Avant l'envoi, on vérifie que les champs
   obligatoires sont remplis et que l'e-mail est valide.
========================================================= */

const formulaire = document.querySelector("#formulaire");

if (formulaire) {
    formulaire.addEventListener("submit", function (evenement) {
        evenement.preventDefault(); // empêche la page de se recharger

        let toutEstBon = true;
        const champsObligatoires = formulaire.querySelectorAll("[required]");

        champsObligatoires.forEach(function (champ) {
            const messageErreur = champ.closest(".champ").querySelector(".erreur");
            const valeur = champ.value.trim();

            if (valeur === "") {
                messageErreur.textContent = "Ce champ est obligatoire.";
                toutEstBon = false;
            } else if (champ.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeur)) {
                messageErreur.textContent = "Cette adresse e-mail n'est pas valide.";
                toutEstBon = false;
            } else {
                messageErreur.textContent = "";
            }
        });

        if (toutEstBon) {
            formulaire.reset();
            document.querySelector(".message-succes").hidden = false;
        }
    });
}


/* =========================================================
   5. ANNÉE AUTOMATIQUE dans le bas de page
========================================================= */

document.querySelectorAll(".annee").forEach(function (element) {
    element.textContent = new Date().getFullYear();
});