       // Découvre Amboise
       // script.js
       // Version mobile + START + indices images
       //


       let partie = lieu;   // ordre fixe défini dans data.js

       let position = 0;

       let lieuActuel = partie[position];


       let scoreTotal = 0;

       let scoreQuestion = 100;



       // Gestion énigmes double étape

       let phaseDouble = "activite";

       let compteurIndiceDouble = 0;



       // Gestion indices classiques

       let niveauIndice = 1;



       // =======================
       // Récupération éléments HTML
       // =======================


       const chat = document.getElementById("chat");

       const input = document.getElementById("message");

       const boutonEnvoyer = document.getElementById("send");


       const imageZone = document.getElementById("imageZone");

       const image = document.getElementById("indiceImage");


       const startScreen = document.getElementById("startScreen");

       const startButton = document.getElementById("startButton");




       // =======================
       // Ajouter message
       // =======================


       function ajouterMessage(message,type){


           let bloc = document.createElement("div");


           bloc.className = type;


           bloc.innerHTML = message;


           chat.appendChild(bloc);


           chat.scrollTop = chat.scrollHeight;


       }





       // =======================
       // Affichage numéro énigme
       // =======================


       function afficherEnigme(){


           ajouterMessage(

               "🧩 Énigme "
               +(position+1),

               "bot"

           );


       }





       // =======================
       // Démarrage du jeu
       // =======================


       function commencer(){


           afficherEnigme();



           if(lieuActuel.typeDoubleEtape){


               ajouterMessage(

                   "💡 Trouve d'abord l'activité :<br>"
                   +
                   lieuActuel.phaseActivite.indices[0],

                   "bot"

               );


           }

           else{


               ajouterMessage(

                   "💡 Indice :<br>"
                   +
                   lieuActuel.indice1,

                   "bot"

               );

           }


       }





       // Bouton START

       startButton.addEventListener(
       "click",
       commencer()
       );
       /*function(){


           startScreen.style.display="none";


           chat.style.display="block";


           commencer(); }  */








       // =======================
       // Envoi réponse
       // =======================


       boutonEnvoyer.addEventListener(
       "click",
       envoyer
       );



       input.addEventListener(
       "keypress",
       function(e){


           if(e.key==="Enter"){

               envoyer();

           }


       });





       function envoyer(){


           let texte=input.value.trim();



           if(texte==="") return;



           ajouterMessage(

               texte,

               "user"

           );



           input.value="";



           analyserReponse(texte);



       }





       // =======================
       // Analyse réponses
       // =======================


       function analyserReponse(reponse){



           let propre =
           reponse
           .toLowerCase()
           .normalize("NFD")
           .replace(/[\u0300-\u036f]/g,"");




           // -------------------
           // Enigmes doubles
           // -------------------


           if(lieuActuel.typeDoubleEtape){



               if(phaseDouble==="activite"){


                   let ok=false;



                   lieuActuel.phaseActivite.reponses.forEach(rep=>{


                       if(propre.includes(rep)){

                           ok=true;

                       }


                   });



                   if(ok){


                       phaseDouble="lieu";

                       compteurIndiceDouble=0;



                       ajouterMessage(

                           "✅ Bravo ! Tu as trouvé l'activité.<br><br>"
                           +"Maintenant trouve le lieu précis.",

                           "bot"

                       );



                       afficherImageLieu();



                   }

                   else{


                       ajouterMessage(

                           reponseIA(reponse),

                           "bot"

                       );


                   }



                   return;


               }




               if(phaseDouble==="lieu"){



                   let ok=false;



                   lieuActuel.phaseLieu.reponses.forEach(rep=>{


                       if(propre.includes(rep)){

                           ok=true;

                       }


                   });



                   if(ok){

                       gagner();

                   }

                   else{


                       ajouterMessage(

                           reponseIA(reponse),

                           "bot"

                       );


                   }



                   return;


               }


           }





           // -------------------
           // Enigmes classiques
           // -------------------


           let trouve=false;



           lieuActuel.reponses.forEach(rep=>{


               if(propre.includes(rep)){

                   trouve=true;

               }


           });



           if(trouve){


               gagner();


           }

           else{


               ajouterMessage(

                   reponseIA(reponse),

                   "bot"

               );


           }


       }






       // =======================
       // Bouton indice
       // =======================


       function demanderIndice(){



           if(lieuActuel.typeDoubleEtape){



               if(compteurIndiceDouble>=3){

                   ajouterMessage(

                       "❌ Tu as utilisé les 3 indices de cette étape.",

                       "bot"

                   );

                   return;

               }



               compteurIndiceDouble++;



               if(phaseDouble==="activite"){



                   ajouterMessage(

                       "💡 Indice activité "
                       +compteurIndiceDouble
                       +"/3 :<br>"
                       +
                       lieuActuel.phaseActivite.indices[
                       compteurIndiceDouble-1
                       ],

                       "bot"

                   );


               }



               else{


                   let indice =
                   lieuActuel.phaseLieu.indices[
                   compteurIndiceDouble-1
                   ];



                   if(indice==="IMAGE"){


                       afficherImageLieu();


                   }

                   else{


                       ajouterMessage(

                           "💡 Indice lieu "
                           +compteurIndiceDouble
                           +"/3 :<br>"
                           +indice,

                           "bot"

                       );


                   }


               }



               scoreQuestion-=10;


               return;


           }




           // Indices classiques


           niveauIndice++;



           if(niveauIndice===2){


               afficherImageClassique();


           }


           else if(niveauIndice===3){


               ajouterMessage(

                   lieuActuel.indice3,

                   "bot"

               );


           }


           else if(niveauIndice===4){


               ajouterMessage(

                   lieuActuel.indice4,

                   "bot"

               );


           }



       }





       // =======================
       // Images
       // =======================


       function afficherImageLieu(){


           image.src =
           lieuActuel.phaseLieu.imageIndice;



           imageZone.style.display="block";


           ajouterMessage(

               "📷 Observe bien cette image.",

               "bot"

           );


       }




       function afficherImageClassique(){


           image.src =
           lieuActuel.image;



           imageZone.style.display="block";


           ajouterMessage(

               "📷 Voici l'indice image.",

               "bot"

           );


       }





       // =======================
       // Bonne réponse
       // =======================


       function gagner(){


           scoreTotal+=scoreQuestion;



           ajouterMessage(

               "🎉 Bravo !<br>"
               +"Tu as trouvé : <b>"
               +lieuActuel.nom
               +"</b><br>"
               +"⭐ Points : "
               +scoreQuestion,

               "bot"

           );



           afficherBoutonSuivant();


       }







       // =======================
       // Bouton suivant
       // =======================


       function afficherBoutonSuivant(){


           let bouton=document.createElement("button");



           bouton.innerHTML="➡️ Énigme suivante";


           bouton.className="nextButton";



           bouton.onclick=function(){


               bouton.remove();


               prochainLieu();


           };



           document.querySelector("footer")
           .appendChild(bouton);


       }





       // =======================
       // Passage lieu suivant
       // =======================


       function prochainLieu(){


           position++;



           if(position>=partie.length){


               ajouterMessage(

                   "🏆 Fin du jeu !<br><br>"
                   +"Score final : "
                   +scoreTotal,

                   "bot"

               );


               input.disabled=true;

               boutonEnvoyer.disabled=true;


               return;


           }




           lieuActuel=partie[position];



           phaseDouble="activite";


           compteurIndiceDouble=0;


           niveauIndice=1;


           scoreQuestion=100;



           imageZone.style.display="none";



           afficherEnigme();




           if(lieuActuel.typeDoubleEtape){


               ajouterMessage(

                   "💡 Trouve d'abord l'activité :<br>"
                   +lieuActuel.phaseActivite.indices[0],

                   "bot"

               );


           }

           else{


               ajouterMessage(

                   "💡 Indice :<br>"
                   +lieuActuel.indice1,

                   "bot"

               );

            }
       }