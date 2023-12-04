// ==UserScript==
// @name         Bizmeka monthly account report
// @namespace    http://jkaae93.github.io
// @version      0.1
// @description  Fucking monthly report
// @author       You
// @match        https://ezgroupware.bizmeka.com/groupware/approval/work/apprWorkDoc/createApprDocForm.do?topFormParentId=91738339&formParentId=91738339&formId=92263467&actionType=&sortColumn=&sortType=&linkType=&pageIndex=1&pagePerRecord=10&searchColumn=formName&searchWord=&pageIndex=1
// @icon         https://www.google.com/s2/favicons?domain=bizmeka.com
// @require http://code.jquery.com/jquery-3.4.1.min.js

// ==/UserScript==

var table = document.getElementById("multiTable0");
var cell = table.rows;
var input = document.createElement("input");
var csvFile;
var clicked = false;

const option = {
  maximumFractionDigits: 0
};

(function() {
    'use strict';
    initUpload();

    document.getElementById("csv_uploader").addEventListener('change',function(e) {
        console.log("uploaded");
        upload(input.files.item(0) || e.target.files);
        insertAccount();
    });
})();

function insertAccount() {
    var acc = document.getElementById("multiTable1");
    var acr = acc.rows;
    var aci = acr.item(1).getElementsByTagName('td');
    for(var j =0; j < 3; j++) {
        aci.item(j).getElementsByTagName('input').item(0).value = '-';
    }
}


function addCells(csv) {
    var count = csv.length;
    for(var j =0; j < count+1; j++) {

        if(j > 1) {
            // Add button
           cell.item(0).cells.item(5).getElementsByTagName("button").item(0).click();
        }
        if(j > 0) {
            console.log(`Added ${j}th cells`);
            var element = cell.item(j).cells;
            var i = j-1;
            /// date
            element.item(0).getElementsByTagName('input').item(0).value = csv[i].date;
            /// name
            element.item(1).getElementsByTagName('input').item(0).value = csv[i].name;
            /// description
            element.item(2).getElementsByTagName('input').item(0).value = parseData(csv[i]);
            /// card
            element.item(3).getElementsByTagName('input').item(0).value = appendZero(csv[i].card);
            /// price
//            element.item(4).getElementsByTagName('input').item(0).value = parseInt(csv[i].cost);
            console.log(csv[i].name + ': '+csv[i].cost);
             var costCell = element.item(4).getElementsByTagName('input').item(0);
            costCell.value = parseInt(csv[i].cost);
            costCell.dispatchEvent((new KeyboardEvent('keyup',{'key':13})));
            element.item(4).getElementsByTagName('input').item(0).value = costCell.value;
            if(j == count) {
                costCell.dispatchEvent((new KeyboardEvent('keyup',{'key':32})));
                console.log('last');
            }

        }
    }
}

function appendZero(number) {
    if(number.length == 3) {
        return `0${number}`;
    } else {
        return number;
    }
}

function appendData() {
    for(var i =1; i < cell.length-2; i++) {
    }
}

function initUpload() {
    input.type = 'file';
    input.id = 'csv_uploader';
    console.log("initUpload");
    cell.item(cell.length-1).cells.item(1).appendChild(input);
    for (let i = 1; i < cell.length; i++) {
        var btn = cell[i].cells.item(5).getElementsByTagName("button");
        if(btn.item(0) != null) btn.item(0).click();
    }
}

  //업로드 함수
function upload(file) {
    console.log(file);
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;

        if (typeof (FileReader) != "undefined") {
            const reader = new FileReader();
            reader.onload = function (e) {
                csvFile = null;
                console.log("Raw File");
                console.log(e.target.result);
                let lines=e.target.result.split('\n');
                lines[0] = lines[0].replaceAll(' ','')//빈 공간 삭제하기
                lines[0] = lines[0].replaceAll('\r','')
                let result = [];
                let headers=lines[0].split(",");

                for(let i=1;i<lines.length;i++){
                    let obj = {};
                    let currentline=lines[i].split(",");
                    console.log(currentline);
                    for(let j=0;j<headers.length;j++){
                        if(currentline.length > 0) obj[headers[j]] = currentline[j];
                    }
                    result.push(obj);
                }

                //return result; //JavaScript 객체반환
                console.log("After JSON Conversion");

                console.log(JSON.stringify(result));
                addCells(result);
                return JSON.stringify(result); //JSON
            }
            reader.readAsText(file);
        } else {
            alert("This browser does not support HTML5.");
        }
}

function parseData(data) {
    if(data.memo.length > 1) return `[${data.memo}: ] ${data.type}`;
    return `${data.type}`;
}
