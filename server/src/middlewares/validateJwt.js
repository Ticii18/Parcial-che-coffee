import { getUserById } from "../controllers/auth.controller.js";
import jwt from "jsonwebtoken";

// Validate JWT middleware
export const validateJwt = async (req, res, next) => {
  // Obtener el token de las cookies
  const token = req.cookies.token;

  // Si no hay token, responde con un mensaje de error
  if (!token) {
    return res.status(401).json({ message: "Session is required" });
  }

  // Verifica el token
  try {
    // Asegúrate de que la clave secreta se obtenga de una variable de entorno
    const { userId } = jwt.verify(token, process.env.JWT_SECRET || "secret");

    // Obtener el usuario por su ID
    const user = await getUserById(userId);

    // Si no se encuentra el usuario, responde con un mensaje de error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Añadir el usuario a la solicitud
    req.user = user;

    // Llama al siguiente middleware
    next();
  } catch (err) {
    // Manejar errores de verificación de token
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid session" });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired" });
    }
    
    // Otros errores
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
