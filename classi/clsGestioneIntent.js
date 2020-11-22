/*class Person1 {
  constructor(first, last, age, gender, interests) {
    this.name = {
      first,
      last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
  }

  greeting() {
    console.log(`Hi! I'm ${this.name.first}`);
  };

  farewell() {
    console.log(`${this.name.first} has left the building. Bye for now!`);
  };
}*/



const dialogflow = require('dialogflow');

  class GestioneIntent{
   
    constructor(projectId, filepath,sessionId) {
        this.projectId=projectId;
        this.filepath = filepath;
        this.sessionId=sessionId;
    }; //fine costruttore
       
    testlog(){

      console.log('creato classe di nome '+GestioneIntent.name);
    };
    creaIntent(nomeIntent,azione,parametri,domande,risposte,webhook, contesto, lang) {
            console.log('-----> dentro creaIntent');
           
            const intentsClient = new dialogflow.IntentsClient({
                keyFilename: this.filepath
              });
             
                
            const agentPath = intentsClient.projectAgentPath(this.projectId);
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
      };
      agentClient.listIntents(formattedParent).then(responses => {
        var response = responses[0];
        console.log('QUESTO E‘ IL RISULTATO DEGLI INTENT '+responses[0]);
         // doThingsWith(response)
      })
       .catch(err => {
         console.error(err);
       });
//}
 
module.exports = GestioneIntent;
