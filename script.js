let myAudio = new Audio();
let audioTurn = document.createElement("audio");
audioTurn.src = "ting.mp3";
// can also write let newAudioTurn = audioTurn.setAttribute("src", "ting.mp3") instead of line 3;
let gameOver = new Audio("gameover.mp3");
let turn = "X";
let isgameOver = false;
let boxes = document.getElementsByClassName("box");
let boxesArr = Array.from(boxes);
let myBtn = document.getElementById("reset");

// Function to change the turn
const changeTurn = () => {
  return (turn == "X" ? "0" : "X");
};

// Function to check for win
const checkWin = () => {
  let wins = [
    [0, 1, 2, 13, 42, 0],
    [3, 4, 5, 13, 133, 0],
    [6, 7, 8, 13, 224, 0],
    [0, 3, 6, -79, 132, 90],
    [1, 4, 7, 12, 132, 90],
    [2, 5, 8, 103, 132, 90],
    [0, 4, 8, 8, 129, 45],
    [2, 4, 6, 13, 133, -45]
  ];
  wins.forEach((e) => {
    let myStyle = {
      width: "245px",
      translate: `${e[3]}px ${e[4]}px`,
      rotate: `${e[5]}deg`
    }
    if (
      boxes[e[0]].innerText === boxes[e[1]].innerText &&
      boxes[e[1]].innerText === boxes[e[2]].innerText &&
      boxes[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxes[e[0]].innerText + " Won";
      gameOver.play();
      isgameOver = true;
      document.getElementsByTagName("img")[0].style.width = "125px";
      document.querySelector(".line").style.width = myStyle.width;
      document.querySelector(".line").style.translate = myStyle.translate;
      document.querySelector(".line").style.rotate = myStyle.rotate;
      // Line 50 to Line 54 is just a way of styling the line. Can use these lines(50 to 54) instead of myStyle obj
      // and lines 45 to 47
      // document.querySelector(".line").style.width = "245px";
      // document.querySelector(".line").style.translate = e[3] + 'px' + ' ' + e[4] + 'px';
      // document.querySelector(".line").style.translate = `${e[3]}px ${e[4]}px`;
      // document.querySelector(".line").style.rotate = e[5] + "deg";
      // document.querySelector(".line").style.rotate = `${e[5]}deg`;
      // document.querySelector(".line").style.transform = 'translate(' + e[3] + 'px,' + e[4] + 'px) ' + 'rotate(' + e[5] + 'deg)';
      // document.querySelector(".line").style.transform = `translate(${e[3]}px, ${e[4]}px) rotate(${e[5]}deg)`
    }
  });
};

// Game Logic
// Element is that div which has id of box
// Array.from(boxes) is used to convert HTML Collection(boxes) to Array(boxes)
boxesArr.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.innerText === "") {
      element.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      if (!isgameOver) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn;
      }
    }
  });
});

// Adding onclick event to reset button
myBtn.onclick = () => {
  for (let element of boxesArr) {
    element.innerText = "";
  }
  turn = "X";
  isgameOver = false;
  document.getElementsByClassName("info")[0].innerText =
    "Turn for " + turn;
  document.querySelector(".line").style.width = "0px";
  document.getElementsByTagName("img")[0].style.width = "0px";
};

