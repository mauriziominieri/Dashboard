

var n_giorni_nel_mese,OBIETTIVO=0,flag=0;
var data,ufficio,brand,giorno,mese,currMese,currGiorno,brand,operatore;
var dataSet=[],dataSet1=[],dataSetGiorno=[],dataSetMese=[],obiettivi=[],columns=[];
var today = new Date();   //today = yyyy + '-' + mm + '-' + dd;


const URL1 = 'https://salesdashboard.it/dashboard/dashboard/report/ESTRAZIONE WIND.xlsx';   //con www da problemi di sicurezza
const URL = 'https://salesdashboard.it/dashboard/dashboard/report/ESTRAZIONE ENERGIA.xlsx';
//CREA GLI ARRAY DA PASSARE NELLE 3 FUNZIONI DI CREAZIONE (questa viene chiamata nel caso ho file xlsx)
function BindTable(jsondata, tableid) {//Function used to convert the JSON array to Html Table

  if(flag == 0)
      columns = BindTableHeader(jsondata, tableid); //Gets all the column headings of Excel
  else
      brand = "WIND";

  for (var i = 0; i < jsondata.length; i++) {
        // for (var colIndex = 0; colIndex < columns.length; colIndex++) {

    if(flag==0)
     brand = jsondata[i][columns[3]];

   if(jsondata[i][columns[1]]){
     ufficio = jsondata[i][columns[1]];
     giorno = jsondata[i][columns[0]].substr(0,2);
     mese = jsondata[i][columns[0]].substr(3,2);

    /* console.log("mese: "+mese);
           console.log("operatore: "+operatore);
     console.log("ufficio: "+ufficio);
     console.log("brand: "+brand);*/


            if(jsondata[i][columns[2]] == null){
           nome = "";
         cognome = "";
     }
           else{

                 operatore = jsondata[i][columns[2]].split(" ");

                  if(operatore[2]==nomeUffs){
                        nome = operatore[1];
                        cognome = operatore[0];
                     }
                     else {
                         nome = operatore[2];
                         cognome = operatore[0]+" "+operatore[1];
                     }
           }



     if(mese == currMese && ufficio == nomeUff)  {
      dataSet.push(nome+" "+cognome);
        dataSetMese.push(brand);
     }

      if(mese == currMese && giorno==currGiorno && ufficio == nomeUff) {
        dataSet1.push(nome+" "+cognome);
        dataSetGiorno.push(brand);
      }

        // }

    }

  }

  //console.log("energia: ");
  // console.log(dataSet);

  if(flag==0)
     ExportToTableByURL(URL1);
  else {
    createTableXLS(dataSet,dataSet1);
    createPieChartMeseXLS(dataSetMese);
    createPieChartGiornoXLS(dataSetGiorno);
  }
}




//PRENDE LE COLONNE VOLUTE NEI DATI JSON
function BindTableHeader(jsondata, tableid) {
     var columnSet = [];

     for (var i = 0; i < jsondata.length; i++) {
         var rowHash = jsondata[i];
         for (var key in rowHash) {
           //console.log("key: "+key);
           if(key == "Data creaz." || key == "Coordinatore CCeasy" || key == "Operatore CCeasy" || key == "Brand Energia"){
             if (rowHash.hasOwnProperty(key)) {
               if ($.inArray(key, columnSet) == -1) {
                 columnSet.push(key);

               }
             }
           }
         }
     }
     return columnSet;
}

/*FILE BY INPUT*/

//GESTISCE I FILE XLS O XLSX TRAMITE INPUT
/*
function ExportToTable() {
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;
  //console.log("FILE: "+$("#excelfile").val().toLowerCase());  //excelfile.val() è il percorso del mio file. Devo creare un oggetto file tramite url in modo che il val sia il mio percorso.

      //console.log("COSA SEI1: "+$("#excelfile"));
    //console.log("COSA SEI2: "+$("#excelfile")[0]);
    //console.log("COSA SEI3: "+$("#excelfile")[0].files[0]);

      if (regex.test($("#excelfile").val().toLowerCase())) {
          var xlsxflag = false; //Flag for checking whether excel is .xls format or .xlsx format
          if ($("#excelfile").val().toLowerCase().indexOf(".xlsx") > 0) {
              xlsxflag = true;
          }
          //Checks whether the browser supports HTML5
          if (typeof (FileReader) != "undefined") {
              var reader = new FileReader();


              reader.onload = function (e) {
                  var data = e.target.result;
                  //Converts the excel data in to object
                  if (xlsxflag) {
                      var workbook = XLSX.read(data, { type: 'binary' });
                  }
                  else {
                      var workbook = XLS.read(data, { type: 'binary' });
                  }
                  //Gets all the sheetnames of excel in to a variable
                  var sheet_name_list = workbook.SheetNames;

                  var cnt = 0; //This is used for restricting the script to consider only first sheet of excel
                  sheet_name_list.forEach(function (y) { //Iterate through all sheets
                      //Convert the cell value to Json
                      if (xlsxflag) {
            console.log("FILE XLSX");
                          var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                      }
                      else {
            console.log("FILE XLS");
                          var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);
                      }
                      if (exceljson.length > 0 && cnt == 0) {
                          BindTable(exceljson, '#exceltable');
                          cnt++;
                      }
                  });
                  $('#exceltable').show();
              }


              if (xlsxflag) {//If excel file is .xlsx extension than creates a Array Buffer from excel
                  reader.readAsArrayBuffer($("#excelfile")[0].files[0]);
              }
              else {
                  reader.readAsBinaryString($("#excelfile")[0].files[0]);

              }
          }
          else {
              alert("Sorry! Your browser does not support HTML5!");
          }
      }
      else {
          alert("Please upload a valid Excel file!");
      }
}*/


