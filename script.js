const problem = document.querySelector(".problem");
const form = document.querySelector("#myForm");
const input = document.querySelector("#txt");
const pointsReq = document.getElementById("pts-req");
const mistakes = document.getElementById("mistakes");
const progressBar = document.querySelector(".progress-inner");
const msg = document.querySelector(".msg");
const reset = document.querySelector(".reset-btn");
const overlay = document.querySelector('.overlay')

let state = {
   score: 0,
   wrongAns: 0,
};

function updateProblem() {
   state.currentProblem = generateProblem();
   problem.innerHTML = `${state.currentProblem.firstNum} ${state.currentProblem.operator} ${state.currentProblem.secondNum} `;
   input.value = "";
   input.focus();
}

updateProblem();

function randomGen(max) {
   return Math.floor(Math.random() * max + 1);
}

function generateProblem() {
   return {
      firstNum: randomGen(10),
      secondNum: randomGen(10),
      operator: ["+", "-", "x"][randomGen(2)],
   };
}

console.log(problem);

form.addEventListener("submit", (e) => {
   e.preventDefault();

   if (input.value != "") {
      let correctAns;
      let prb = state.currentProblem;
      if (prb.operator == "+") correctAns = prb.firstNum + prb.secondNum;
      if (prb.operator == "-") correctAns = prb.firstNum - prb.secondNum;
      if (prb.operator == "x") correctAns = prb.firstNum * prb.secondNum;

      if (parseInt(input.value, 10) === correctAns) {
         state.score++;
         pointsReq.textContent = 10 - state.score;
         updateProblem();
         renderProgressBar();
      } else {
         state.wrongAns++;
         mistakes.textContent = 2 - state.wrongAns;
         input.value = "";
         input.focus();
         problem.classList.add('red');
         setTimeout(()=> problem.classList.remove('red'),331)
      }
      checkLogic();
   }
});
function checkLogic() {
   //* win
   if (state.score == 10) {
      msg.textContent = "Congrats! you won";
      document.body.classList.add("overlay-open");
      setTimeout(()=> reset.focus(),331)
   }
   //* lose
   if (state.wrongAns == 3) {
      msg.textContent = "Sorry,You Lost";
      document.body.classList.add("overlay-open");
      setTimeout(() => reset.focus(), 331);
   }
}

reset.addEventListener('click', resetGame);

function resetGame() {
   document.body.classList.remove('overlay-open')
   updateProblem();
   state.score = 0;
   state.wrongAns = 0;
   pointsReq.textContent = 10;
   mistakes.textContent = 2;
   renderProgressBar();
}
function renderProgressBar() {
   progressBar.style.transform = `scaleX(${state.score / 10})`;
}
