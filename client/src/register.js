import "./style.css";

const $form = document.getElementById("register-form");
$form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData($form);
    const { username, email, password } = Object.fromEntries(formData.entries());
    const userId = Date.now().toString();



    // Realizar una solicitud POST a la API de inicio de sesión
    fetch("http://localhost:4321/auth/sign-up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    }).then((response) => {
        if (response.ok) {
            console.log(`se inicio correctamente y el id es ${userId}`);
            window.location.href = "../pages/login.html"; // NO SE DEBE CAMBIAR LA RUTA
        } else {
            return response.json().then((data) => {
                // Mostrar un mensaje de error al usuario
                alert(data.message || "Error al iniciar sesión. Verifica tus credenciales.");
            });
        }
    }).catch((error) => {
        console.error("Error de red:", error);
        alert("Error de red. Por favor, inténtalo de nuevo más tarde.");
    });
});
