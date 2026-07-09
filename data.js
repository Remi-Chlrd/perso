//
// Découvre Amboise
// Base de données des lieux
//

const lieu = [

    {
        id: 1,

         nom:"Kart Cap Karting",

        typeDoubleEtape:true,

        phaseActivite:{

            reponses:[
                "karting",
                "kart"

            ],

            ville : "Mer",

            indices:[

                "Tu cherches une activité de loisir que tu rêves de faire avec ton amoureux depuis très longtemps !",

                "On la pratique en exterieur et elle es bruyante.",

                "On porte un casque et des gants afin d'être en sécurité en cas de sortie de piste."
            ]

        },


        phaseLieu:{

            reponses:[

                "kart cap",
                "kart cap karting",
                "cap karting",
                "cap kart",
                "kart Mer"

            ],

            indices:[

                "La piste se trouve à moins d'1h30 d'Antony",

                "La piste est l'une des plus grande d'Europe",

                " Elle se trouve dans le Loir-et-Cher."

            ]

            //Indiceimage:
            //"images/indice-kart.jpg",
        }
    },
        /*image:
        "images/kartcap.jpg",

        indice3:
        "Je me trouve à Mer, dans le département du Loir-et-Cher.",

        indice4:
        "Mon nom commence par le mot 'Kart' et je propose des courses sur circuit."
    },*/


    {
        id: 2,

        nom: "Hôtel Au Charme Rabelaisien",

        reponses: [
            "au charme rabelaisien",
            "charme rabelaisien",
            "hotel charme rabelaisien",
            "rabelaisien"
        ],

        ville: "Amboise",

        indice1:
        "Je suis un établissement élégant, historique et ai été élu 9ème meilleur petit hotel de France par Tripadvisor.",

        image:
        "images/charme-rabelaisien.jpg",

        indice3:
        "Je me situe au cœur d'une ville célèbre pour son château royal.",

        indice4:
        "Mon nom évoque un écrivain français célèbre : Rabelais."
    },


    {
        id: 3,

        nom: "Restaurant La Planque",

        reponses: [
            "la planque",
            "restaurant la planque",
            "planque"
        ],

        ville: "Amboise",

        indice1:
        "Je suis un endroit où l'on vient découvrir une cuisine et passer un moment convivial.",

        image:
        "images/planque.jpg",

        indice3:
        "Je suis l'un des meilleurs restaurants situé dans la ville d'Amboise d'après Tripadvisor !",

        indice4:
        "Mon nom fait penser à un endroit discret où l'on se cache."
    },


    {
        id: 4,

        nom: "Office de Tourisme d'Amboise",

        reponses: [
            "office de tourisme",
            "office du tourisme",
            "office tourisme amboise",
            "tourisme amboise",
            "agence tourisme amboise"
        ],

        ville: "Amboise",

        indice1:
        "Je suis un lieu où les visiteurs viennent chercher des informations pour découvrir une destination.",

        image:
        "images/tourisme.jpg",

        indice3:
        "Je renseigne les touristes qui souhaitent visiter Amboise et ses environs.",

        indice4:
        "Mon activité est liée aux voyages, aux visites et aux découvertes."
    },


    {

            id:5,

            nom:"Le Bélandre",

            typeDoubleEtape:true,

            phaseActivite:{

                reponses:[

                    "croisière",
                    "bateau",
                    "navigation"

                ],

                indices:[

                    "C'est une activité que tu n'as réalisé que très peu de fois avec ton amoureux",

                    "On réalise cette activité pour profiter des paysages mais on peut également boire ou manger SUR moi .",

                    "Cette activité est propre au domaine fluvial."

                ]

            },


            phaseLieu:{

                reponses:[

                    "belandre",
                    "le belandre"

                ],

                indices:[

                    "L'activité se trouve sur le Cher.",

                    "Mon nom fait référence à un type de petit navire de charge marchand.",

                    "Le voyage se déroule aux alentours de chateau de Chenonceau."



                ]

                //imageInd:{
                //"images/indice-belandre.jpg",}

            }
    },

];


// Mélange les lieux au début de chaque partie

function melangerLieux(){

    return lieu;
}