/*

12/09/2020 
funzione per importare domande e risposte per n intent in Dialogflow
testato su progetto pippo, funziona

*/

const projectId = 'pippo-f6372'; 
const sessionId = 'my-test-session-id';
var languageCode = 'it-IT'; //ocio alla lingua!!! en-US
const XLSX=require('xlsx') ;
const dialogflow = require('dialogflow');
//const colori=require('./classi/clsColor');

//console.log('colore '+ colori.getRandomColor().name);

// Instantiates clients

const intentsClient = new dialogflow.IntentsClient({
  keyFilename: '/Users/admin/google-cloud-sdk/bin/pippo-f6372-c5c542a4c92f.json'
});


var workbook = XLSX.readFile('data_import.xlsx');
var first_sheet_name = workbook.SheetNames[0];
console.log('nome del foglio '+first_sheet_name);



var worksheet = workbook.Sheets[first_sheet_name];

var righe=XLSX.utils.sheet_to_json(worksheet); 
var intentCorrente="";
var intentPrecedente='';

var multiIntent=[];

var multiDomande=[];
var responses=[];
var j=0; //contatore dell'array dell'intent corrente
var first;
console.log('********** inizio lettura alle ore ' + new Date().getHours()+ ':' + new Date().getMinutes());
for (var i=0;i<righe.length;i++){ //righe.length
  console.log('----- LEGGO-> nome  intent ' +righe[i].INTENT +',domanda '+ righe[i].DOMANDA +', risposta '+ righe[i].RISPOSTA+ ', lingua ' + righe[i].LINGUA);
//devono essere array

    intentCorrente=righe[i].INTENT; //valore corrente del nome dell'intent
    
    //se intentCorrente non è presente nell'array multiIntent aggiungilo
   
  
    if  ((multiIntent.length==0) || (multiIntent.indexOf(intentCorrente)==-1)) {
      multiIntent[j]=intentCorrente;
      console.log('AGGIUNTO INTENT CORRENTE '+ multiIntent[j]);
      
       j++;
      

    }else {
      intentPrecedente= multiIntent[j-1]; //----> righe[i-1].INTENT; //aggiunto -1
      console.log('intent precedente '+ intentPrecedente);
    }
  
    //prendi le risposte
    /*if  ((righe[i].RISPOSTA) ||  (intentPrecedente=='') ){
      responses.push(righe[i].RISPOSTA);
      console.log('------- risposta '+ righe[i].RISPOSTA);
    }*/
    if  ( (intentPrecedente==intentCorrente) || (intentPrecedente=='')) { //multiIntent[j]
      multiDomande.push(righe[i].DOMANDA);
      console.log('------- domande '+righe[i].DOMANDA);
      if  ((righe[i].RISPOSTA) ||  (intentPrecedente=='') ){
        responses.push(righe[i].RISPOSTA);
        console.log('------- risposta '+ righe[i].RISPOSTA);
      }
     
    }
    if ((intentPrecedente!='') && (intentCorrente!=intentPrecedente)) {

      console.log(' ***************** QUI CREO INTENT '+ intentPrecedente + ' con domande ' +multiDomande.toString() + ', con risposte '+responses.toString() + ' e con lingua '+ righe[i-1].LINGUA);
      creaIntent(intentPrecedente,intentPrecedente+'_action',[],multiDomande,responses,false, '', righe[i-1].LINGUA.trim());
      responses=[];
      multiDomande=[];
      multiDomande.push(righe[i].DOMANDA);
      if  (righe[i].RISPOSTA){
        responses.push(righe[i].RISPOSTA);
       
      }
    }
    if (i==righe.length-1) {
      console.log(' ***************** QUI CREO INTENT '+ intentCorrente + ' con domande ' +multiDomande.toString() + ', con risposte '+responses.toString() + ' e con lingua '+ righe[i-1].LINGUA);
      creaIntent(intentCorrente,intentCorrente+'_action',[],multiDomande,responses,false, '', righe[i-1].LINGUA.trim());
    }
    console.log('********** termine alle ore ' + new Date().getHours()+ ':' + new Date().getMinutes());
    
   }


