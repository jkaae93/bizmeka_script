// ==UserScript==
// @name         Bizmeka monthly account report
// @namespace    http://jkaae93.github.io
// @version      0.1
// @description  Fucking monthly report
// @author       You
// @match        https://ezgroupware.bizmeka.com/groupware/approval/work/apprWorkDoc/createApprDocForm.do?topFormParentId=25842514&formParentId=25842514&formId=57830252&actionType=&sortColumn=&sortType=&linkType=&pageIndex=1&pagePerRecord=10&searchColumn=formName&searchWord=&pageIndex=1
// @icon         https://www.google.com/s2/favicons?domain=bizmeka.com
// @grant        none
// ==/UserScript==

var table = document.getElementById("multiTable0");
var cell = table.rows;
var input = document.createElement("input");

(function() {
    'use strict';

    var count = prompt("Please insert the total cells", "Please hear");
    addCells(count);
    initUpload();
})();


function addCells(count) {
   for(var i =1; i < table.rows.length-2; i++) {
      cell.item(i).cells.item(5).getElementsByTagName("button").item(0).click();
   }
   console.log(`clear default cells`);
   for(var j =0; j < count-1; j++) {
       cell.item(0).cells.item(5).getElementsByTagName("button").item(0).click();
   }
   console.log(`Add ${count} cells`);
}

function appendData() {
    for(var i =1; i < cell.length-2; i++) {
        // cell.item(i).cells.item(0).getElementsByTagName("input").item(0).value = info.date;
        // cell.item(i).cells.item(1).getElementsByTagName("input").item(0).value = info.title;
        // cell.item(i).cells.item(2).getElementsByTagName("input").item(0).value = info.body;
        // cell.item(i).cells.item(3).getElementsByTagName("input").item(0).value = info.card;
        // cell.item(i).cells.item(4).getElementsByTagName("input").item(0).value = info.cost;
    }
}

function initUpload() {
    input.type = 'file';
    // input.onload = ;
}

function uploadFile() {
    cell.item(cell.length-1).cells.item(1).appendChild(input);
    input.click();
}

function analyz() {
    var file = input.files.item(0);

}