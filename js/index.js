var app = {
    init: function(){
        console.log('app.init');
        // on cible l'élément cliquable, ici buttonYoda, et on met un écouteur d'évenement sur l'element
        document.getElementById('buttonYoda').addEventListener('click', app.getYodaName);
        document.getElementById('buttonTwoSpecies').addEventListener('click', app.getSpecies);
        document.getElementById('buttonHumanSize').addEventListener('click', app.getHumanSize);
        document.getElementById('buttonAllInfosHuman').addEventListener('click',app.getAllInfosHuman);
    },
    // EXERCICE1: méthode qui recupère le nom de yoda
    getYodaName: function(){
        console.log(app.getYodaName);
    
        // function to get yoda name 
        axios.get('https://swapi.co/api/people/20/')
        .then(function(response){
            console.log(response);
            // on recupère l'information du json pour avoir le nom de yoda
            console.log(response.data.name);
            // on cible l'element span à l'id yodaname 
            //pour ecrire le nom de yoda au clique sur le bouton
            document.getElementById('nameYoda').textContent=response.data.name;
        })
        .catch(function(error){
            console.log(error);
        })
    },
    // EXERCIE2
    // : méthode qui récupère le nom de chaque espèce avec 2 personnages
    getSpecies: function(){
        console.log(app.getSpecies);
        axios.get('https://swapi.co/api/species/')
        .then(function(response){
            // on recupere notre tableau de données conteant les espèces et les noms
            const arraySpecies=response.data.results;
            console.log(arraySpecies);

            // on map sur les personnages de chaque espèce
            const arrayClassification = arraySpecies
            .map(array=>array.name)
            //@todo: filtrer les personnages lié à leur espèce 

            //fonction permettant d'enlever les doublons d'un tableau
            // .reduce(function(acc, array) {
            //     if(acc.indexOf(array) === -1) {
            //         acc.push(array);
            //     } 
            //     return acc
            // }, []);
            console.log("mon nouveau tableau est : "+ arrayClassification);

            //on boucle le resultat du tableau pour afficher les resultats sous forme de liste.
            var listUl= document.getElementById('result');
            arrayClassification.map(function(currentItem){
                console.log(currentItem);
                listeLi=document.createElement('li');
                listeLi.textContent=currentItem;
                listUl.appendChild(listeLi);
            });
            
        })
        .catch(function(error){
            console.log(error);
        })
    },
    // EXERCICE 3 : Créez une fonction qui retourne la somme des tailles de tous les humains
    getHumanSize: function(){
        console.log(app.getHumanSize);
        axios.get('https://swapi.co/api/people/')
        .then(function(response){
            //on recupere notre tableau de données
            const arrayHuman=response.data.results;
            console.log(arrayHuman)

            // on utilise la fonction reduce pour additionner toutes les tailles des humains
            //.map(Number) permet de convertir une chaine de caractère en nombre et d'éviter des risques de concaaténation via reduce
            const arraySizeHuman= arrayHuman
            .map(human => human.height)
            .map(Number)
            .reduce((accumulator,human) => accumulator + human, 0);
            
            document.getElementById('sizeSum').textContent = arraySizeHuman;
        })
        .catch(function(error){
            console.log(error);
        })
    },
    // EXERCICE4: Créez une fonction qui retourne un tableau de tous les tous les humains, contenant  le nom, la taille, le poids, le nom des films dans lesquels ils sont apparus et le nom de leur planète d'origine
    getAllInfosHuman: function(){
        console.log(app.getAllInfosHuman);
        axios.get('https://swapi.co/api/people/')
        .then(function(response){
            console.log(response.data.results);
            const arrayInfos= response.data.results;
            
            const arrayName=arrayInfos
            .map(array => array.name)                      
                console.log(arrayName);

            const arraySize=arrayInfos
            .map(array => array.height)                      
                console.log(arraySize);
            
            const arrayMass=arrayInfos
            .map(array => array.mass)                      
                 console.log(arrayMass);

                 //@TODO : refaire des appels API pour recupérer les infos sur les films et les planètes
            const arrayMovies=arrayInfos
            .map(array => array.films)                      
                console.log(arrayMovies) 

            const arrayPlanet=arrayInfos
            .map(array => array.homeworld)                      
                console.log(arrayPlanet) 
        


                var table= document.getElementById('name');
                arrayName.map(function(currentItem){
                    console.log(currentItem);
                    elementRow=document.createElement('td');
                    elementRow.textContent=currentItem;
                    table.appendChild(elementRow);
                });       

                var table= document.getElementById('size');
                arraySize.map(function(currentItem){
                    console.log(currentItem);
                    elementRow=document.createElement('td');
                    elementRow.textContent=currentItem;
                    table.appendChild(elementRow);
                }); 

                var table= document.getElementById('mass');
                arrayMass.map(function(currentItem){
                    console.log(currentItem);
                    elementRow=document.createElement('td');
                    elementRow.textContent=currentItem;
                    table.appendChild(elementRow);
                }); 
        })
        .catch(function(error){
            console.log(error);
        })
    }
}

document.addEventListener('DOMContentLoaded',app.init);