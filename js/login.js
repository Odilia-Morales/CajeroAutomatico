
const accounts = [
    { nombre: "mali", saldo: 900, password: "123456" },
    { nombre: "joss", saldo: 500, password: "12345" },
    { nombre: "alex", saldo: 700, password: "jkhkl" },
    { nombre: "andrea", saldo: 700, password: "123456" },
];

const form = document.querySelector('#loginForm');



form.addEventListener('submit', event => {
    event.preventDefault(); 

    if (form.checkValidity()) {
        if (validateCredentials(form)) {
            saveToLocalStorage(form);

         
            showLoaderAndRedirect({ url: './pages/inicio.html' }); // Muestra el loader y redirige a la página de inicio
        } else {
            showAlert({ message: 'Usuario o contraseña incorrectos' });
        }
    } else {
        event.stopPropagation(); 
    }
});

function showLoaderAndRedirect({ url }) {
    showLoader(); 

    setTimeout(() => {
        hideLoader(); 
        form.submit(); 
        window.location.href = url; 
    }, 3000);
}


function validateCredentials({ userName, userPassword }) {
    const { value: user } = userName;
    const { value: pass } = userPassword;

    // Verifica si las credenciales coinciden con alguna cuenta del arreglo
    return accounts.some(acc => acc.nombre === user && acc.password === pass);
}

function saveToLocalStorage({ userName, userPassword }) {
    const { value: user } = userName;
    const { value: pass } = userPassword;
    const acc = accounts.find(acc => acc.nombre === user && acc.password === pass);

    // Guarda los valores en el almacenamiento local
    for (prop in acc) {
        localStorage.setItem(prop, acc[prop]);
    }
}


function showAlert({ message }) {
    alert(message);
}

/* LOADER */

function showLoader() {
    document.querySelector('#loader').classList.remove('d-none');
    document.querySelector('#loader').classList.add('overlay');
}

function hideLoader() {
    document.querySelector('#loader').classList.add('d-none');
}


