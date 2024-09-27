// Importar estilos CSS
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Swal from "sweetalert2";

// Importar componentes
import { navbar } from "./components/navbar";
import { hero } from "./components/hero";
import { services } from "./components/services";


// Obtener el elemento raíz del DOM donde se montarán los componentes
const $root = document.getElementById("root");
const userId = localStorage.getItem("userId");
// Realizar una solicitud para obtener la sesión del usuario actual
await fetch(`http://localhost:4321/auth/me/${userId}`)
  .then((response) => {
    if (response.ok) {
      const data = response.json();
      return { 
        valid: true, 
        userId: data.userId,
        username: data.username // Cambiado de userName a username
     }}
  })
  .then((session) => {
    // Añadir el componente de la barra de navegación al elemento raíz
    $root.appendChild(navbar(session ? { user: session } : null));
    // Añadir el componente de héroe al elemento raíz
    $root.appendChild(hero());
    // Añadir el componente de servicios al elemento raíz
    $root.appendChild(services(session ? { user: session } : null));
  })
  .catch((error) => {
    console.error("Probablemente el servidor no está corriendo", error);

    setTimeout(() => {
      Swal.fire({
        title: "Error",
        text: "¡Algo salió mal! Por favor, comprueba que el servidor esté corriendo o recarga la página.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }, 1000);
  });
