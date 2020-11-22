const projectId = 'pippo-f6372'; 
const sessionId = 'my-test-session-id';
const dialogflow = require('dialogflow');

const agentClient = new dialogflow.AgentsClient({
    keyFilename:  '/Users/admin/google-cloud-sdk/bin/pippo-f6372-c5c542a4c92f.json'
  });
  if (agentClient){

    console.log('ok ho agente');
  }
  var formattedParent = agentClient.projectPath(projectId);
  if (formattedParent){

    console.log('ok ho progetto...' + formattedParent);
  }
  agentClient.getAgent({parent: formattedParent})
   .then(responses => {
    var response = responses[0];
    //console.log(responses[0]);
     console.log('QUESTO E‘ IL RISULTATO DEll‘agente '+esponses[0]);
  })
   .catch(err => {
     console.error(err);
   });
   /* e' intentsClient!!
agentClient.listIntents(formattedParent).then(responses => {
    var response = responses[0];
    console.log('QUESTO E‘ IL RISULTATO DEGLI INTENT '+responses[0]);
     // doThingsWith(response)
  })
   .catch(err => {
     console.error(err);
   });
   */
   