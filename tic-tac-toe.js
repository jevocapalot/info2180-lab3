
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const statusDiv = document.getElementById('status');
    const newGameBtn = document.querySelector('.btn');
    const squares = Array.from(board.querySelectorAll('div'));
  
    // Add square class to each cell
    squares.forEach(sq => sq.classList.add('square'));
  
    // Game state
    let boardState = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameOver = false;
  
    // Winning combos
    const LINES = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
  
    function checkWinner() {
      for (const [a,b,c] of LINES) {
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
          return boardState[a];
        }
      }
      return null;
    }
  
    function handleClick(e) {
      if (gameOver) return;
      const idx = squares.indexOf(e.target);
      if (boardState[idx]) return; 
  
      boardState[idx] = currentPlayer;
      e.target.textContent = currentPlayer;
      e.target.classList.add(currentPlayer);
  
      const winner = checkWinner();
      if (winner) {
        statusDiv.textContent = `Congratulations! ${winner} is the Winner!`;
        statusDiv.classList.add('you-won');
        gameOver = true;
        return;
      }
  
      if (boardState.every(Boolean)) {
        statusDiv.textContent = "It's a draw!";
        return;
      }
  
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  
    // Hover effect
    function addHover(e) {
      if (!boardState[squares.indexOf(e.target)] && !gameOver) {
        e.target.classList.add('hover');
      }
    }
    function removeHover(e) {
      e.target.classList.remove('hover');
    }
  
    squares.forEach(sq => {
      sq.addEventListener('click', handleClick);
      sq.addEventListener('mouseenter', addHover);
      sq.addEventListener('mouseleave', removeHover);
    });
  
    // Reset game
    newGameBtn.addEventListener('click', () => {
      boardState = Array(9).fill(null);
      currentPlayer = 'X';
      gameOver = false;
      squares.forEach(sq => {
        sq.textContent = '';
        sq.classList.remove('X','O','hover');
      });
      statusDiv.textContent = "Move your mouse over a square and click to play an X or an O.";
      statusDiv.classList.remove('you-won');
    });
  });
  