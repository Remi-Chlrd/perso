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

        if(
    q.includes("clos")
    ||
    q.includes("coeur")
    ||
    q.includes("pause")
    ||
    q.includes("ilot")
    ||
    q.includes("shaker")
    ||
    q.includes("epicerie")
    ){

        if(
        lieuActuel.nom.includes("Planque")
        ){

            return "🏨 Tu es sur la bonne piste mais je suis mieux noté !.";

        }

        return "❌ Ce n'est pas le bon restaurant.";

    }

    // Questions sur l'activité

    if(q.includes("voiture")
    || q.includes("course")
    || q.includes("roue")){


        if(
        lieuActuel.nom.includes("Kart")
        ){

            return "🍽️ Oui, cette activité est en lien avec le domaine de la conduite";

        }


        return "❌ Non, ce n'est probablement pas ce type d'activité.";

    }


    // Questions sur l'eau

    if(
    q.includes("tours")
    ){
        if(lieuActuel.nom.includes("Bélandre")){

            return "🌊 Tu n'es pas sur la bonne rivière.";

        }
        return "🤔 Ce n'est pas l'indice principal de ce lieu.";

    }

 if(
    q.includes("chisseaux")
    ||
    q.includes("chenonceau")
    ){


        if(lieuActuel.nom.includes("Bélandre")){

            return "🌊 Oui, tu es au bon endroit, il ne te reste plus qu'à trouver le nom de la compagnie.";

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
        ||
        q.includes("blois")
        ){

            if(lieuActuel.ville==="Mer"){

                return "✅ Oui, tu es sur la bonne piste.";

            }
                return "❌ Non, cette activité n'est pas dans cette ville.";
        }





    if(
    q.includes("orleans")
    ||
    q.includes("tours")
    ){

        if(lieuActuel.ville==="Mer"){

            return "✅ Regarde à une 30aine de minute autour.";

        }
        return "❌ Non, cette activité n'est pas dans cette ville.";
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

        if(
    q.includes("charme")
    ||
    q.includes("rabelais")
    ||
    q.includes("luxe")
    ){

        if(
        lieuActuel.nom.includes("Charme")
        ){

            return "🏨 Tu es toute proche du résultat !";

        }

        return "❌ Ce n'est pas la bonne piste.";

    }




    // Indice supplémentaire

    if(
    q.includes("aide")
    ||
    q.includes("indice")
    ){
        return "💡 Demande-moi un indice avec le bouton prévu. Je peux t'aider progressivement.";

    }



    // Réponse par défaut

    return(
    "Non tu n'es pas sur la bonne piste ... \n"
    +"🤖Tu peux retenter ta chance ! \n"
    +"💡 Ou alors redemande moi un indice.");

}