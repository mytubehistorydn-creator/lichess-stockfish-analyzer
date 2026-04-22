// content.js - Real-time move highlighting for Lichess

window.addEventListener('load', () => {
    console.log('Lichess Analyzer: Initializing...');
    initializeHighlighting();
});

function initializeHighlighting() {
    const board = document.querySelector('.board');
    
    if (!board) {
        console.log('Board not found, retrying in 1 second...');
        setTimeout(initializeHighlighting, 1000);
        return;
    }

    console.log('Board found! Starting move highlighting...');

    // Create mutation observer to watch for move changes
    const observer = new MutationObserver((mutations) => {
        highlightSquares();
    });

    // Watch the entire board for changes
    observer.observe(board, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'data-square']
    });

    // Initial highlight
    highlightSquares();
}

function highlightSquares() {
    // Remove old highlights
    document.querySelectorAll('.move-highlight, .last-move-from, .last-move-to').forEach(sq => {
        sq.classList.remove('move-highlight');
    });

    // Highlight legal move squares
    document.querySelectorAll('[data-square].move-dest').forEach(square => {
        square.classList.add('move-highlight');
        const circle = document.createElement('div');
        circle.className = 'legal-move-indicator';
        if (!square.querySelector('.legal-move-indicator')) {
            square.appendChild(circle);
        }
    });

    // Highlight last move
    document.querySelectorAll('[data-square].last-move').forEach(square => {
        square.classList.add('last-move-highlight');
    });
}

// Toggle highlighting with Ctrl+H
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'h') {
        const highlights = document.querySelectorAll('.move-highlight');
        highlights.forEach(el => {
            el.style.opacity = el.style.opacity === '0.3' ? '1' : '0.3';
        });
    }
});

console.log('Lichess Analyzer Content Script Loaded!');