//per la lettura dei XLS



//mette un listener nell'elemento bottone "carica file", quando esso viene cambiato allora viene chiamata la funzione filePicked
/*$(function() {
  oFileIn = document.getElementById('excelfile');
  if(oFileIn.addEventListener) {
    oFileIn.addEventListener('change', filePicked, false);
  }
});
*/


//LEGGE UN FILE .XLS IN INPUT
/*
function filePicked(oEvent) {
  // Get The File From The Input
  var oFile = oEvent.target.files[0];

  console.log("oFile input:");
  console.log(oFile);

  var sFilename = oFile.name;

  console.log("oFile.name: "+sFilename);

  // Create A File Reader HTML5
  var reader = new FileReader();

  if (sFilename.toLowerCase().indexOf(".xlsx") > 0) {
    console.log("E' un file XLSX");

    ExportToTable();


  }
  else{
    console.log("E' un file XLS");


  // Ready The Event For When A File Gets Selected
  reader.onload = function(e) {
    var data = e.target.result;
    var cfb = XLS.CFB.read(data, {type: 'binary'});
    var wb = XLS.parse_xlscfb(cfb);
    // Loop Over Each Sheet
    wb.SheetNames.forEach(function(sheetName) {
      // Obtain The Current Row As CSV
      var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
      var data = XLS.utils.sheet_to_json(wb.Sheets[sheetName], {header:1});
      $.each(data, function( indexR, valueR ) {
        //var sRow = "<tr>";
        if(indexR > 1){
          $.each(data[indexR], function( indexC, valueC ) {


          if(valueC){
            if(indexC == col_data){
                valArr = valueC.split("/");
              mese = valArr[1];
              giorno = valArr[0];
            }

            if(indexC == col_uff && mese == 7)
              dataSet.push(valueC);

            if(indexC == col_uff && mese == 7  && giorno == 30)
              dataSet1.push(valueC);

            if(indexC == col_brand && mese == 7)
              dataSetMese.push(valueC);

            if(indexC == col_brand && mese == 7 && giorno == 30)
              dataSetGiorno.push(valueC);
          }
          });
        }

      });
    });

     createTableXLS(dataSet,dataSet1);
      createPieChartMeseXLS(dataSetMese);
    createPieChartGiornoXLS(dataSetGiorno);
  };

  // Tell JS To Start Reading The File.. You could delay this if desired
  reader.readAsBinaryString(oFile);
  }
}*/





/*FILE BY URL*/

var oFile,oFile1;

//FILE XLSX TRAMITE URL	(la prima volta verrà chiamata con il file energia.xlsx, la seconda con wind.xlsx)
$(document).ready(ExportToTableByURL(URL));
function ExportToTableByURL(url) {
//var regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)+([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;
var regex = /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/;

var request = new XMLHttpRequest();  //crea una richiesta http
request.open('POST',url, true);
request.setRequestHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8');    //setto una header alla mia richiesta di tipo xslx
request.responseType = 'blob';         //la risposta DEVE essere di tipo blob (dati che possono essere letti come testo o bit o convertiti in readablestream)

request.onload = function(e) {
if (this.status === 200) {    //andata a buon fine
  blob = this.response;

  if(window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, "energia.xlsx");
  }
  else{
    oFile = new File([blob], "energia.xlsx", {type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
    //console.log("oFile xlsx creato da zero:");
    //console.log(oFile);


      //if (regex.test(oFile.name.toLowerCase())) {
          var xlsxflag = false; //Flag for checking whether excel is .xls format or .xlsx format
          if (oFile.name.toLowerCase().indexOf(".xlsx") > 0) {
              xlsxflag = true;
          }
          //Checks whether the browser supports HTML5
          if (typeof (FileReader) != "undefined") {
              var reader = new FileReader();


              reader.onload = function (e) {
                  var data = e.target.result;
                  //Converts the excel data in to object
                  if (xlsxflag) {
                      var workbook = XLSX.read(data, { type: 'binary' });
                  }
                  else {
                      var workbook = XLS.read(data, { type: 'binary' });
                  }
                  //Gets all the sheetnames of excel in to a variable
                  var sheet_name_list = workbook.SheetNames;

                  var cnt = 0; //This is used for restricting the script to consider only first sheet of excel
                  sheet_name_list.forEach(function (y) { //Iterate through all sheets
                      //Convert the cell value to Json
                      if (xlsxflag) {
                          //console.log("file xlsx rilevato1!!!");
                          var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                      }
                      else {
                          var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);
                      }

                      if (exceljson.length > 0 && cnt == 0) {

            BindTable(exceljson, '#exceltable');
            if(flag == 0)
            flag=1;

            console.log(flag);
                          cnt++;
                      }
                  });
                  //$('#exceltable').show();
              }

              if (xlsxflag) {//If excel file is .xlsx extension than creates a Array Buffer from excel
        //console.log("file xlsx rilevato2!!!");
                 //reader.readAsArrayBuffer(blob[0].files[0]);
        reader.readAsArrayBuffer(oFile);
              }
              else {
                  reader.readAsBinaryString($("#excelfile")[0].files[0]);
              }
          }
          else {
              alert("Sorry! Your browser does not support HTML5!");
          }
      /*}
      else {
          alert("Please upload a valid Excel file!");
      }*/

          }
         }
      };
      request.send();

}

