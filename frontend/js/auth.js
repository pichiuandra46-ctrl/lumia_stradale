// ==========================================
// 1. LOGICA PENTRU ÎNREGISTRARE (REGISTER)
// ==========================================
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const name = document.getElementById('regName').value;
    const phone = document.getElementById('regPhone').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        // !!! AICI MODIFICI: Înlocuiești localhost:3000 cu link-ul tău de pe RENDER !!!
        const response = await fetch('https://lumia-stradale.onrender.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Cont creat cu succes! Te redirecționăm la Login.');
            window.location.href = 'autentificare.html'; // Schimbat din login.html în autentificare.html conform structurii tale
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Eroare de conexiune cu serverul!');
    }
});

// ==========================================
// 2. LOGICA PENTRU CONECTARE (LOGIN)
// ==========================================
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const email = document.getElementById('loginEmail')?.value;
    const password = document.getElementById('loginPassword')?.value;

    try {
        // !!! ȘI AICI MODIFICI: Înlocuiești localhost:3000 cu link-ul tău de pe RENDER !!!
        const response = await fetch('https://lumia-stradale.onrender.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'index.html'; 
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Eroare de conexiune cu serverul!');
    }
});