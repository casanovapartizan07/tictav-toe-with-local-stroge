document.addEventListener("DOMContentLoaded", function () {
	const gameboard = document.getElementById("gameboard");
	const boxes = document.querySelectorAll(".box");
	const playerText = document.getElementById("playerText");
	const restartBtn = document.getElementById("restartBtn");

	let currentPlayer = "X";
	let boardState = JSON.parse(localStorage.getItem("boardState")) || [
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
	];

	function renderBoard() {
		for (let i = 0; i < boardState.length; i++) {
			boxes[i].textContent = boardState[i];
		}
	}

	function endGame(winner) {
		if (winner) {
			playerText.textContent = `${winner} g'alabaa qozondi!`;
		} else {
			playerText.textContent = "Durrang!";
		}

		for (const box of boxes) {
			box.removeEventListener("click", handleBoxClick);
		}

		restartBtn.style.display = "block";
		restartBtn.addEventListener("click", restartGame);
	}

	function restartGame() {
		currentPlayer = "X";
		playerText.textContent = "Tic Tac Toe";
		boardState = ["", "", "", "", "", "", "", "", ""];
		renderBoard();
		restartBtn.style.display = "none";

		localStorage.removeItem("boardState");
	}

	function checkWinner() {
		const winningCombos = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (const combo of winningCombos) {
			const [a, b, c] = combo;
			if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
				return boardState[a];
			}
		}

		if (!boardState.includes("")) {
			return "do'stlik";
		}

		return null;
	}

	function handleBoxClick(event) {
		const box = event.target;
		const boxIndex = box.id;

		if (boardState[boxIndex] === "") {
			boardState[boxIndex] = currentPlayer;
			box.textContent = currentPlayer;
			currentPlayer = currentPlayer === "X" ? "O" : "X";

			const winner = checkWinner();
			if (winner) {
				endGame(winner);
			}

			localStorage.setItem("boardState", JSON.stringify(boardState));
		}
	}

	for (const box of boxes) {
		box.addEventListener("click", handleBoxClick);
	}

	restartBtn.addEventListener("click", restartGame);

	renderBoard();
});
