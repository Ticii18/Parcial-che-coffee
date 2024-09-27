import "./style.css";

const $form = document.getElementById("login-form");
$form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData($form);
  const entries = Object.fromEntries(formData.entries());

  // Realizar una solicitud POST a la API de inicio de sesión
  fetch("http://localhost:4321/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entries),
  }).then(async (response) => {
    if (response.ok) {
      return response.json(); // Espera la respuesta JSON
    } else {
      const data = await response.json();
      // Mostrar un mensaje de error al usuario
      alert(data.message || "Error al iniciar sesión. Verifica tus credenciales.");
    }
  }).then((data) => {
    // Almacenar el ID del usuario en localStorage si el inicio de sesión fue exitoso
    if (data && data.userId) {
      localStorage.setItem("userId", data.userId); // Almacena el ID en localStorage
      console.log(`Se inició sesión correctamente y el ID es ${data.userId}`);
      window.location.href = "/"; // NO SE DEBE CAMBIAR LA RUTA
    }
  }).catch((error) => {
    console.error("Error de red:", error);
    alert("Error de red. Por favor, inténtalo de nuevo más tarde.");
  });
});
