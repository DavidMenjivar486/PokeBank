// Obtener referencias a elementos del DOM
const loginbtn = document.getElementById("loginbtn"); // Botón de inicio de sesión
const pinlabel = document.getElementById("pinLABEL"); // Campo de entrada para el PIN

// Intentar obtener el PIN almacenado en LocalStorage
let storedPIN = localStorage.getItem("PIN");

// Si no hay PIN almacenado, establecer uno predeterminado y guardarlo en LocalStorage
if (!storedPIN) {
  storedPIN = "1234";
  localStorage.setItem("PIN", storedPIN);
}

// Agregar el evento al presionar la tecla "Enter" en el formulario
loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto
    attemptLogin();
});

// Agregar el evento al hacer clic en el botón de inicio de sesión
loginbtn.addEventListener('click', () => {
  attemptLogin();
});

// Función para intentar iniciar sesión
function attemptLogin() {
  // Verificar si el valor ingresado en el campo de entrada coincide con el PIN almacenado
  if (pinlabel.value === storedPIN) {
    // Si coincide, redirigir a la página del menú
    location.href = "menu.html#";
  } else {
    // Si no coincide, mostrar una alerta indicando que el PIN es incorrecto
    window.alert("Incorrect PIN, try again");
  }
}
