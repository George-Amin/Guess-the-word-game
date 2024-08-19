const gameName = "Guess the word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} game`;

// -- inputs game --
let numberOfTry = 6;
let numberOfLitters = 6;
let currantTry = 1;

//word that user guess
let wordToGuess = "";

// words array----------
const words = [
	"Afraid",
	"Amount",
	"Assess",
	"Artist",
	"Demand",
	"access",
	"Dollar",
	"father",
	"Bottom",
	"Defeat",
	"Camera",
	"Better",
	"Chance",
	"Carbon",
	"Eleven",
	"yellow",
	"screen",
	"Golden",
	"school",
	"letter",
	"Coffee",
	"doctor",
	"mother",
	"family",
	"friend",
	"person",
	"minute",
	"Dinner",
	"future",
	"window",
	"ground",
	"island",
	"broken",
	"danger",
	"height",
	"planet",
	"glance",
	"finger",
	"shadow",
	"silver",
	"number",
	"jungle",
	"unlock",
	"flower",
	"object",
	"things",
	"change",
	"street",
	"matter",
	"energy",
	"people",
	"ground",
	"spring",
	"summer",
	"autumn",
	"august",
	"winter",
	"season",
	"wonder",
	"reason",
	"quartz",
	"quarry",
	"square",
	"killer",
	"player",
	"frozen",
	"vision",
	"expect",
	"animal",
	"butter",
	"design",
	"streak",
	"volume",
];

wordToGuess = words[Math.floor(Math.random() * words.length)].toUpperCase();
// btns ----------
let checkBtn = document.getElementById("check");
let hintBtn = document.getElementById("hint");
let numOfHints = 1;
// massages of win or lose variables
const message = document.getElementById("message");
// -- generator =>
function genInputs() {
	const inputsContainer = document.querySelector(".inputs");
	for (let i = 1; i <= numberOfTry; i++) {
		// creat the divS --
		const tryDiv = document.createElement("div");
		//class for each div
		tryDiv.classList.add(`try_${i}`);
		tryDiv.innerHTML = `<span>try ${i}</span?`;

		// get the inputs
		if (i !== currantTry) {
			tryDiv.classList.add("disable-input");
		}
		// creat inputs------------
		for (let j = 1; j <= numberOfLitters; j++) {
			const input = document.createElement("input");
			input.setAttribute("type", "text");
			input.setAttribute("maxlength", "1");
			input.id = `guess-${i}-letter-${j}`;
			tryDiv.appendChild(input);
		}

		//append the divs and spans on the main contaner (ele html class name is inputs\)
		inputsContainer.appendChild(tryDiv);
	}
	inputsContainer.children[0].children[1].focus(); // focus on the first input

	//disable all input except the first one..
	const disableInputs = document.querySelectorAll(".disable-input input");
	disableInputs.forEach((input) => {
		input.disabled = true;
	});
	// change all values on inputs toUpperCase littters || and get index of next input
	const inputs = document.querySelectorAll("input");

	inputs.forEach((input, index) => {
		input.addEventListener("input", function () {
			//make all litters upperCase
			if (this.value === " ") {
				this.value = "";
				return;
			}
			this.value = this.value.toUpperCase();
			//get index of next input
			const nextInput = inputs[index + 1];
			if (nextInput) {
				nextInput.focus();
			}
		});
		input.addEventListener("keydown", function (event) {
			const currantIntex = Array.from(inputs).indexOf(this);
			if (event.key === "ArrowRight") {
				const nextInput = inputs[currantIntex + 1].focus();
				if (nextInput < inputs.length) {
					inputs[nextInput].focus();
				}
			} else if (event.key === "ArrowLeft") {
				const prevInput = inputs[currantIntex - 1].focus();
				if (prevInput >= 0) {
					inputs[prevInput].focus();
				}
			}
		});
	});
}

