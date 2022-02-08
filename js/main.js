'use strict';


var gBoard;
var gBoardLength = 2;
var gBoardSize = gBoardLength ** 2;
var gCount = 1;
var gElTimer;
var gIntervalId = null;


function init() {
    gBoardSize = gBoardLength ** 2;
    gElTimer = document.querySelector('.timer');
    gBoard = creatTable();
}

function createShuffelNums() {
    var num = [];
    for (var i = 1; i <= gBoardSize; i++) {
        num.push(i);
    }
    shuffle(num);
    function shuffle(items) {
        var randIdx, keep, i;
        for (i = items.length - 1; i > 0; i--) {
            randIdx = getRandomInt(0, items.length - 1);

            keep = items[i];
            items[i] = items[randIdx];
            items[randIdx] = keep;
        }
        return items;
    }
    return num;
}

function creatTable() {
    var randomNums = createShuffelNums();
    var strHTML = '';
    for (var i = 0; i < gBoardLength; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gBoardLength; j++) {
            var currNum = randomNums.pop();
            strHTML += `<td onclick="cellClicked(${currNum},this)">${currNum}</td>`;
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function cellClicked(currNum, elBtn) {
    console.log(currNum);

    if (currNum !== gCount) return;
    else {
        gCount++;
        elBtn.style.backgroundColor = 'rgb(66, 27, 27)';
        elBtn.style.border = 'rgb(44, 10, 10) 4px outset';
    }
    if (currNum === 1) {
        gElTimer.style.display = 'block';
        startTimer();
    }
    if (currNum === gBoardSize) {
        clearInterval(gIntervalId);
        gCount=1
    }

}

function changeLvl() {
    gBoardLength = (gBoardLength === 10) ? 2 : gBoardLength + 1;
    clearInterval(gIntervalId);
    gCount=1
    init();
}

function startTimer() {
    var time = 0;
    gIntervalId = setInterval(function () {
        gElTimer.innerText = (time++/1000);
    }, 17);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}