
        // Define game variables
        let currentPlayer = 'X'; // Default starting symbol
        let gameBoard = ['', '', '', '', '', '', '', '', '']; // Represents the game board
        let gameActive = true; // Indicates if the game is still ongoing
        let twoPlayerMode = false; // Flag to indicate two-player mode
        let winner = null; // To keep track of the winner
        let winningCombination = null; // To keep track of the winning combination

        // Define winning combinations
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        // Function to handle cell click
        function handleCellClick(cell, cellIndex) {
            // Check if the clicked cell is empty and the game is still active
            if (gameBoard[cellIndex] === '' && gameActive) {
                cell.textContent = currentPlayer;
                gameBoard[cellIndex] = currentPlayer;
                checkWin();
                togglePlayer();
                if (gameActive && !twoPlayerMode && currentPlayer === 'O') {
                    setTimeout(handleAIMove, 100); // Delay AI move for better user experience
                }
            }
        }

        // Function to toggle the current player
        function togglePlayer() {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('message').textContent = `Player ${currentPlayer}'s Turn`;
        }

       // Function to check for a win
function checkWin() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            winner = currentPlayer; // Set the winner
            winningCombination = pattern; // Set the winning combination
            document.getElementById('message').textContent = `Player ${winner} Wins!`;
            markWinningCells(); // Mark winning cells
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        document.getElementById('message').textContent = "It's a Draw!";
    }
}

   


        // Function to mark winning cells
        function markWinningCells() {
            if (winningCombination) {
                for (const cellIndex of winningCombination) {
                    document.getElementById(`cell-${cellIndex}`).classList.add('winning-cell');
                }
            }
        }

        // Function to handle AI move (random move)
        function handleAIMove() {
            // Check if the game is still active and it's Player O's turn
            if (gameActive && currentPlayer === 'O') {
                let emptyCells = gameBoard.reduce((acc, cell, index) => {
                    if (cell === '') acc.push(index);
                    return acc;
                }, []);

                if (emptyCells.length > 0) {
                    const randomIndex = Math.floor(Math.random() * emptyCells.length);
                    const aiMoveIndex = emptyCells[randomIndex];
                    const aiMoveCell = document.getElementById(`cell-${aiMoveIndex}`);

                    setTimeout(() => {
                        handleCellClick(aiMoveCell, aiMoveIndex);
                    }, 1000); // Delay AI move for better user experience
                }
            }
        }

        // Function to reset the game
        function resetGame() {
            currentPlayer = 'X';
            gameBoard = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            winner = null;
            winningCombination = null;
            document.getElementById('message').textContent = `Player ${currentPlayer}'s Turn`;

            const cells = document.querySelectorAll('.cell');
            cells.forEach((cell) => {
                cell.textContent = '';
                cell.classList.remove('winning-cell'); // Remove winning cell styling
            });

            if (!twoPlayerMode && (currentPlayer === 'O' || currentPlayer === 'X')) {
                setTimeout(handleAIMove, 1000); // Start with AI move in single-player mode
            }
        }

        // Function to switch between single-player and two-player modes
        function toggleMode() {
            twoPlayerMode = !twoPlayerMode;
            document.getElementById('mode-button').textContent = twoPlayerMode ? 'Switch to Single Player' : 'Switch to 2 Players';
            resetGame();
        }

        // Function to toggle between 'X' and 'O'
        function toggleSymbol() {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('symbol-button').textContent = `Choose '${currentPlayer}'`;
            resetGame();
        }

        // Add event listeners to cells
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => handleCellClick(cell, index));
        });

        // Add event listener to reset button
        const resetButton = document.getElementById('reset-button');
        resetButton.addEventListener('click', resetGame);

        // Add event listener to mode button
        const modeButton = document.getElementById('mode-button');
        modeButton.addEventListener('click', toggleMode);

        // Add event listener to symbol button
        const symbolButton = document.getElementById('symbol-button');
        symbolButton.addEventListener('click', toggleSymbol);

        // Automatically start the game with AI's move in single-player mode
        if (!twoPlayerMode) {
            setTimeout(() => {
                handleAIMove();
            }, 1000);
        }
    