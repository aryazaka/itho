let sidebar = document.querySelector('.sidebar');
        let closeBtn = document.querySelector('#btn');
       
        let messagesDiv = document.getElementById('messages');
        let historyList = document.getElementById('history-list');
        let historyQuestions = document.getElementById('history-questions');
        let quickQuestions = document.getElementById('quick-questions');

        // Load history from localStorage
        let historyData = JSON.parse(localStorage.getItem('chatHistory')) || [];

        // Display history on page load
        historyData.forEach(question => {
            addToHistory(question);
        });

        closeBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            toggleQuickQuestions();
        });

        function toggleQuickQuestions() {
            if (sidebar.classList.contains('open')) {
                quickQuestions.classList.add('hidden');
            } else {
                quickQuestions.classList.remove('hidden');
            }
        }

        document.getElementById('new-chat').addEventListener('click', () => {
            messagesDiv.innerHTML = '';
        });

        document.getElementById('history').addEventListener('click', () => {
            historyList.style.display = historyList.style.display === 'none' ? 'block' : 'none';
        });

        document.getElementById('clear-history').addEventListener('click', () => {
            historyData = [];
            updateHistory();
            localStorage.removeItem('chatHistory');
        });

        function sendMessage() {
    const userInput = document.getElementById('user-input');
    const messageText = userInput.value;

    if (messageText.trim() === '') return;

    // Create user message div
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'user-message';
    
    // Create user icon
    const userIcon = document.createElement('img');
    userIcon.src = 'chatbox/img/profil.png'; // Path to user icon
    userIcon.alt = 'User Icon';
    userIcon.className = 'message-icon';  // Add a class for styling

    const userText = document.createElement('span');
    userText.textContent = messageText;

    userMessageDiv.appendChild(userIcon);
    userMessageDiv.appendChild(userText);
    messagesDiv.appendChild(userMessageDiv);

    // Update history and storage
    historyData.push(messageText);
    localStorage.setItem('chatHistory', JSON.stringify(historyData));
    addToHistory(messageText);

    // Scroll to the user message
    userMessageDiv.scrollIntoView({ behavior: 'smooth' });

    // Create loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loader';

    // Create loading spinner
    const spinner = document.createElement('div');
    spinner.className = 'spinner';

    // Create loading text
    const loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.textContent = "Loading...";

    // Append spinner and loading text to loadingDiv
    loadingDiv.appendChild(spinner);
    loadingDiv.appendChild(loadingText);
    messagesDiv.appendChild(loadingDiv);
    
    // Simulate AI response delay
    setTimeout(() => {
        // Remove loading animation
        messagesDiv.removeChild(loadingDiv);

        // AI response
        let hasil = "{{hasil}}"; // Replace with actual logic

        // Create AI response div
        const aiResponseDiv = document.createElement('div');
        aiResponseDiv.className = 'ai-response';

        // Create AI icon
        const aiIcon = document.createElement('img');
        aiIcon.src = 'chatbox/img/ai.png'; // Path to AI icon
        aiIcon.alt = 'AI Icon';
        aiIcon.className = 'message-icon'; // Add a class for styling

        const aiText = document.createElement('span');
        aiText.textContent = hasil;

        aiResponseDiv.appendChild(aiIcon);
        aiResponseDiv.appendChild(aiText);
        messagesDiv.appendChild(aiResponseDiv);
        aiResponseDiv.scrollIntoView({ behavior: 'smooth' });
    }, 5000); // Simulated delay of 5 seconds
}

        function sendQuickQuestion(question) {
            const userInput = document.getElementById('user-input');
            userInput.value = question;
            sendMessage();
        }

        function updateHistory() {
            historyQuestions.innerHTML = '';
            historyData.slice().reverse().forEach((question) => {
                addToHistory(question);
            });
        }

        function addToHistory(question) {
            const li = document.createElement('li');
            li.textContent = question;
            historyQuestions.appendChild(li);
        }


        // Menambahkan event untuk mengirim pesan dengan tombol Enter
document.getElementById('user-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});


// dark mode dan light mode
document.getElementById('settings').addEventListener('click', () => {
    const settingsOptions = document.getElementById('settings-options');
    settingsOptions.style.display = settingsOptions.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('light-mode').addEventListener('click', () => {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    updateColors();
});

document.getElementById('dark-mode').addEventListener('click', () => {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    updateColors();
});

function updateColors() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Sidebar remains unchanged
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.color = isDarkMode ? '#FFFFFF' : '#000000'; // Change text color in the sidebar

    // Update main content colors
    const mainContent = document.querySelector('.main-content');
    mainContent.style.backgroundColor = isDarkMode ? '#121212' : '#F9F5E9';
    mainContent.style.color = isDarkMode ? '#FFFFFF' : '#000000';
    
    // Update messages div color
    const messagesDiv = document.getElementById('messages');
    messagesDiv.style.backgroundColor = isDarkMode ? '#1e1e1e' : '#FFFFFF';
    messagesDiv.style.color = isDarkMode ? '#FFFFFF' : '#000000';

    // Update user message styles
    const userMessages = document.querySelectorAll('.user-message');
    userMessages.forEach(msg => {
        msg.style.color = isDarkMode ? '#FFFFFF' : '#000000'; // Change text color
    });

    // Update AI response styles
    const aiResponses = document.querySelectorAll('.ai-response');
    aiResponses.forEach(msg => {
        msg.style.color = isDarkMode ? '#FFFFFF' : '#000000'; // Change AI response text color to white in dark mode
    });
}




        document.getElementById('log_out').addEventListener('click', () => {
    window.location.href = "home.html"; // Arahkan ke halaman home untu icon di paling bawah sidebar ai
});