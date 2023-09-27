import {WORDS} from "./words.js";

const numOfRows = 6
let activeCell = 0
let activeRow = 0
const randomNum = Math.floor(Math.random() * WORDS.length)
const randomWord = WORDS[randomNum]
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function createGrid() {
    const game = document.getElementById('game')
    for(let i = 0; i < numOfRows; i++){
        let row = document.createElement('div')
        row.classList.add('row', ''+i)
        for(let j = 0; j < 5; j++){
            let cell = document.createElement('div')
            cell.classList.add('cell', ''+j)
            row.appendChild(cell)
        }
        game.appendChild(row)
    }
}

const rows = document.getElementsByClassName('row')

function input(letter) {
    if(activeCell < 5) {
        const cell = rows.item(activeRow).getElementsByClassName('cell').item(activeCell)
        cell.textContent = letter
        activeCell++
    }
}

function removeLetter(){
    if(activeCell > 0) {
        activeCell--
        const cell = rows.item(activeRow).getElementsByClassName('cell').item(activeCell)
        cell.textContent = ""
    }
}


function checkWord() {
    if(activeCell === 5) {
        const cells = rows.item(activeRow).getElementsByClassName('cell')
        let word = []
        for(let i = 0; i < cells.length; i++){
            word.push(cells.item(i).textContent)
        }
        let randomWordList = randomWord.split("")
        word = word.join("").toLowerCase()
        if(WORDS.includes(word) && activeRow < numOfRows) {
            for(let i = 0; i < word.length; i++){
                cells.item(i).style.border = "2px solid #F7EBFF"
                if(randomWord.includes(word[i]) && word[i] === randomWordList[i]){
                    cells.item(i).style.backgroundColor = "#67BAA6"
                    randomWordList.splice(i, 1, "")
                } else if(randomWordList.includes(word[i])) {
                    cells.item(i).style.backgroundColor = "#FF8A67"
                } else {
                    cells.item(i).style.backgroundColor = "#AEA8BA"
                    $(`.key.${word[i].toUpperCase()}`).css("background-color", "#AEA8BA")
                }
            }

            if(randomWordList.every((el) => el === "")){
                alert('congratulations you guessed the word!')
                activeRow = null
                activeCell = null
                return
            } else {
                if(activeRow === numOfRows-1) {
                    alert('better luck next time, word: ' + randomWord)
                    activeRow = null
                    activeCell = null
                    return
                }
            }

            if(activeRow !== numOfRows-1){
                activeRow++
                activeCell = 0
            }
        } else if(!WORDS.includes(word)){
            alert("There is no such word");
        }
    }
}




createGrid()

$(".key").click((event) => {
    const text = event.target.textContent
    if(activeCell === null || activeRow === null){
        if(text === "Restart") {
            const areYouSure = prompt("Are you sure you want to reload? (yes/no)", "no")
            if (areYouSure.toLowerCase() === "yes") {
                location.reload(true)
            }
        }
        return
    }
    if(text.length === 1){
        input(text)
    } else if(text === "Del") {
        removeLetter()
    } else if(text === "Enter"){
        checkWord()
    } else if(text === "Restart") {
        const areYouSure = prompt("Are you sure you want to reload? (yes/no)", "no")
        if(areYouSure.toLowerCase() === "yes") {
            location.reload(true)
        }
    }
})

$(document).on("keyup", (event) => {
    if(activeCell === null || activeRow === null){
        return
    }
    const key = event.key.toUpperCase()
    if(letters.includes(key)){
        input(key)
    } else if(key === "BACKSPACE"){
        removeLetter()
    } else if(key === "ENTER") {
        checkWord()
    }
})