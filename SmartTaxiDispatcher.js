const prompt=require("prompt-sync")();
let Taxis = [];
let Requests = [];

function add_Taxi(){
        let position = prompt("Donner le position de un taxi : ");
        let add_un_taxi={
             id: Taxis.length+1,
             position : Number(position),
             available : true,
             timeRemaining : 0,
             totalRides : 0
        }
        Taxis.push(add_un_taxi)
        console.log("NOUVEAU TAXI A ÉTÉ AJOUTÉ: ")
        return add_un_taxi
    }

    function add_Request(){
        let position = prompt("Donner le position  de un Request : ");
        let duration = prompt("Donner la durée estimée du trajet : ");
        let add_un_request={
             reqId: Requests.length+1,
             position : Number(position),
             duration : Number(duration),
             time : Requests.length 
        }
        Requests.push(add_un_request)
        console.log("NOUVEAU REQUEST A ÉTÉ AJOUTÉ : ")
        return add_un_request
    }

// A. pour trouver le premier request 
function smalrequest(){
    let curent_request=Requests[0];
    for (let i = 1; i < Requests.length; i++) {
        if(curent_request.time > Requests[i].time ){
            curent_request=Requests[i];
    } 
    }
    return curent_request;
}

let curent_request = smalrequest();
// Trouver le taxi le plus proche et disponible et B. Gérer la durée du trajet 
function closeness(){
    let distance;
    let colsest_Taxi ;
    let minDistance =Infinity;
//    Trouver le taxi le plus proche et disponible
    for (let i = 0; i < Taxis.length; i++) {
       if(Taxis[i].available == true){
        distance = Math.abs(Taxis[i].position - curent_request.position)
      if (distance < minDistance) {
        minDistance = distance;
        colsest_Taxi = Taxis[i];
    }
    }     
    }
    //the taxi becomes unavaialable as soon as it is busy
    colsest_Taxi.available = false;   
    //take the duration of the curent request to the time remaining of the closest taxi.
    colsest_Taxi.timeRemaining = curent_request.duration;
    console.log(`Request ${curent_request.reqId} At position  ${curent_request.position} Taxi ${colsest_Taxi.id} distance to request : ${minDistance}\ntime remaining is : ${colsest_Taxi.timeRemaining} min`)
};

// C. Libérer le taxi automatiquement 

 function earliest_taxi(){
    let taxi_new_position=0;
    //  À chaque minute simulée, on décrémente ce temps...
    Taxis.forEach(taxi => {
        if (taxi.timeRemaining > 0){
            taxi.available = false;
            taxi.timeRemaining --;
        // Quand timeRemaining arrive à 0  Le taxi devient disponible à nouveau.
        }else if(taxi.timeRemaining == 0){
        taxi.available = true;
        // Sa position change vers la destination (ici = position de la demande)
        taxi.position = curent_request.position
        taxi_new_position=taxi.position }
        }); console.log(taxi_new_position) }
        // D. Gérer une file d’attente
function menu(){
    console.log('=================================================================')
    console.log('================== Smart Taxi Dispatcher  ===================')
    console.log('=================================================================')
    console.log('1. Ajouter un taxi : ')
    console.log("2. Ajouter un request : ")
    console.log("3. Aficher the closest taxi. ")
    console.log("4. Aficher the earliest taxi. ")
    console.log("5. Aficher taxi tableu . ")
    console.log("6. Aficher Request tableu . ")
    console.log('0. Quitter ')

    let choises = prompt('Choisissez dans le menu =>  ');
    return choises;
}

function Smart_taxi(){

    let m;
    
do{
   
    m=menu();

    switch (m) {
        // ================ Opérations sur les livres =============
                    case ('1'):add_Taxi();break;
                    case ('2'):add_Request();break;
                    case ('3'):closeness();break;
                    case ('4'):earliest_taxi();break;
                    case ('5'):console.log(Taxis);break;
                    case ('6'):console.log(Requests);break;
                case ('0'):
console.log("fin !!")
break;      
            default:
            console.log('errore')
            break;
    }
}while( m != 0)
}
Smart_taxi()