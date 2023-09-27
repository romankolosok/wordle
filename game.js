import {WORDS} from "./words.js";

const numOfRows = 6
let activeCell = 0
let activeRow = 0
const randomNum = Math.floor(Math.random() * WORDS.length)
const randomWord = WORDS[randomNum]

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
    if(activeCell < numOfRows-1) {
        const cell = rows.item(activeRow).getElementsByClassName('cell').item(activeCell)
        cell.textContent = letter
        activeCell++
        console.log(activeCell)
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
        word = word.join("").toLowerCase()
        if(WORDS.includes(word) && activeRow !== 5) {
            for(let i = 0; i < word.length; i++){
                if(randomWord.includes(word[i]) && word[i] === randomWord[i]){
                    cells.item(i).style.backgroundColor = "green"
                } else if(randomWord.includes(word[i])) {
                    cells.item(i).style.backgroundColor = "orange"
                } else {
                    cells.item(i).style.backgroundColor = "gray"
                    $(`.key.${word[i].toUpperCase()}`).css("background-color", "gray")
                }
            }
            activeRow++
            activeCell = 0
        } else if(!WORDS.includes(word)){
            alert("There is no such word");
        }
    }
}




createGrid()

$(".key").click((event) => {
    const text = event.target.textContent
    if(text.length === 1){
        input(text)
    } else if(text === "Del") {
        removeLetter()
    } else if(text === "Enter"){
        checkWord()
    }
})