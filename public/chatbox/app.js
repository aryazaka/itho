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

    let isRecording = false;
    const userInput = document.getElementById('user-input');
    const micButton = document.getElementById('mic-button');
    const imageInput = document.getElementById('image-input');

    let recognition;

    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'id-ID';

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript; // Set the transcribed text to the input
        };

        recognition.onerror = (event) => {
            console.error('Error occurred in recognition: ', event.error);
        };
    } else {
        alert("Browser tidak mendukung fitur pengenalan suara.");
    }

    micButton.addEventListener('click', () => {
        if (!isRecording) {
            recognition.start(); // Start recording
            isRecording = true;
            micButton.classList.add('recording');
        } else {
            recognition.stop(); // Stop recording
            isRecording = false;
            micButton.classList.remove('recording');
        }
    });

    let pendingImage = null; // Menyimpan gambar yang akan dikirim

    document.getElementById('send-image').addEventListener('click', () => {
        imageInput.click(); // Trigger file input click
    });

    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            pendingImage = URL.createObjectURL(file); // Simpan gambar yang akan dikirim
            // Hapus gambar yang ditampilkan sebelumnya (jika ada)
            // Tidak ada tampilan di bawah sambutan
        }
    });

 function handleSend() {
        const messageText = userInput.value.trim();
        if (messageText === '' && !pendingImage) return; // Pastikan ada input atau gambar

        // Kirim pesan dan gambar (jika ada)
        sendMessage(messageText, pendingImage);
        
        pendingImage = null; // Reset gambar setelah mengirim
        userInput.value = ''; // Kosongkan input setelah mengirim
        userInput.focus(); // Fokus kembali ke input
    }
 async function sendMessage(messageText = '', imageText = '') {
    const userInput = document.getElementById('user-input');
   
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

    if (imageText){
        userInput = imageText
    }
    userMessageDiv.appendChild(userIcon);
    userMessageDiv.appendChild(userText);

    // Jika ada gambar, tambahkan ke messageContainer
    if (imageText) {
        const imgElement = document.createElement('img');
        imgElement.src = imageText;
        imgElement.className = 'image-message';
        userMessageDiv.appendChild(imgElement);
    }
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

    loadingDiv.scrollIntoView({ behavior: "smooth" });

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const res = await fetch('/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ message: messageText }),
    });

    userInput.value = '';

    const data = await res.json();

    // Update history and storage
    historyData.push(messageText);
    localStorage.setItem('chatHistory', JSON.stringify(historyData));
    addToHistory(messageText);

    // Simulate AI response delay
    setTimeout(async () => {
        messagesDiv.removeChild(loadingDiv);

        // AI response
        let hasil = data.reply || 'Error: ' + data.error;

        // Create AI response div
        const aiResponseDiv = document.createElement('div');
        aiResponseDiv.className = 'ai-response';

        const aiIcon = document.createElement('img');
        aiIcon.src = 'chatbox/img/ai.png'; // Path to AI icon
        aiIcon.alt = 'AI Icon';
        aiIcon.className = 'message-icon';

        aiResponseDiv.appendChild(aiIcon); // Add AI icon to AI response div
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
            container.scrollIntoView({ behavior: 'smooth' });
            index++;
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
        handleSend();
    }
});

// dark mode dan light mode
const toggleTheme = document.getElementById('toggle-theme');
const themeLabel = document.getElementById('theme-label');
const themeIcon = document.getElementById('theme-icon');
const themeImage = document.getElementById('theme-image');

// Cek tema yang tersimpan di localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    toggleTheme.checked = true; // Set toggle ke posisi 'checked'
}

// Ikon untuk Light Mode (Matahari)
const lightModeIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="yellow" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="5" fill="yellow" />
        <line x1="12" y1="0" x2="12" y2="4" stroke="orange" stroke-width="2"/>
        <line x1="12" y1="24" x2="12" y2="20" stroke="orange" stroke-width="2"/>
        <line x1="0" y1="12" x2="4" y2="12" stroke="orange" stroke-width="2"/>
        <line x1="24" y1="12" x2="20" y2="12" stroke="orange" stroke-width="2"/>
        <line x1="4.24" y1="4.24" x2="6.34" y2="6.34" stroke="orange" stroke-width="2"/>
        <line x1="17.66" y1="17.66" x2="19.76" y2="19.76" stroke="orange" stroke-width="2"/>
        <line x1="4.24" y1="19.76" x2="6.34" y2="17.66" stroke="orange" stroke-width="2"/>
        <line x1="17.66" y1="6.34" x2="19.76" y2="4.24" stroke="orange" stroke-width="2"/>
    </svg>
`;


// Event listener untuk toggle tema
toggleTheme.addEventListener('change', () => {
    if (toggleTheme.checked) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark'); // Simpan tema ke localStorage
        themeLabel.textContent = 'Light Mode'; // Ubah teks menjadi Light Mode
        themeIcon.innerHTML = lightModeIcon; // Ubah ikon menjadi matahari
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light'); // Simpan tema ke localStorage
        themeLabel.textContent = 'Dark Mode'; // Ubah teks menjadi Dark Mode
        themeIcon.textContent = '🌙'; // Ubah ikon menjadi bulan
    }
});
// Menambahkan event listener untuk ikon pengaturan
document.getElementById('settings').addEventListener('click', () => {
    const settingsOptions = document.getElementById('settings-options');
    // Toggle display
    if (settingsOptions.style.display === 'none' || settingsOptions.style.display === '') {
        settingsOptions.style.display = 'block';
    } else {
        settingsOptions.style.display = 'none';
    }
});

// Event listener untuk mengatur mode terang
document.getElementById('light-mode').addEventListener('click', () => {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    updateColors();
});

// Event listener untuk mengatur mode gelap
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


document.getElementById('send-image').addEventListener('click', () => {
    document.getElementById('image-input').click(); // Memicu klik pada input file
});

document.getElementById('send-image').addEventListener('click', () => {
    alert('Silakan pilih gambar dari perangkat Anda.'); // Notifikasi
    document.getElementById('image-input').click(); // Memicu klik pada input file
});

document.getElementById('send-image').addEventListener('click', () => {
    const notification = document.getElementById('notification');
    notification.innerText = 'Silakan pilih gambar dari perangkat Anda.';
    notification.classList.add('show');

    // Menyembunyikan notifikasi setelah 3 detik
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);

    document.getElementById('image-input').click(); // Memicu klik pada input file
});