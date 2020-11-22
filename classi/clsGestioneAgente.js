/*
 const p=new dialogflow.AgentsClient({
                keyFilename: this.filepath
              });
              p.getAgent(this.projectId,projectName);
*/
const dialogflow = require('dialogflow');
class GestioneAgente{
   
  constructor(projectId, filepath) {
      this.projectId=projectId;
      this.filepath = filepath;
      
  }; //fine costruttore
     
  testlog(){

    console.log('creato classe di nome '+GestioneAgente.name);
  };
 
  getAgente(){
    const agentClient = new dialogflow.AgentsClient({
      keyFilename: this.filepath
    });
    var formattedParent = agentClient.projectPath(this.projectId);
    agentClient.getAgent({parent: formattedParent})
     .then(responses => {
      var response = responses[0];
      console.log(responses[0]);
       // doThingsWith(response)
    })
     .catch(err => {
       console.error(err);
     });
  }
    };
   
    module.exports = GestioneAgente;