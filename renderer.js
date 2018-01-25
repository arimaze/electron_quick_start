// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var $ = require('jQuery');
//require('popper.js/dist/umd/popper');
var bootstrap = require('bootstrap');
var respond = require('respond');
var XLSX = require('xlsx');

var fs = require('fs');
var dialog = require('electron').remote.dialog;


/* show a file-open dialog and read the first selected file */
// var o = dialog.showOpenDialog({ properties: ['openFile'] });
// var workbook = XLSX.readFile(o[0]);
var workbook = XLSX.readFile('./metadata.xlsx');
var ws = workbook.SheetNames[0];
//console.log(ws);
var address_of_cell = 'A1';
var desired_cell = ws[address_of_cell];
//console.log(desired_cell);
var desired_value = (desired_cell ? desired_cell.v : undefined);

var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_html(workbook.Sheets[sheet_name_list[0]]);
//console.log(xlData);
//var container = document.getElementById('tableau');
//container.innerHTML=xlData;

var worksheet = workbook.Sheets[sheet_name_list[0]];
var xlData = XLSX.utils.sheet_to_json(worksheet);
//console.log(xlData);
xlData.forEach(function(table,index) {
if(index>=1)
{
  console.log(xlData[index -1].Name);
    var section = table["SMSSection"];
    if(xlData[index - 1]["SMSSection"] == section)
    {
      var documentName = table["Name"];
      $("<div>"+documentName+"</div>").appendTo("footer");
    }
    else
    {
    $("<h2>"+section+"</h2>").appendTo("footer");
    console.log(section);
    }
      var documentName = table["Name"];
     $("<div>"+documentName+"</div>").appendTo("footer");

  }
  else{
      var section = table["SMSSection"];
      var documentName = table["Name"];
      $("<h2>"+section+"</h2>").appendTo("footer");
      $("<div>"+documentName+"</div>").appendTo("footer");
  }
  }
  );


//console.log(xlData);
// var headers = {};
//    var data = [];
//
// for(z in worksheet) {
//        if(z[0] === '!') continue;
//        //parse out the column, row, and value
//        var tt = 0;
//        for (var i = 0; i < z.length; i++) {
//            if (!isNaN(z[i])) {
//                tt = i;
//                break;
//            }
//        };
//        var col = z.substring(0,tt);
//        var row = parseInt(z.substring(tt));
//        var value = worksheet[z].v;
//
//        //store header names
//        if(row == 1 && value) {
//            headers[col] = value;
//            continue;
//        }
//
//        if(!data[row]) data[row]={};
//        data[row][headers[col]] = value;
//    }
//    data.shift();
//    data.shift();
//    console.log(data);


var mm = xlData.Name;
//$("<div>"+mm+"</div>").appendTo("footer");
//console.log($("body").html());
