const XLSX=require('xlsx') ;
class GestioneFileImport{
   
    constructor(path,nomeFoglio) {
     
        this.path = path;
        this.nomeFoglio=nomeFoglio;
        this.worksheet=undefined;
       /* this.worksheet=function leggiFileImport() {
            if ((this.path!='') || (this.nomeFoglio!='') ) 
            {
                var workbook = XLSX.readFile(this.path);
                var first_sheet_name = workbook.Sheets[this.nomeFoglio]; //var first_sheet_name = workbook.SheetNames[0];
                console.log('leggiFileImport del foglio '+ workbook.SheetNames[0]);
                this.worksheet=first_sheet_name;
                return this.worksheet;
            } else {
                console.log('file non trovato o nome foglio mancante');
                return undefined;
            }
        
        };*/
       
    }; //fine costruttore
    leggiFileImport() {
        if ((this.path!='') || (this.nomeFoglio!='') ) 
        {
            var workbook = XLSX.readFile(this.path);
            var first_sheet_name = workbook.Sheets[this.nomeFoglio]; //var first_sheet_name = workbook.SheetNames[0];
            console.log('leggiFileImport del foglio '+ workbook.SheetNames[0]);
            this.worksheet=first_sheet_name;
            return  this.worksheet;
        } else {
            console.log('file non trovato o nome foglio mancante');
            return undefined;
        }
    
    }
caricaContenuti(){
  
    var righe=XLSX.utils.sheet_to_json(this.worksheet); 
    console.log(' carico il contenuto del file, righe');
    return righe;

};

}

module.exports = GestioneFileImport;