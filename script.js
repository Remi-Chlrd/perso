/**********************************************************************
 *  ESCAPE GAME - SCRIPT PRINCIPAL
 *********************************************************************/

/**********************
 * DONNÉES DE LA PARTIE
 **********************/

const jeu = {

    partie: lieu,

    position: 0,

    score: 0,

    scoreQuestion: 100,

    niveauIndice: 1,

    phase: "activite",

    indiceDouble: 0

};

let lieuActuel = jeu.partie[0];


/**********************
 * ELEMENTS HTML
 **********************/

const chat = document.getElementById("chat");
const input = document.getElementById("message");
const boutonEnvoyer = document.getElementById("send");

const imageZone = document.getElementById("imageZone");
const image = document.getElementById("indiceImage");

const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");

const indiceButton = document.getElementById("indiceButton");
const nextButton = document.getElementById("nextButton");


/**********************
 * BOUTONS
 **********************/

indiceButton.addEventListener("click", demanderIndice);

nextButton.addEventListener("click", () => {

    nextButton.style.display = "none";

    prochainLieu();

});


boutonEnvoyer.addEventListener("click", envoyer);

input.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        envoyer();

    }

});


startButton.addEventListener("click", () => {

    startScreen.style.display = "none";

    chat.style.display = "block";

    afficherQuestion();

});


/**********************
 * AFFICHAGE
 **********************/

function ajouterMessage(message, type) {

    const bloc = document.createElement("div");

    bloc.className = type;

    bloc.innerHTML = message;

    chat.appendChild(bloc);

    chat.scrollTop = chat.scrollHeight;

}


function afficherEnigme() {

    ajouterMessage(

        `🧩 Énigme ${jeu.position + 1}`,

        "bot"

    );

}


/**********************
 * AFFICHAGE QUESTION
 **********************/

function afficherQuestion() {

    afficherEnigme();

    indiceButton.style.display = "inline-block";

    nextButton.style.display = "none";

    imageZone.style.display = "none";

    if (lieuActuel.typeDoubleEtape) {

        ajouterMessage(

            "💡 Trouve d'abord l'activité :<br>" +

            lieuActuel.phaseActivite.indices[0],

            "bot"

        );

    }

    else {

        ajouterMessage(

            "💡 Indice :<br>" +

            lieuActuel.indice1,

            "bot"

        );

    }

}

/************************************************
 * OUTILS
 ************************************************/

