let sidebar = document.querySelector('.sidebar');
let closeBtn = document.querySelector('#btn');
let messagesDiv = document.getElementById('messages');
let historyList = document.getElementById('history-list');
let historyQuestions = document.getElementById('history-questions');
let quickQuestions = document.getElementById('quick-questions');
let settingsOptions = document.getElementById('settings-options');

// Load history from localStorage
let historyData = JSON.parse(localStorage.getItem('chatHistory')) || [];

// Display history on page load
historyData.forEach(question => {
    addToHistory(question);
});

// Toggle sidebar open/close
closeBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    if (sidebar.classList.contains('open')) {
        openSidebar(); // Buka sidebar dan kontennya
        updateFooterPosition(); // Update posisi footer
    } else {
        closeSidebar(); // Tutup sidebar dan kontennya
        updateFooterPosition(); // Update posisi footer
    }
});

function updateFooterPosition() {
    const footer = document.querySelector('.footer');
    if (sidebar.classList.contains('open')) {
        footer.style.left = '640px'; // Geser sedikit ke kanan saat sidebar terbuka
        footer.style.transform = 'translateX(0)'; // Reset transform
    } else {
        footer.style.left = '50%'; // Kembalikan posisi footer saat sidebar tertutup
        footer.style.transform = 'translateX(-50%)'; // Kembalikan transform
    }
}

// Function to open sidebar and its contents
function openSidebar() {
    sidebar.classList.add('open');
}

// Function to close sidebar and all its contents
function closeSidebar() {
    sidebar.classList.remove('open');
    closeSidebarContents(); // Tutup semua konten
}

// Function to close all sidebar contents
function closeSidebarContents() {
    settingsOptions.style.display = 'none'; // Tutup opsi pengaturan
    historyList.style.display = 'none'; // Tutup riwayat
}

document.getElementById('settings').addEventListener('click', () => {
    openSidebar(); // Buka sidebar
    closeSidebarContents(); // Tutup semua konten
    settingsOptions.style.display = 'block'; // Tampilkan opsi pengaturan
});

// Event listeners for sidebar items
document.getElementById('new-chat').addEventListener('click', () => {
    messagesDiv.innerHTML = '';
    openSidebar(); // Buka sidebar
    closeSidebarContents(); // Tutup semua konten
});

document.getElementById('history').addEventListener('click', () => {
    openSidebar(); // Buka sidebar
    closeSidebarContents(); // Tutup semua konten
    historyList.style.display = 'none'; // Tampilkan riwayat
});

document.getElementById('settings').addEventListener('click', () => {
    openSidebar(); // Buka sidebar
    closeSidebarContents(); // Tutup semua konten
    settingsOptions.style.display = 'none'; // Tampilkan opsi pengaturan
});


