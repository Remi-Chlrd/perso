//
// Découvre Amboise
// Assistant IA local
//


function reponseIA(question){

    let q = question
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"");



    // Questions sur la catégorie

    if(q.includes("restaurant")
    || q.includes("manger")
    || q.includes("cuisine")){


        if(
        lieuActuel.nom.includes("Planque")
        ||
        lieuActuel.nom.includes("Bélandre")
        ){

            return "🍽️ Oui, ce lieu est lié à la restauration.";

        }


        return "❌ Non, ce n'est probablement pas un restaurant.";

    }



    // Questions sur l'eau

    if(
    q.includes("eau")
    ||
    q.includes("riviere")
    ||
    q.includes("fleuve")
    ||
    q.includes("cher")
    ){


        if(lieuActuel.nom.includes("Bélandre")){

            return "🌊 Oui, ce lieu est associé à un environnement proche de l'eau.";

        }


        return "🤔 Ce n'est pas l'indice principal de ce lieu.";

    }




    // Questions sur Amboise

    if(
    q.includes("amboise")
    ){

        if(lieuActuel.ville==="Amboise"){

            return "✅ Oui, ce lieu se trouve à Amboise.";

        }

        return "❌ Non, cherche plutôt ailleurs.";

    }



    // Questions sur Mer

    if(
    q.includes("mer")
    ){

        if(lieuActuel.ville==="Mer"){

            return "✅ Oui, tu es sur la bonne piste.";

        }

    }



    // Questions générales

    if(
    q.includes("hotel")
    ||
    q.includes("dormir")
    ||
    q.includes("nuit")
    ){

        if(
        lieuActuel.nom.includes("Charme")
        ){

            return "🏨 Oui, c'est un lieu où des voyageurs peuvent séjourner.";

        }

        return "❌ Ce n'est pas un hôtel.";

    }




    // Indice supplémentaire

    if(
    q.includes("aide")
    ||
    q.includes("indice")
    ){

        return
        "💡 Demande-moi un indice avec le bouton prévu. Je peux t'aider progressivement.";

    }



    // Réponse par défaut

    return
    "🤖 Je peux répondre à des questions comme :\n"
    +"• Est-ce un restaurant ?\n"
    +"• Est-ce à Amboise ?\n"
    +"• Est-ce près de l'eau ?\n"
    +"• Est-ce un hôtel ?";

}