function nettoyerTexte(texte) {

    return texte
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


function bonneReponse(listeReponses, texte) {

    return listeReponses.some(rep => texte.includes(rep));

}


/************************************************
 * ENVOI D'UNE REPONSE
 ************************************************/

function envoyer() {

    const texte = input.value.trim();

    if (texte === "") return;

    ajouterMessage(texte, "user");

    input.value = "";

    analyserReponse(texte);

}


/************************************************
 * ANALYSE DE LA REPONSE
 ************************************************/

function analyserReponse(reponse) {

    const texte = nettoyerTexte(reponse);

    // ============================
    // ENIGMES A DEUX ETAPES
    // ============================

    if (lieuActuel.typeDoubleEtape) {

        analyserDoubleEtape(texte, reponse);

        return;

    }

    // ============================
    // ENIGMES CLASSIQUES
    // ============================

    if (bonneReponse(lieuActuel.reponses, texte)) {

        gagner();

    } else {

        ajouterMessage(

            reponseIA(reponse),

            "bot"

        );

    }

}


/************************************************
 * GESTION DES ENIGMES DOUBLE ETAPE
 ************************************************/

function analyserDoubleEtape(texte, reponse) {

    // ---------- ACTIVITE ----------

    if (jeu.phase === "activite") {

        if (bonneReponse(lieuActuel.phaseActivite.reponses, texte)) {

            jeu.phase = "lieu";

            jeu.indiceDouble = 0;

            ajouterMessage(

                "✅ Bravo ! Tu as trouvé l'activité.<br><br>" +
                "Maintenant trouve le lieu précis.",

                "bot"

            );

        }

        else {

            ajouterMessage(

                reponseIA(reponse),

                "bot"

            );

        }

        return;

    }

    // ---------- LIEU ----------

    if (bonneReponse(lieuActuel.phaseLieu.reponses, texte)) {

        gagner();

    }

    else {

        ajouterMessage(

            reponseIA(reponse),

            "bot"

        );

    }

}

/************************************************
 * AFFICHAGE DES IMAGES
 ************************************************/

function afficherImageClassique() {

    image.src = lieuActuel.image;

    imageZone.style.display = "block";

    ajouterMessage(
        "📷 Voici l'indice image.",
        "bot"
    );

}


function afficherImageLieu() {

    if (!lieuActuel.phaseLieu.imageInd) return;

    image.src = lieuActuel.phaseLieu.imageInd;

    imageZone.style.display = "block";

    ajouterMessage(
        "📷 Observe bien cette image.",
        "bot"
    );

}


/************************************************
 * INDICES
 ************************************************/

function demanderIndice() {

    if (lieuActuel.typeDoubleEtape) {

        indiceDouble();

    } else {

        indiceClassique();

    }

}


/************************************************
 * INDICES CLASSIQUES
 ************************************************/

function indiceClassique() {

    jeu.niveauIndice++;

    switch (jeu.niveauIndice) {

        case 2:

            afficherImageClassique();

            break;

        case 3:

            ajouterMessage(

                lieuActuel.indice3,

                "bot"

            );

            break;

        case 4:

            ajouterMessage(

                lieuActuel.indice4,

                "bot"

            );

            break;

        default:

            ajouterMessage(

                "❌ Tu as déjà utilisé tous les indices.",

                "bot"

            );

    }

}


/************************************************
 * INDICES ENIGMES DOUBLE ETAPE
 ************************************************/

function indiceDouble() {

    if (jeu.indiceDouble >= 3) {

        ajouterMessage(

            "❌ Tu as utilisé les 3 indices.",

            "bot"

        );

        return;

    }

    jeu.indiceDouble++;

    const liste =

        jeu.phase === "activite"

        ? lieuActuel.phaseActivite.indices

        : lieuActuel.phaseLieu.indices;

    const indice = liste[jeu.indiceDouble - 1];

    if (indice === "IMAGE") {

        afficherImageLieu();

    }

    else {

        ajouterMessage(

            `💡 Indice ${jeu.indiceDouble}/3 :<br>${indice}`,

            "bot"

        );

    }

    jeu.scoreQuestion -= 10;

}
/************************************************
 * BONNE REPONSE
 ************************************************/

function gagner() {

    jeu.score += jeu.scoreQuestion;

    ajouterMessage(

        `🎉 Bravo !<br>
        Tu as trouvé : <b>${lieuActuel.nom}</b><br>
        ⭐ Points : ${jeu.scoreQuestion}`,

        "bot"

    );

    indiceButton.style.display = "none";
    nextButton.style.display = "inline-block";

}


/************************************************
 * ENIGME SUIVANTE
 ************************************************/
function reinitialiserAffichage() {

    // Vide le chat
    chat.innerHTML = "";

    // Cache l'image
    imageZone.style.display = "none";

    // Vide le champ de saisie
    input.value = "";

    // Remet les boutons dans leur état initial
    indiceButton.style.display = "inline-block";
    nextButton.style.display = "none";

}


function prochainLieu() {

    jeu.position++;

    if (jeu.position >= jeu.partie.length) {

        finDuJeu();

        return;

    }

    lieuActuel = jeu.partie[jeu.position];

    reinitialiserEnigme();

    reinitialiserAffichage();

    afficherQuestion();

}


/************************************************
 * REINITIALISATION
 ************************************************/

function reinitialiserEnigme() {

    jeu.phase = "activite";

    jeu.indiceDouble = 0;

    jeu.niveauIndice = 1;

    jeu.scoreQuestion = 100;

    imageZone.style.display = "none";

}


/************************************************
 * FIN DE PARTIE
 ************************************************/

function finDuJeu() {

    indiceButton.style.display = "none";

    nextButton.style.display = "none";

    ajouterMessage(

        `🏆 Félicitations !<br><br>
        Tu as terminé toutes les énigmes.<br><br>
        ⭐ Score final : <b>${jeu.score}</b>`,

        "bot"

    );

    input.disabled = true;

    boutonEnvoyer.disabled = true;

}