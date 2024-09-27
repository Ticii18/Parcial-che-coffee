import { hash, genSalt, compare } from "bcrypt";
import crypto from "crypto";
import { usersCollection } from "../db/db.js";


// Función para crear un usuario

// Función para obtener usuario por id

// Función para obtener usuario por credenciales
export const getUserByCredentials = async (email, password) => {
  const findedUser = usersCollection.find((user) => user.email === email);

  if (!findedUser) {
    return null;
  }

  const isPasswordMatch = await compare(password, findedUser.password);

  if (isPasswordMatch) {
    return findedUser;
  }

  return null;
};
