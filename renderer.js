// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var $ = require('jQuery');
//require('popper.js/dist/umd/popper');
var bootstrap = require('bootstrap');
var respond = require('respond');
var XLSX = require('xlsx');

var fs = require('fs');
const path = require('path');
var dialog = require('electron').remote.dialog;



//var workbook = XLSX.readFile('./metadata.xlsx');
//var worksheet = workbook.Sheets[sheet_name_list[0]];
//var xlData = XLSX.utils.sheet_to_json(worksheet);
//console.log(xlData);
// xlData.forEach(function(table,index) {
// if(index>=1)
// {
// //  console.log(xlData[index -1].Name);
//     var section = table["SMSSection"];
//     if(xlData[index - 1]["SMSSection"] == section)
//     {
//       var documentName = table["Name"];
//       $("<div>"+documentName+"</div>").appendTo("footer");
//     }
//     else
//     {
//     $("<h2>"+section+"</h2>").appendTo("footer");
//     //console.log(section);
//     }
//       var documentName = table["Name"];
//      $("<div>"+documentName+"</div>").appendTo("footer");
//
//   }
//   else{
//       var section = table["SMSSection"];
//       var documentName = table["Name"];
//       $("<h2>"+section+"</h2>").appendTo("footer");
//       $("<div>"+documentName+"</div>").appendTo("footer");
//   }
//   }
//   );



function filewalker(dir, done) {
    let results = [];

    fs.readdir(dir, function(err, list) {
        if (err) return done(err);

        var pending = list.length;

        if (!pending) return done(null, results);

        list.forEach(function(file,index){
           var itemName = file;

            file = path.resolve(dir, file);

            fs.stat(file, function(err, stat){
                // If directory, execute a recursive call
                if (stat && stat.isDirectory()) {
                    // Add directory to array [comment if you need to remove the directories from the array]
                  // results.push(file);
          //  $('<h3>'+itemName+"</h3>").appendTo("footer");
                    filewalker(file, function(err, res){

                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                }
                else {
                    results.push(file);
                    if(index>=1){
                    var previous = path.resolve(dir,list[index -1]);

                    //console.log(previous);
if(path.basename(path.dirname(file)) == path.basename(path.dirname(previous)) ){
     $("<div>"+itemName+"</div>").appendTo("footer");
}
else {
  $("<h3>"+path.basename(path.dirname(file))+"</h3>").appendTo("footer");
        $("<div>"+itemName+"</div>").appendTo("footer");
}
}
else {
  $("<h3>"+path.basename(path.dirname(file))+"</h3>").appendTo("footer");
     $("<div>"+itemName+"</div>").appendTo("footer");
}

                if (!--pending) done(null, results);
                }
            });
        });
    });
};

filewalker("c:/opentext", function(err, data){
    if(err){
        throw err;
    }
    // ["c://some-existent-path/file.txt","c:/some-existent-path/subfolder"]
  //  console.log(data);
     $("<div>test</div>").appendTo("footer");
});
