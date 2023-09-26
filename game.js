const numOfRows = 6
let activeCell = 0
let activeRow = 0

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
        console.log(activeCell)
    }
}




createGrid()

// document.body.addEventListener('click', (event) => {
//     if(event.target.className !== "keys" && event.target.classList.contains('key'))
//         console.log(event.target)
//         const text = event.target.textContent
//         console.log(text)
//         if(text.length === 1){
//             input(text)
//         }
// }, false)

$(".key").click((event) => {
    const text = event.target.textContent
    if(text.length === 1){
        input(text)
    } else if(text === "Del") {
        removeLetter()
    }
})