/* ORIGINALE 

while(tempintent==valori[i].INTENT){
  var p= {type: 'EXAMPLE', parts: [{text: valori[i].DOMANDA}]};
  domMulti.push(p);
  console.log('INSERITO DOMANDA '+ domMulti[j].parts[0].text);
  j++;
  console.log('------ > in intent '+ tempintent);
  tempintent='';
}*/

  //creaIntent(righe[i].INTENT.trim(),righe[i].INTENT.trim()+'_action',[],questions,responses,false, '', righe[i].LINGUA.trim());

//}


//nomeIntent=stringa, azione =nome intent+_action, parametri è un array, domande è un array, risposte è un array, webhook abilitato è boolean, contesto è stringa
function creaIntent(nomeIntent,azione,parametri,domande,risposte,webhook, contesto, lang){
  console.log('-----> dentro creaIntent');


  const agentPath = intentsClient.projectAgentPath(projectId);
  const pizzaResult = {
    action: azione,
    parameters: parametri,
    messages: [
      {
        text: {
          text: risposte
        }
      }
    ]
    
  };
//originale=
var pizzaPhrases=[];
for(var i=0; i<domande.length;i++){
  pizzaPhrases[i]= {type: 'EXAMPLE', parts: [{text: domande[i]}]}

}
 /* const pizzaPhrases = [
    {type: 'EXAMPLE', parts: [{text: domande}]}
   ]
*/

   const pizzaIntent = {
    displayName: nomeIntent,
   
    webhookState: webhook?'WEBHOOK_STATE_ENABLED':'WEBHOOK_STATE_DISABLED',
    trainingPhrases: pizzaPhrases,
    messages: pizzaResult.messages, 
    mlEnabled: true,
    priority: 500000,
    result: pizzaResult,
    languageCode: lang
  };
  
  const pizzaRequest = {
    parent: agentPath,
    intent: pizzaIntent,
  };
  
  // Create the pizza intent
  intentsClient
    .createIntent(pizzaRequest)
    .then(responses => {
      console.log('Created ' + nomeIntent + ' intent');
      //logIntent(responses[0]);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}
//process.on('warning', e => console.warn(e.stack));

// The path to identify the agent that owns the created intent.
/* const agentPath = intentsClient.projectAgentPath(projectId);

// Setup intents for ordering a pizza.

// First of all, let's create an intent that triggers pizza order flow.


// Note that session ID is unknown here, using asterisk.


// The result of the matched intent.
const pizzaResult = {
  action: 'pagamento_action',
  parameters: [],
  messages: [
    {
      text: {
        text: [
          'Le modalità ed i termini di pagamento di Signally dipendono molto dal progetto o dal servizio acquistato',
          'in linea generale.....'
        ]
      }
    }
  ]
  
};

// The phrases for training the linguistic model.
const pizzaPhrases = [
  {type: 'EXAMPLE', parts: [{text: 'Quali sono le Modalità e i Termini di pagamento?'}]},
  {type: 'EXAMPLE', parts: [{text: 'Termini di pagamento'}]},
  {type: 'EXAMPLE', parts: [{text: 'Modalità di pagamento'}]},
  {type: 'EXAMPLE', parts: [{text: 'Come fare per il pagamento'}]}
 
 ]

// The intent to be created.
const pizzaIntent = {
  displayName: 'PAGAMENTO',
 
  webhookState: 'WEBHOOK_STATE_DISABLED',
  trainingPhrases: pizzaPhrases,
  messages: pizzaResult.messages, //<-------
  mlEnabled: true,
  priority: 500000,
  result: pizzaResult,
};

const pizzaRequest = {
  parent: agentPath,
  intent: pizzaIntent,
};

// Create the pizza intent
intentsClient
  .createIntent(pizzaRequest)
  .then(responses => {
    console.log('Created pagamento intent:');
    //logIntent(responses[0]);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
*/