//------------------------Constantes-------------------------//
const STATUS_DISPLAY = document.querySelector('.notificacion');
    GAME_STATE = ['', '', '', '', '', '', '', '', ''];
    WINNINGS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    WIN_MESSAGE = () => `EL jugador ${currentPlayer} HA GANADO`;
    DRAW_MESSAGE = () => `EL juego ha terminado en empate`;
    CURRENT_PLAYER_TURN = () => `Turno del jugardor ${currentPlayer}`;

//------------------------Variables-------------------------//
let gameActive = true;
let currentPlayer = '0';

 //------------------------Variables-------------------------//
function main () {
    handleStatusDisplay(CURRENT_PLAYER_TURN());
    listeners();

}

main()

function handleStatusDisplay(message) {
    STATUS_DISPLAY.innerHTML = message;

}

function listeners() {
document.querySelector('.contenedor-juego').addEventListener('click', handleCellClick);
document.querySelector('.restart').addEventListener('click', handleRestartGame);
}

function handleCellClick(clickedEvent) {
    const clickedCell = clickedEvent.target
    if(clickedCell.classList.contains('espacio')) {
        const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
        console.log(clickedCellIndex)
        if(GAME_STATE[clickedCellIndex] != '' || !gameActive) {
            return
        }

        handleCellPlayed(clickedCell, clickedCellIndex)
        handleResultValidation()
    }

}

function handleRestartGame() {
    gameActive = true
    currentPlayer = 'O',
    restartGameState()
    handleStatusDisplay(CURRENT_PLAYER_TURN())
    document.querySelectorAll('.espacio').forEach(cell => cell.innerText = '')
}

function restartGameState() {
    let i = GAME_STATE.length
    while(i--) {
        GAME_STATE[i] = ''
    }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    GAME_STATE[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

}

function handleResultValidation() {
    let roundWon = false
    for( let i = 0; i < WINNINGS.length; i++) {
        const winCondition = WINNINGS[i]
        let position1 = GAME_STATE[winCondition[0]],
            position2 = GAME_STATE[winCondition[1]],
            position3 = GAME_STATE[winCondition[2]]
        if (position1 === '' || position2 === '' || position3 ==='') {
            continue;
        }

        if(position1 === position2 && position2 === position3) {
            roundWon = true
            break;
        }
        
    }

    if(roundWon) {
        handleStatusDisplay(WIN_MESSAGE())
        gameActive = false
        return
    }

    let roundDraw = !GAME_STATE.includes('')

    if(roundDraw) {
        handleStatusDisplay(DRAW_MESSAGE())
        gameActive = false
        return
    }

    handlePlayerChange() 
}

function handlePlayerChange() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'
}