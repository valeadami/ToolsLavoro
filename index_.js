const manager=require('./classi/clsGestioneIntent');
const importazione=require('./classi/clsGestioneFileImport');



 let importa=new importazione('data_import.xlsx','temp');
 var records=importa.leggiFileImport();
 // console.log('ho i records ' +records.A1.v); //leggo la prima cella della colonna A1 intent
 records=importa.caricaContenuti();
 var count=0;
 var contDom=0;
 var contRisp=0;
 var domande=[];
 var risposte=[];

 /*  struttura dati per contenere campi per intent */
 const intNuovo={
  nome: [],
  domande: [
  [{words: []}]
  ],
 risposte:[ 
   [{risp: []}]
  ]
 };
console.log('********** inizio lettura alle ore ' + new Date().getHours()+ ':' + new Date().getMinutes());
 for(var i=0; i<records.length;i++){
     console.log('dentro il ciclo valore di colonna A '+records[i].INTENT);
   
     
     if (intNuovo.nome.indexOf(records[i].INTENT)==-1){
       
      intNuovo.nome.push(records[i].INTENT);

      console.log('----->  inserisco in nome '+ intNuovo.nome[count] ); 
      count++;
     
     }else{
        continue;
     
     }

 } //fine for nome intent
 
 /* recupero le domande e le risposte  associate a ciascun intent */


  for(var i=0; i< intNuovo.nome.length;i++){
 // var t=intNuovo.nome.shift(); --> così cicla su n-1 quindi ultimo elemento rimane fuori
    for(var j=0; j<records.length;j++){
     // if (t==records[j].INTENT){
      if (intNuovo.nome[i]==records[j].INTENT){
        domande.push(records[j].DOMANDA);
        if (records[j].RISPOSTA) 
          risposte.push(records[j].RISPOSTA)
      
      } else{

        continue;
      }
      
    }  //fine ciclo interno
    intNuovo.domande[contDom]=[{words: domande }];
    intNuovo.risposte[contRisp]=[{risp: risposte }];
    contDom++;
    contRisp++;
    domande=[];
    risposte=[];
}  //fine for domande
//per controllo
for(var i=0;i<intNuovo.domande.length;i++){
  var dd=intNuovo.domande[i];
  
  console.log('domande : ' + dd[0].words);
  
}
for(var i=0;i<intNuovo.risposte.length;i++){
  var rr=intNuovo.risposte[i];
  
  console.log(' --- risposte '+ rr[0].risp);
  
}

 /*
 intNuovo.domande[0].words=['pd'];
 console.log('il primo valore = ' +intNuovo.domande[0].words[0]);
 intNuovo.domande[0].words.push('porco dio');
 console.log('il primo valore = ' +intNuovo.domande[0].words[1]);
*/

// questo ok funge
//verifico che ci siano elementi da creare

if (intNuovo.nome.length>0){
  console.log('__________ INIZIO CREAZIONE INTENT ___________');
  let managerIntent=new manager('pippo-f6372',  '/Users/admin/google-cloud-sdk/bin/pippo-f6372-c5c542a4c92f.json','my-test-session-id');
//managerIntent.testlog();
  // var str='';
  // console.log('nome intent ' + intents.nome[0]); // 
   for(var i=0;i<intNuovo.nome.length;i++){
    var q=intNuovo.domande[i];
    var r=intNuovo.risposte[i];
    //per check
    //str+=' nome intent ' + intents.nome[i];
   
   /* for(var j=0;j<q.length;j++){
        str+=' con domande ' + q[j].words.toString();
    }
    for(var z=0;z<r.length;z++){
        str+=' con risposte ' + r[z].risp.toString();
    }
    console.log(str);*/
    managerIntent.creaIntent( intNuovo.nome[i], intNuovo.nome[i]+'_action',[],q[0].words,r[0].risp,false,'','it-IT');

   }
   console.log('********** termine alle ore ' + new Date().getHours()+ ':' + new Date().getMinutes());

}else {
  console.log('non ci sono elementi da creare');
}

 /* */

// qua sotto prove varie


//object literal
/*
const intents={
  nome: ['intent1','intent2','intent3'],
 domande: [
  [{words: ['pippo','plto','paperino']}],
  [{words: ['zia']}],
  [{words: ['padre']}],
 ],
 risposte:[ 
   [{risp: ['ok','bene','nok']}],
   [{risp: ['risposta1','risp2','risp3']}],
   [{risp: ['risposta14','risp5','risp6']}]
 ]
 };




const personliteral={
    name:"Vale",
    surname:"Adami",
    age:47

};
const obj = {
  
    name:"Vale",
	age:22,
  	xx:222,
  
  foo() {
    return 'bar';
  }
};
function Person(first, last, age, gender, interests) {
    this.name = {
       first : first,
       last : last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
    //Person.prototype.bio= function() {
    this.bio = function() {
      console.log(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
    };
    this.greeting = function() {
        console.log('Hi! I\'m ' + this.name.first + '.');
    };
  }


  class Person1 {
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
  }

  var p1=new Person('robi','robberts',23,'M','motor');
  p1.bio();
  p1.greeting();
  var p2=new Person1('pippo','pluto',21,'F','piante');
  p2.greeting();


  const intents={
 nome: ['i1','i2','i3'],
domande: [
 [{words: ['pippo','plto','paperino']}],
 [{words: 'pluto'}],
],
risposte:[ 
  [{risp: ['ok','bene','nok']}],
  [{risp: ['risposta1','risp2','risp3']}]
]
};
var q=intents.domande[0];

//console.log('nome intent ' + intents.nome[0] + ' con domande ' +intents.domande[0].words[0] + ' e risposte ' + intents.risposte[0]);

 intents.domande[3]=[{words: ['dio']}];
var d=intents.domande[3];
console.log('domande 3 ' + d[0].words[0]); */
/* associo alla struttura dati 
*/

 