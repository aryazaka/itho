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






export async function sendMessage() {
    let messages = []
    const userInput = document.getElementById('user-input');
    const messageText = userInput.value;
    const newMessage = {"role": "user", "content": messageText}
    messages.push(newMessage)

    if (messageText.trim() === '') return;
       // Nonaktifkan input dan tombol saat mengirim pesan
       userInput.disabled = true;

    // Create user message div
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'user-message';

    const userIcon = document.createElement('img');
    userIcon.src = 'chatbox/img/profil.png'; // Path to user icon
    userIcon.alt = 'User Icon';
    userIcon.className = 'message-icon';

    const userText = document.createElement('span');
    userText.textContent = messageText;

    userMessageDiv.appendChild(userIcon);
    userMessageDiv.appendChild(userText);
    messagesDiv.appendChild(userMessageDiv);

    userMessageDiv.scrollIntoView({ behavior: 'smooth' });

    // Create loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loader';

    const spinner = document.createElement('div');
    spinner.className = 'spinner';

    const loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.textContent = "Loading...";

    loadingDiv.appendChild(spinner);
    loadingDiv.appendChild(loadingText);
    messagesDiv.appendChild(loadingDiv);

    userInput.value = '';
    
    loadingDiv.scrollIntoView({ behavior: "smooth" });

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const res = await fetch('/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ messages }),
    });

    const data = await res.json();
    let newAssistantMessage = {"role": "assistant", "content": data.reply}
    messages.push(newAssistantMessage)
    // Update history and storage
    historyData.push(messageText);
    localStorage.setItem('chatHistory', JSON.stringify(historyData));
    addToHistory(messageText);

    // Simulate AI response delay
    setTimeout(async () => {
        messagesDiv.removeChild(loadingDiv);

        // AI response
        let hasil = newAssistantMessage.content || 'Error: ' + data.error;

        // Create AI response div
        const aiResponseDiv = document.createElement('div');
        aiResponseDiv.className = 'ai-response';

        const aiIcon = document.createElement('img');
        aiIcon.src = 'chatbox/img/ai.png'; // Path to AI icon
        aiIcon.alt = 'AI Icon';
        aiIcon.className = 'message-icon';

        aiResponseDiv.appendChild(aiIcon);
        messagesDiv.appendChild(aiResponseDiv);

        

        // Animate AI response
        animateAIResponse(hasil, aiResponseDiv);
        aiResponseDiv.scrollIntoView({ behavior: 'smooth' });
        userInput.disabled = false;
        userInput.focus(); // Fokus kembali ke input
    }, 5000); // Simulated delay of 5 seconds
}

function animateAIResponse(text, container) {
    const words = text.split(' ');
    let index = 0;

    const interval = setInterval(() => {
        if (index < words.length) {
            const span = document.createElement('span');
            span.innerHTML = words[index] + ' '; // Tambahkan spasi setelah setiap kata
            container.appendChild(span);
            index++;
            container.scrollIntoView({ behavior: 'smooth' });
        } else {
            clearInterval(interval); // Hentikan interval setelah semua kata ditampilkan
        }
    }, 100); // Waktu tampil setiap kata (300 ms)
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

    // Add click event to send the question when clicked
    li.addEventListener('click', () => {
        sendQuickQuestion(question);
    });

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
    messagesDiv.style.backgroundColor = isDarkMode ? 'transparant' : 'transparant';
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