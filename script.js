document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const restartButton = document.getElementById('restart');
    const apiUrl = `http://jservice.io/api/categories?count=100`;
    // Fetch questions from API
    async function fetchQuestions() {
        try {
            const response = await axios.get(apiUrl);
            return response.data;
        } catch (error) {
            console.error('Error fetching questions:', error);
            return [];
        }
    }

    // Initialize the game
    async function initGame() {
        const questions = await fetchQuestions();
        board.innerHTML = '';  // Clear the board

        questions.forEach((question, index) => {
            const section = document.createElement('div');
            section.className = 'section';
            section.textContent = `Q${index + 1}`;
            section.dataset.question = question.question;
            section.dataset.answer = question.answer;
            section.addEventListener('click', showQuestion);
            board.appendChild(section);
        });
    }

    // Show question
    function showQuestion(event) {
        const section = event.target;
        section.textContent = section.dataset.question;
        section.removeEventListener('click', showQuestion);
        section.addEventListener('click', showAnswer);
    }

    // Show answer
    function showAnswer(event) {
        const section = event.target;
        section.textContent = section.dataset.answer;
        section.removeEventListener('click', showAnswer);
    }

    // Restart game
    restartButton.addEventListener('click', initGame);

    // Initialize the game on page load
    initGame();
});