// Clear history
document.getElementById('clear-history').addEventListener('click', () => {
    historyData = [];
    updateHistory();
    localStorage.removeItem('chatHistory');
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

    let pendingImage = null;
            
 function handleSend() {
        const messageText = userInput.value.trim();

        if (messageText === '') return; // Pastikan ada input atau gambar

        const triggerImgs = ['buatlah gambar', 'buatkan gambar']; // Array trigger

        // Cek apakah input mengandung salah satu trigger
        const isImageRequest = triggerImgs.some(trigger => messageText.toLowerCase().startsWith(trigger));

        // Kirim pesan dan gambar (jika ada)
        if (isImageRequest) {
            resImg(); 
        }else if (!isImageRequest && !pendingImage) {
            sendMessage(messageText); // Panggil fungsi sendMessage
        }else{
            sendImg(messageText);
        } 
        
        
        pendingImage = null; // Reset gambar setelah mengirim
        userInput.value = ''; // Kosongkan input setelah mengirim
        userInput.focus(); // Fokus kembali ke input
    }
   
    // cencel senMessage
    let isLoading = false; // State to keep track of loading status
    const cancelButton = document.getElementById('cancel-button');
    
    // Function to send a message
    async function sendMessage(messageText = '') {
        const userInput = document.getElementById('user-input').value;
        const inputText = userInput.value;
    
        // Check if message is empty
        if (messageText.trim() === '' && inputText.trim() === '') return;
    
        // Show the cancel button
        cancelButton.classList.remove('hidden');
        isLoading = true;
    
        // Create user message div
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'user-message';
    
        const userIcon = document.createElement('img');
        userIcon.src = 'chatbox/img/profil.png'; // Path to user icon
        userIcon.alt = 'User Icon';
        userIcon.className = 'message-icon';
    
        const userText = document.createElement('span');
        userText.textContent = messageText || inputText; // Use either messageText or user input
    
        userMessageDiv.appendChild(userIcon);
        userMessageDiv.appendChild(userText);
    
        messagesDiv.appendChild(userMessageDiv);
        userMessageDiv.scrollIntoView({ behavior: 'smooth' });
        userInput.value = ''; // Clear the input field
    
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
        
        // Fetch response from the server
        const res = await fetch('/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
            body: JSON.stringify({ message: messageText || inputText }),
        });
    
        const data = await res.json();
    
        // Update history and storage
        historyData.push(messageText || inputText);
        localStorage.setItem('chatHistory', JSON.stringify(historyData));
        addToHistory(messageText || inputText);
    
        // Simulate AI response delay
        setTimeout(async () => {
            // Remove loading indicator
            messagesDiv.removeChild(loadingDiv);
    
            // AI response
            let hasil = data.replyText || 'Error: ' + data.error;
    
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
    
            // Hide the cancel button after response
            cancelButton.classList.add('hidden');
            isLoading = false;
    
        }, 500); // Simulated delay of 5 seconds
    
        userInput.disabled = false;
    }
    
    // Function to cancel the loading
    function cancelLoading() {
        if (isLoading) {
            console.log("AI response cancelled.");
            // Hide the loading indicator and cancel button
            cancelButton.classList.add('hidden');
            isLoading = false;
        }
    }
    

async function resImg() {
    const input = document.getElementById('user-input');
    const userInput = input.value
    if (userInput.trim() === '') return;
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
    userText.textContent = userInput;

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

    userInput.value = '';

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const res = await fetch('/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ message: userInput }),
    });

    

    const data = await res.json();

    // Update history and storage
    historyData.push(userInput);
    localStorage.setItem('chatHistory', JSON.stringify(historyData));
    addToHistory(userInput);

    // Simulate AI response delay
    setTimeout(async () => {
        messagesDiv.removeChild(loadingDiv);

        // AI response
        let hasil = data.replyImg || 'Error: ' + data.error;

        // Create AI response div
        const aiResponseDiv = document.createElement('img');
        aiResponseDiv.className = 'ai-response';
        aiResponseDiv.style.width = '500px';
        aiResponseDiv.src = hasil

        const aiIcon = document.createElement('img');
        aiIcon.src = 'chatbox/img/ai.png'; // Path to AI icon
        aiIcon.alt = 'AI Icon';
        aiIcon.className = 'message-icon';

        aiResponseDiv.appendChild(aiIcon); // Add AI icon to AI response div
        messagesDiv.appendChild(aiResponseDiv);

        // Animate AI response
        animateAIResponse(hasil, aiResponseDiv);
        aiResponseDiv.scrollIntoView({ behavior: 'smooth' });
        aiResponseDiv.disabled = false;
        aiResponseDiv.focus(); // Fokus kembali ke input
    }, 500); // Simulated delay of 5 seconds

    userInput.disabled = false;
}

const imageDiv = document.getElementById('chat-image-div'); 

async function sendImg(file) {
    const input = document.getElementById('user-input');
    const userInput = input.value
    userInput.disabled = true;

    const formData = new FormData();
    formData.append('image', file); // Menambahkan file ke FormData

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const response = await fetch('/store', {
        method: 'POST',
        headers: {
            'X-CSRF-Token': csrfToken,            
        },
        body: formData,
    })

    const data = await response.json();

    pendingImage = '/storage/uploads/' + data.imageName;

    console.log(pendingImage);

     // Create user message div
     const userMessageDiv = document.createElement('div');
     userMessageDiv.className = 'user-message';
 
     const userIcon = document.createElement('img');
     userIcon.src = 'chatbox/img/profil.png'; // Path to user icon
     userIcon.alt = 'User Icon';
     userIcon.className = 'message-icon';
 
      // Tambahkan ikon pengguna ke div pesan
     userMessageDiv.appendChild(userIcon);
 
     const imgSend = document.createElement('img')
     imgSend.src = pendingImage
     imgSend.className = 'img-send'

     // Clear the image after sending
    pendingImage = null; // Reset pending image
    imageDiv.innerHTML = ''; // Clear image div  

    const userText = document.createElement('span');
    userText.textContent = userInput;

    userMessageDiv.appendChild(userIcon);
     // Tambahkan teks di bawah gambar (jika ada)
    userMessageDiv.appendChild(userText);

    // Tambahkan div pesan ke kontainer pesan
    messagesDiv.appendChild(userMessageDiv);

    userMessageDiv.appendChild(imgSend);
    
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

    userInput.value = '';

}

const imageInput = document.getElementById('image-input');

document.getElementById('send-image').addEventListener('click', () => {
    imageInput.click(); // Trigger file input click
});

document.getElementById('image-input').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Mengambil file yang dipilih
    if (file) {
        sendImg(file); // Panggil fungsi upload
    }
});

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
    window.location.href = "/logout"; // Arahkan ke halaman home untu icon di paling bawah sidebar ai
});

// document.getElementById('send-image').addEventListener('click', () => {
//     const notification = document.getElementById('notification');
//     notification.innerText = 'Silakan pilih gambar dari perangkat Anda.';
//     notification.classList.add('show');

//     // Menyembunyikan notifikasi setelah 3 detik
//     setTimeout(() => {
//         notification.classList.remove('show');
//     }, 3000);
// });