//Richiesta http del file XLS
var myurl = 'https://playsoluzioniecomunicazione.it/dashboard/report/energia.xls';  //con www da problemi
var myurl1 = 'https://playsoluzioniecomunicazione.it/dashboard/report/wind.xls';
var myurl2 = 'https://salesdashboard.it/dashboard/report/energia.xls';  //con www da problemi
var myurl3 = 'https://salesdashboard.it/dashboard/report/wind.xls';
var oFile,sFilename,flag=0;
//$(document).ready(getFileByURL(myurl2));
function getFileByURL(url){


var request = new XMLHttpRequest();  //crea una richiesta http
request.open('POST',url, true);
request.setRequestHeader('Content-Type', 'application/vnd.ms-excel; charset=UTF-8');    //setto una header alla mia richiesta
request.responseType = 'blob';         //la risposta DEVE essere di tipo blob (dati che possono essere letti come testo o bit o convertiti in readablestream)

request.onload = function(e) {
  if (this.status === 200) {    //andata a buon fine
    var blob = this.response;

    if(window.navigator.msSaveOrOpenBlob) {
     window.navigator.msSaveBlob(blob, "wind.xls");
    }
    else{
      oFile = new File([blob], "nome", {type:"application/vnd.ms-excel"});
      //console.log("oFile creato da zero:");
      //console.log(oFile);
      //if(flag==0){
        filePickedURL();
     // }
    }
   }
};
  request.send();
}



var col_data = 1;
var col_uff = 4;
var col_operat = 5;
var col_brand = 14;
var data,mese,giorno;
var dataSet = [],dataSet1=[],dataSetMese=[],dataSetGiorno=[];
//FILE XLS TRAMITE URL
function filePickedURL() {

  var reader = new FileReader();
  if (oFile.name.toLowerCase().indexOf(".xlsx") > 0) {
    console.log("E' un file XLSX");
    ExportToTable();
  }
  else{
    //console.log("E' un file XLS");
  // Ready The Event For When A File Gets Selected
  reader.onload = function(e) {
    var data = e.target.result;
    var cfb = XLS.CFB.read(data, {type: 'binary'});
    var wb = XLS.parse_xlscfb(cfb);
    // Loop Over Each Sheet
    wb.SheetNames.forEach(function(sheetName) {
      // Obtain The Current Row As CSV
      var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
      var data = XLS.utils.sheet_to_json(wb.Sheets[sheetName], {header:1});
      $.each(data, function( indexR, valueR ) {
        //var sRow = "<tr>";
        if(indexR > 1){
          $.each(data[indexR], function( indexC, valueC ) {


          if(valueC){
            if(indexC == col_data){
                valArr = valueC.split("/");
              mese = valArr[1];
              giorno = valArr[0];
            }

            if(indexC == col_uff && mese == currMese)
              dataSet.push(valueC);

            if(indexC == col_uff && mese == currMese  && giorno == 30)
              dataSet1.push(valueC);

            if(indexC == col_brand && mese == currMese)
              dataSetMese.push(valueC);

            if(indexC == col_brand && mese == currMese && giorno == 30)
              dataSetGiorno.push(valueC);
          }
          });
        }

      });
    });
    //console.log(flag);
    if(flag==0){
      flag=1;
      getFileByURL(myurl3)
    }
    else{
      createTableXLS(dataSet,dataSet1);
        createPieChartMeseXLS(dataSetMese);
      createPieChartGiornoXLS(dataSetGiorno);
    }
  };

  // Tell JS To Start Reading The File.. You could delay this if desired
  reader.readAsBinaryString(oFile);
  }
}




