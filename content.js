// content.js

// This script overlays a board on the page and highlights moves

// Function to create a board overlay
function createBoardOverlay() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.pointerEvents = 'none'; // Allow clicks to pass through
    overlay.style.zIndex = '9999';

    // Add the chessboard SVG or HTML here
    overlay.innerHTML = '<svg>...</svg>';

    document.body.appendChild(overlay);
}

// Function to highlight moves
function highlightMoves(moves) {
    moves.forEach(move => {
        const moveElement = document.getElementById(move);
        if (moveElement) {
            moveElement.style.backgroundColor = 'yellow'; // Highlight the move
            setTimeout(() => {
                moveElement.style.backgroundColor = ''; // Remove highlight after some time
            }, 2000);
        }
    });
}

// Initialize the overlay and move highlighting
createBoardOverlay();

// Example usage of highlightMoves function
highlightMoves(['move1', 'move2']);