//  value is empty disable the check btn
checkBtn.addEventListener("click", check);
function check() {
	let correctLetters = true;
	for (let i = 1; i <= wordToGuess.length; i++) {
		const inputField = document.querySelector(`#guess-${currantTry}-letter-${i}`);
		const litter = inputField.value.toUpperCase();
		const rightLitter = wordToGuess[i - 1];
		const inputFalse = document.querySelector(`#guess-${currantTry}-letter-${i}`);
		if (inputFalse.value === true) {
			checkBtn.disabled = false;
		}
		//==game logic-----
		//right letter and in place
		if (litter === rightLitter) {
			inputField.classList.add("in-place");
			//right letter but not in place
		} else if (wordToGuess.includes(litter)) {
			inputField.classList.add("not-in-place");
			correctLetters = false;
			//wrong letter
		} else if (litter !== rightLitter) {
			inputField.classList.add("wrong");
			correctLetters = false;
		}
	}
	//check if user won
	if (correctLetters) {
		let rightWord = wordToGuess;
		let creatDivToAlartIfWinOrLose = document.createElement("div");
		let showTheWord = document.createElement("b");
		showTheWord.innerHTML = rightWord;
		creatDivToAlartIfWinOrLose.innerHTML = `you won in ${currantTry} try`;
		if (numOfHints === 1) {
			creatDivToAlartIfWinOrLose.innerHTML = `you won in ${currantTry} try without ant hints`;
		}
		message.appendChild(creatDivToAlartIfWinOrLose);
		message.appendChild(showTheWord);
		//disable all input and buttons
		const disAllinputs = document.querySelectorAll("input");
		disAllinputs.forEach((input) => {
			input.classList.add("disable-input");
		});
		checkBtn.disabled = true;
		hintBtn.disabled = true;
	} else {
		document.querySelector(`.try_${currantTry}`).classList.add("disable-input");
		let currentTry = document.querySelectorAll(`.try_${currantTry}  input`);
		currentTry.forEach((input) => {
			input.disabled = true;
		});
		currantTry++;

		const nexdtry = document.querySelectorAll(`.try_${currantTry} input`);

		nexdtry.forEach((input) => {
			input.disabled = false;
		});
		// check the elemnet is empty
		let checkEmpty = document.querySelector(`.try_${currantTry}`);
		if (checkEmpty) {
			document
				.querySelector(`.try_${currantTry}`)
				.classList.remove("disable-input");
			checkEmpty.children[1].focus();
		} else {
			let creatDivToAlartIfWinOrLose = document.createElement("div");
			creatDivToAlartIfWinOrLose.innerHTML = `you lose the word is ${wordToGuess}`;
			message.appendChild(creatDivToAlartIfWinOrLose);
			checkBtn.disabled = true;
			hintBtn.disabled = true;
		}
	}
}

// -- hint --
const enabledInputs = document.querySelectorAll("input:not([disabled])");
const emptyEnabledInputs = Array.from(enabledInputs);

document.querySelector(".hint").innerHTML = `${numOfHints} hint`;
hintBtn.addEventListener("click", function () {
	// check if there are hints
	if (numOfHints > 0) {
		numOfHints--;
		document.querySelector(".hint").innerHTML = `${numOfHints} hint`;

		const inputsForHint = document.querySelectorAll("input:not([disabled])");
		const choseOne = Array.from(inputsForHint);
		let hintUsed = false;
		choseOne.forEach((input, index) => {
			if (input.value === "" && !hintUsed) {
				input.value = wordToGuess[index];
				hintUsed = true;
			}
		});

		if (numOfHints === 0) {
			hintBtn.disabled = true;
		}
	}
});
// ---------------------------------------------
document.addEventListener("keydown", removeLteter);
function removeLteter(event) {
	if (event.key === "Backspace") {
		const inputs = document.querySelectorAll("input:not([disabled])");
		const currantIntex = Array.from(inputs).indexOf(document.activeElement);
		if (currantIntex > 0) {
			const currantInput = inputs[currantIntex];
			currantInput.value = "";
			const prevInput = inputs[currantIntex - 1];
			prevInput.value = "";
			prevInput.focus();
		}
	}
}

// -- game start --
window.onload = function () {
	genInputs();
};
