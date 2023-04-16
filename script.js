const selectBox = document.querySelector(".select-box"),
    SelectXBtn = document.querySelector(".playerX"),
    SelectOBtn = document.querySelector(".playerO"),
    playBoard = document.querySelector(".play-board"),
    allBox = document.querySelectorAll("section span"),
    players = document.querySelector(".players"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector("button");

window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)")
    }

    SelectXBtn.onclick = () => {
        selectBox.classList.add("hide"); //hide the select box on playerX button clicked
        playBoard.classList.add("show"); //show the playboard section on playerX button clicked
    }
    SelectOBtn.onclick = () => {
        selectBox.classList.add("hide"); //hide the select box on playerO button clicked
        playBoard.classList.add("show"); //show the playboard section on playerO button clicked
        players.setAttribute("class", "players active player");
    }
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X"
let runBot = true;

// User clicked function
function clickedBox(element) {
    playerSign = "X";
    // console.log(element);
    if (players.classList.contains("player")) {
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        playerSign = "O";
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner();
    playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none";
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        bot(runBot);
    }, randomDelayTime);
}

// Computor clicked function
function bot(runBot) {
    if (runBot) {
        playerSign = "O";
        let array = [];
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                array.push(i);
                // console.log(i + " has no children");
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        console.log(randomBox + 1);
        if (array.length > 0) {
            if (players.classList.contains("player")) {
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                players.classList.add("active");
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        // console.log(array);
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
    }
}

function getClass(idname) {
    return document.querySelector(".box" + idname).id;
}

function checkClasses(val1, val2, val3, sign) {
    if (getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign) {
        return true;
    }
}

function selectWinner() {
    if (checkClasses(1, 2, 3, playerSign) || checkClasses(4, 5, 6, playerSign) || checkClasses(7, 8, 9, playerSign) || checkClasses(1, 4, 7, playerSign) || checkClasses(2, 5, 8, playerSign) || checkClasses(3, 6, 9, playerSign) || checkClasses(1, 5, 9, playerSign) || checkClasses(3, 5, 7, playerSign)) {
        console.log(playerSign + " is the Winner");
        runBot = false;
        bot(runBot);
        setTimeout(() => {
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
            wonText.innerHTML = `Player <p>${playerSign}</p> Won the game!`;
        }, 800);
    } else {
        if (getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "") {
            console.log("Game Draw");
            runBot = false;
            bot(runBot);
            setTimeout(() => {
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
                wonText.textContent = `Match has been Drawn!`;
            }, 800);
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload();
}