var totMese=0,totGiorno=0;
//CREA LA TABELLA AVENDO L'ARRAY DEGLI UFFICI DEL MESE, E DEL GIORNO
function createTableXLS(dataSet,dataSet1){

var dataSetOff = [];
var ufficiMese = [], n_ufficiMese = [], prev;


dataSet.sort();

for ( var i = 0; i < dataSet.length; i++ ) {
  if ( dataSet[i] !== prev ) {
    ufficiMese.push(dataSet[i]);
    n_ufficiMese.push(1);
    totMese++;
  } else {
    n_ufficiMese[n_ufficiMese.length-1]++;
    totMese++;
  }
  prev = dataSet[i];
}

var ufficiGiorno = [], n_ufficiGiorno = [],  n_ufficiGiorno2 = [], prev1;
var k=0;

dataSet1.sort();

for ( var i = 0; i < dataSet1.length; i++ ) {
  if ( dataSet1[i] !== prev1 ) {
    ufficiGiorno.push(dataSet1[i]);
    n_ufficiGiorno.push(1);
    totGiorno++;
  } else {
    n_ufficiGiorno[n_ufficiGiorno.length-1]++;
    totGiorno++;
  }
  prev1 = dataSet1[i];
}

for(var i=0;i<ufficiMese.length;i++){
  if(ufficiMese[i] !== ufficiGiorno[k])
    n_ufficiGiorno2[i] = 0;
  else
    n_ufficiGiorno2[i] = n_ufficiGiorno[k++];
}

for(var i=0;i<ufficiMese.length;i++){
  dataSetOff[i] = [ufficiMese[i],n_ufficiGiorno2[i],n_ufficiMese[i]];
}



var myTable = $('#dataTable').dataTable();
myTable.dataTable( {
  data: dataSetOff,
  destroy: true,   //eliminiamo la precedente tabella, molto importante
  paging: false,
  columnDefs: [     //larghezza colonne
    { width: "50%", targets: 0 },
    { width: "25%", targets: 1 },
    { width: "25%", targets: 2 },
  ],
  scrollY: $(window).height()-300,
  scrollX: true,
  //scrollCollapse: false,
  language: {
    //info: "_START_ da _END_ tot: _TOTAL_",
    info: "Risultati totali: _TOTAL_",
    infoEmpty: "Nessun risultato",
            search: "Cerca:"
  },

  columns: [
    { title: "Forza vendita" },
    { title: "Ins. Giorno" },
    { title: "Ins. Mese" }
  ],
  order: [[0, 'asc']],
});

  //quando sarà caricata mostro l'intera pagina
    showPage();
    $('#dataTable').DataTable().columns.adjust();

}
var energieMese = [],energieGiorno = [], n_energieM = [],n_energie2=[],n_energieG = [],obiettivi2=[];
var myPieChart;
//CREA IL PIECHART MESE AVENDO L'ARRAY DEI BRAND DEL MESE
function createPieChartMeseXLS(dataSet){


var mese,prev;
var ufficio;

if(flag!=2){

  dataSet.sort();

for ( var i = 0; i < dataSet.length; i++ ) {
  if ( dataSet[i] !== prev ) {
    energieMese.push(dataSet[i]);
    n_energieM.push(1);
  }
  else
    n_energieM[n_energieM.length-1]++;

  prev = dataSet[i];
}
}


var z=0;


console.log("energiemese: "+energieMese);
console.log("n_energie: "+n_energieM);


  OBIETTIVO=0;
for(var i=0;i<energieMese.length;i++){

      if(energieMese[i]=="ENI")
        obiettivi2[i] = obiettivi[0];
      else if(energieMese[i]=="HERACOMM")
        obiettivi2[i] = obiettivi[1];
       else if(energieMese[i]=="IBERDROLA")
        obiettivi2[i] = obiettivi[2];
       else if(energieMese[i]=="SINERGY")
        obiettivi2[i] = obiettivi[3];
       else if(energieMese[i]=="WIND")
        obiettivi2[i] = obiettivi[4];

      OBIETTIVO = OBIETTIVO + obiettivi2[i];
}


  obiettivi = obiettivi2;



 var colori = ["text-primary","text-warning","text-info","text-success","text-secondary","text-danger"];
 var coloriBar = ["bg-primary","bg-warning","bg-info","bg-success","bg-secondary","bg-danger"];

console.log("OBIETTIVO: "+OBIETTIVO);


    $('#totMese').html("");
$('#totMese').append(totMese+' su '+OBIETTIVO);
  $('#totGiorno').html("");
$('#totGiorno').append(totGiorno+' su '+(OBIETTIVO/n_giorni_nel_mese).toFixed(0));




$('#cardMese').html("");
$('#cardMese').append('<h4><div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated '+coloriBar[5]+'" role="progressbar" style="width: '+(totMese/OBIETTIVO*100).toFixed(1)+'%;" aria-valuenow="'+(totMese/OBIETTIVO*100).toFixed(1)+'" aria-valuemin="0" aria-valuemax="100">'+(totMese/OBIETTIVO*100).toFixed(1)+'%</div></div> </h4><br>');  //inserisco i dati nella card

   for(var i=0;i<energieMese.length;i++){
       //$('#pieLegend').append('<span class="mr-2"> <i class="fas fa-circle '+colori[i]+'"></i> '+energie[i]+'</span>');
       $('#cardMese').append('<h4>'+energieMese[i]+': '+n_energieM[i]+' su '+obiettivi[i]+'<div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated '+coloriBar[i]+'" role="progressbar" style="width: '+(n_energieM[i]/obiettivi[i]*100).toFixed(1)+'%;" aria-valuenow="'+(n_energieM[i]/obiettivi[i]*100).toFixed(1)+'" aria-valuemin="0" aria-valuemax="100">'+(n_energieM[i]/obiettivi[i]*100).toFixed(1)+'%</div></div> </h4>');  //inserisco i dati nella card
   }



$('#dashTitle').html("Sales Dashboard (esempio oggi: "+currGiorno+"/"+currMese+"/2020) - "+nomeUff);
//$('#dashTitle').append('&nbsp;&nbsp;OBIETTIVI:&nbsp;&nbsp; brand: '+obiettivi[0]+','+obiettivi[1]+','+obiettivi[2]+','+obiettivi[3]+','+obiettivi[4] +'&nbsp;&nbsp;&nbsp;mese: '+OBIETTIVO);

//console.log(obiettivi);

var pieMese = document.getElementById("myPieChartMese").getContext('2d');
myPieChart = new Chart(pieMese, {
      //type: 'doughnut',
  type: 'pie',
      data: {
        labels: energieMese,
    destroy: true,   //eliminiamo la precedente tabella, molto importante
        datasets: [{
          data: n_energieM,
          backgroundColor: ['#4e73df', '#f0ad4e', '#36b9cc','#1cc88a', '#36b9rc', '#1cc81a','#4e73bf', '#1cc83a', '#36b9lc'],
          hoverBackgroundColor: ['#2e59d9', '#ffa500', '#2c9faf','#17a673', 'black', '#ffa500','#2e59d9', '#17a673', '#2c9faf'],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
    position: 'bottom',
    labels: {
    padding: 20,
    boxWidth: 20
    }
      },
       // cutoutPercentage: 50,   //spessore anello
     plugins: {
    datalabels: {
    formatter: (value, ctx) => {
      let sum = 0;
      let dataArr = ctx.chart.data.datasets[0].data;
      dataArr.map(data => {
      sum += data;
      });
      let percentage = (value * 100 / sum).toFixed(1) + "%";
      if(value==0)
        percentage="";
      return percentage;
    },
    color: 'white',
    labels: {
      title: {
      font: {
        size: '25'
      }
      }
    }
    }
      }
      },
});
}

//CREA IL PIECHART GIORNO AVENDO L'ARRAY DEI BRAND DEL GIORNO
function createPieChartGiornoXLS(dataSet){

var mese,giorno,prev;
var k=0;

if(flag!=2){
dataSet.sort();

for ( var i = 0; i < dataSet.length; i++ ) {
  if ( dataSet[i] !== prev ) {
    energieGiorno.push(dataSet[i]);
    n_energieG.push(1);
  } else {
    n_energieG[n_energieG.length-1]++;
  }
  prev = dataSet[i];
}

  for(var i=0;i<energieMese.length;i++){
  if(energieMese[i] !== energieGiorno[k])
    n_energie2[i] = 0;
  else
    n_energie2[i] = n_energieG[k++];
}
}

   var colori = ["text-primary","text-warning","text-info","text-success","text-secondary","text-danger"];
 var coloriBar = ["bg-primary","bg-warning","bg-info","bg-success","bg-secondary","bg-danger"];

$('#cardGiorno').html("");
$('#cardGiorno').append('<h4><div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated '+coloriBar[5]+'" role="progressbar" style="width: '+(totGiorno/(OBIETTIVO/n_giorni_nel_mese)*100).toFixed(1)+'%;" aria-valuenow="'+(totGiorno/(OBIETTIVO/n_giorni_nel_mese)*100).toFixed(1)+'" aria-valuemin="0" aria-valuemax="100">'+(totGiorno/(OBIETTIVO/n_giorni_nel_mese)*100).toFixed(1)+'%</div></div> </h4><br>');  //inserisco i dati nella card


   for(var i=0;i<energieMese.length;i++){
       //$('#pieLegendGiorno').append('<span class="mr-2"> <i class="fas fa-circle '+colori[i]+'"></i> '+energie[i]+'</span>');
  $('#cardGiorno').append('<h4>'+energieMese[i]+': '+n_energie2[i]+' su '+(obiettivi[i]/n_giorni_nel_mese).toFixed(0)+'<div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated '+coloriBar[i]+'" role="progressbar" style="width: '+(n_energie2[i]/(obiettivi[i]/n_giorni_nel_mese)*100).toFixed(1)+'%;" aria-valuenow="'+(n_energie2[i]/(obiettivi[i]/n_giorni_nel_mese)*100).toFixed(1)+'" aria-valuemin="0" aria-valuemax="100">'+(n_energie2[i]/(obiettivi[i]/n_giorni_nel_mese)*100).toFixed(1)+'%</div></div> </h4>');  //inserisco i dati nella card
   }

var pieGiorno = document.getElementById("myPieChartGiorno");
    var myPieChart = new Chart(pieGiorno, {
      type: 'doughnut',
  //type: 'pie',
      data: {
        labels: energieMese,
        datasets: [{
          data: n_energie2,
         backgroundColor: ['#4e73df', '#f0ad4e', '#36b9cc','#1cc88a', '#36b9rc', '#1cc81a','#4e73bf', '#1cc83a', '#36b9lc'],
          hoverBackgroundColor: ['#2e59d9', '#ffa500', '#2c9faf','#17a673', 'black', '#ffa500','#2e59d9', '#17a673', '#2c9faf'],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
    position: 'bottom',
    labels: {
    padding: 20,
    boxWidth: 20
    }
      },
      cutoutPercentage: 30,   //spessore anello
     plugins: {
    datalabels: {
    formatter: (value, ctx) => {
      let sum = 0;
      let dataArr = ctx.chart.data.datasets[0].data;
      dataArr.map(data => {
      sum += data;
      });
      let percentage = (value * 100 / sum).toFixed(1) + "%";
      if(value==0)
        percentage="";
      return percentage;
    },
    color: 'white',
    labels: {
      title: {
      font: {
        size: '25'
      }
      }
    }
    }
      }
      },
   });
}









//<!--CSV FILE-->

/*
var col_data = 0;
var col_uff = 1;
var col_operat = 2;
var col_brand = 3;

$(document).ready(createDashboard());

function createDashboard()
{
var obiettivo = 50;
$('#dashTitle').append('&nbsp;&nbsp;&nbsp;&nbsp;Obiettivo: '+obiettivo);

//prendo il .csv
csv = $.ajax({
    type:"GET",
    dataType:"text",
    url:"energia.csv",
    cache:false
});

csv.done(function(data){

console.log(data);
//split on new line
var dataArr = data.split("\n"); //il file lo divido in righe in base al "\n"

//console.log(dataArr);
dataArr.shift();  //cancello la prima riga della tabella
dataArr.shift();  //cancello la seconda riga della tabella

//ALL FUNCTIONS
createTable(dataArr)
createPieChartMese(dataArr,obiettivo)
createPieChartGiorno(dataArr,obiettivo);
});

// Run script if request fails
csv.fail(function() {
   console.log('A failure ocurred');
});
}



function createTable(dataArr){
//split on new line
var mese,giorno;
var dataSet = [],dataSet1 = [],dataSetFinal = [];

//for each line in array
$.each(dataArr,function(){       //per ogni riga
  valArr = this.split(";");   //prendo valore per valore in base al ;

  mese = valArr[col_data].substr(2, 1);
  giorno = valArr[col_data].substr(0, 1);

  if(mese == 7)
    dataSet.push(valArr[col_uff]);      //dataset conterrà tutti i dati in formato array di stringhe di luglio

  if(mese == 7 && giorno==5)
    dataSet1.push(valArr[col_uff]);      //dataset conterrà tutti i dati in formato array di stringhe del 5 luglio
});

var ufficiMese = [], n_ufficiMese = [], prev;
var totMese=0;

dataSet.sort();

for ( var i = 0; i < dataSet.length; i++ ) {
  if ( dataSet[i] !== prev ) {
    ufficiMese.push(dataSet[i]);
    n_ufficiMese.push(1);
    totMese++;
  } else {
    n_ufficiMese[n_ufficiMese.length-1]++;
    totMese++;
  }
  prev = dataSet[i];
}

var ufficiGiorno = [], n_ufficiGiorno = [],  n_ufficiGiorno2 = [], prev1;
var k=0,totGiorno=0;

dataSet1.sort();

for ( var i = 0; i < dataSet1.length; i++ ) {
  if ( dataSet1[i] !== prev1 ) {
    ufficiGiorno.push(dataSet1[i]);
    n_ufficiGiorno.push(1);
    totGiorno++;
  } else {
    n_ufficiGiorno[n_ufficiGiorno.length-1]++;
    totGiorno++;
  }
  prev1 = dataSet1[i];
}

for(var i=0;i<ufficiMese.length;i++){
  if(ufficiMese[i] !== ufficiGiorno[k])
    n_ufficiGiorno2[i] = 0;
  else
    n_ufficiGiorno2[i] = n_ufficiGiorno[k++];
}

for(var i=0;i<ufficiMese.length;i++){
  dataSetFinal[i] = [ufficiMese[i],n_ufficiGiorno2[i],n_ufficiMese[i]];
}

$('#totMese').append(totMese);
$('#totGiorno').append(totGiorno);

var myTable = $('#dataTable').dataTable();
myTable.dataTable( {
  data: dataSetFinal,
  destroy: true,   //eliminiamo la precedente tabella, molto importante
  paging: false,
  scrollY: $(window).height()-390,
  scrollX: true,
  //scrollCollapse: false,
  language: {
    //info: "_START_ da _END_ tot: _TOTAL_",
    info: "Risultati totali: _TOTAL_",
    infoEmpty: "Nessun risultato"
  },
  columns: [
    { title: "Forza vendita" },
    { title: "Ins. Giorno" },
    { title: "Ins. Mese" }
  ],
  order: [[0, 'asc']],
});
}

function createPieChartMese(dataArr,obiettivo){

var dataSet = [],energie = [],n_energie = [];
var mese,prev;


    $.each(dataArr,function(){       //per ogni riga
            valArr = this.split(";");   //prendo valore per valore in base al ;
            mese = valArr[col_data].substr(2, 1);

            if(mese == 7)  //considero che voglio solo i dati di luglio
                dataSet.push(valArr[col_brand]);    //vado a prendere solo la colonna voluta
    });

  dataSet.sort();

for ( var i = 0; i < dataSet.length; i++ ) {
  if ( dataSet[i] !== prev ) {
    energie.push(dataSet[i]);
    n_energie.push(1);
  }
  else
    n_energie[n_energie.length-1]++;

  prev = dataSet[i];
}

   var colori = ["text-primary","text-warning","text-info","text-success","text-secondary"];
 var coloriBar = ["bg-primary","bg-warning","bg-info","bg-success","bg-secondary"];
   for(var i=0;i<energie.length;i++){
       //$('#pieLegend').append('<span class="mr-2"> <i class="fas fa-circle '+colori[i]+'"></i> '+energie[i]+'</span>');
       $('#cardMese').append('<h2>'+energie[i]+'<div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated '+coloriBar[i]+'" role="progressbar" style="width: '+(n_energie[i]/obiettivo*100).toFixed(1)+'%;" aria-valuenow="'+(n_energie[i]/obiettivo*100).toFixed(1)+'" aria-valuemin="0" aria-valuemax="100">'+(n_energie[i]/obiettivo*100).toFixed(1)+'%</div></div> </h2> <br>');  //inserisco i dati nella card

   }


var pieMese = document.getElementById("myPieChartMese").getContext('2d');
var myPieChart = new Chart(pieMese, {
      //type: 'doughnut',
  type: 'pie',
      data: {
        labels: energie,
        datasets: [{
          data: n_energie,
          backgroundColor: ['#4e73df', '#f0ad4e', '#36b9cc','#1cc88a', '#1cc81a', '#36b9rc','#4e73bf', '#1cc83a', '#36b9lc'],
          hoverBackgroundColor: ['#2e59d9', '#ffa500', '#2c9faf','#17a673', '#17a673', '#2c9faf','#2e59d9', '#17a673', '#2c9faf'],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
    position: 'bottom',
    labels: {
    padding: 20,
    boxWidth: 20
    }
      },
       // cutoutPercentage: 50,   //spessore anello
     plugins: {
    datalabels: {
    formatter: (value, ctx) => {
      let sum = 0;
      let dataArr = ctx.chart.data.datasets[0].data;
      dataArr.map(data => {
      sum += data;
      });
      let percentage = (value * 100 / sum).toFixed(1) + "%";
      return percentage;
    },
    color: 'white',
    labels: {
      title: {
      font: {
        size: '25'
      }
      }
    }
    }
      }
      },
});
}


function createPieChartGiorno(dataArr,obiettivo){

var dataSet = [],energie = [],n_energie = [];
var mese,giorno,prev;


    $.each(dataArr,function(){       //per ogni riga
            valArr = this.split(";");   //prendo valore per valore in base al ;
            mese = valArr[col_data].substr(2, 1);
            giorno = valArr[col_data].substr(0, 1);

            if(mese == 7 && giorno == 5)  //considero che voglio solo i dati del 5 luglio
                dataSet.push(valArr[col_brand]);    //vado a prendere solo la colonna voluta, le energie
    });

dataSet.sort();

for ( var i = 0; i < dataSet.length; i++ ) {
  if ( dataSet[i] !== prev ) {
    energie.push(dataSet[i]);
    n_energie.push(1);
  } else {
    n_energie[n_energie.length-1]++;
  }
  prev = dataSet[i];
}

   var colori = ["text-primary","text-warning","text-info","text-success","text-secondary"];
 var coloriBar = ["bg-primary","bg-warning","bg-info","bg-success","bg-secondary"];

   for(var i=0;i<energie.length;i++){
       //$('#pieLegendGiorno').append('<span class="mr-2"> <i class="fas fa-circle '+colori[i]+'"></i> '+energie[i]+'</span>');
  $('#cardGiorno').append('<h2>'+energie[i]+'<div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated '+coloriBar[i]+'" role="progressbar" style="width: '+(n_energie[i]/obiettivo*100).toFixed(1)+'%;" aria-valuenow="'+(n_energie[i]/obiettivo*100).toFixed(1)+'" aria-valuemin="0" aria-valuemax="100">'+(n_energie[i]/obiettivo*100).toFixed(1)+'%</div></div> </h2> <br>');  //inserisco i dati nella card
   }

var pieGiorno = document.getElementById("myPieChartGiorno");
    var myPieChart = new Chart(pieGiorno, {
      //type: 'doughnut',
  type: 'pie',
      data: {
        labels: energie,
        datasets: [{
          data: n_energie,
          backgroundColor: ['#4e73df', '#f0ad4e', '#36b9cc','#1cc88a', '#1cc81a', '#36b9rc','#4e73bf', '#1cc83a', '#36b9lc'],
          hoverBackgroundColor: ['#2e59d9', '#ffa500', '#2c9faf','#17a673', '#17a673', '#2c9faf','#2e59d9', '#17a673', '#2c9faf'],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
    position: 'bottom',
    labels: {
    padding: 20,
    boxWidth: 20
    }
      },
       // cutoutPercentage: 50,   //spessore anello
     plugins: {
    datalabels: {
    formatter: (value, ctx) => {
      let sum = 0;
      let dataArr = ctx.chart.data.datasets[0].data;
      dataArr.map(data => {
      sum += data;
      });
      let percentage = (value * 100 / sum).toFixed(1) + "%";
      return percentage;
    },
    color: 'white',
    labels: {
      title: {
      font: {
        size: '25'
      }
      }
    }
    }
      }
      },
   });
}*/


function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("mainDiv").style.display = "block";
}

function isNumberKey(evt)
{
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57))
    return false;
  return true;
}


//ENI - HERACOMM - IBERDROLA - SINERGY - WIND
function setObj() //modal
{
    obiettivi[0] = document.getElementById('inputEni').valueAsNumber;
    obiettivi[1] = document.getElementById('inputHeracomm').valueAsNumber;
    obiettivi[2] = document.getElementById('inputIberdrola').valueAsNumber;
    obiettivi[3] = document.getElementById('inputSinergy').valueAsNumber;
    obiettivi[4] = document.getElementById('inputWind').valueAsNumber;

    sendMyData(obiettivi[0],obiettivi[1],obiettivi[2],obiettivi[3],obiettivi[4]);

    flag=2;
    createPieChartMeseXLS(dataSetMese);
    createPieChartGiornoXLS(dataSetGiorno);
}



function getData() {

  console.log("GET DATA...");

/*
   //var dd = String(today.getDate()).padStart(2, '0');
   var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
   //var yyyy = today.getFullYear();

   switch(Number(mm)){  //ovviamente saranno validi nell'anno corrente
     case 1: n_giorni_nel_mese = 21; break;
     case 2: n_giorni_nel_mese = 20; break;
     case 3: n_giorni_nel_mese = 22; break;
     case 4: n_giorni_nel_mese = 21; break;
     case 5: n_giorni_nel_mese = 20; break;
     case 6: n_giorni_nel_mese = 21; break;
     case 7: n_giorni_nel_mese = 23; break;
     case 8: n_giorni_nel_mese = 10; break;
     case 9: n_giorni_nel_mese = 22; break;
     case 10: n_giorni_nel_mese = 22; break;
     case 11: n_giorni_nel_mese = 21; break;
     case 12: n_giorni_nel_mese = 21; break;
     default: n_giorni_nel_mese = -1; break;
   }
 */
  /*$.ajax                        //obiettivi presi da database
    url: '../getObiettivi.php',
    type: 'GET',
    dataType: 'JSON',
    success: function(response){
        console.log(response);

        var len = response.length;
        var eni,heracomm,iberdrola,sinergy,wind;

        for(i=0; i<len; i++){
             eni = Math.floor(response[i].eni);

             heracomm = Number(response[i].heracomm);
             iberdrola = Number(response[i].iberdrola);
             sinergy = Number(response[i].sinergy);
             wind = Number(response[i].wind);
        }

           obiettivi[0] = eni;
           obiettivi[1] = heracomm;
           obiettivi[2] = iberdrola;
           obiettivi[3] = sinergy;
           obiettivi[4] = wind;


    },
    error: function(xhr) {
        console.log(xhr);
    }
  });*/






  // A MANO, GIUSTO PER PROVA
    obiettivi[0] = 450;
    obiettivi[1] = 250;
    obiettivi[2] = 500;
    obiettivi[3] = 350;
    obiettivi[4] = 600;

    currMese = 7;
    currGiorno = 17;
    n_giorni_nel_mese = 22;


}


function sendMyData(eni,heracomm,iberdrola,sinergy,wind)
{
      console.log("SEND DATA...");


        /*  $.ajax({
      url: "../sendObiettivi.php",
      type: "POST", //send it through get method
      data: {
        date: today.getDate(),
        eni: eni,
        heracomm: heracomm,
        iberdrola: iberdrola,
        sinergy: sinergy,
        wind: wind
      },
      success: function(response) {
        console.log(response);
        console.log("dati inviati");
      },
      error: function(xhr) {
          console.log(xhr);
      }
    });*/
}
