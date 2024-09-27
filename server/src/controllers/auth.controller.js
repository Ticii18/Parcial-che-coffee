import { createJwt } from "../helpers/createJwt.js";
import { getUserByCredentials } from "../models/user.model.js";
import { hash, genSalt } from "bcrypt";
import crypto from "crypto";
import { usersCollection } from "../db/db.js";

export const getUserById = async (req,res) =>{
  try {
    const userId = req.params.userId;
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
    };

export const signInCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByCredentials(email, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await createJwt(user.id);

    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({
      token,
      userId: user.id, // Asegúrate de incluir el ID del usuario
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const signUpCtrl = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = {
      id: crypto.randomUUID().toString(), 
      username, 
      email,
      password: hashedPassword,
    };

    usersCollection.push(newUser); 
    const token = await createJwt(newUser.id); 

    res.cookie("token", token, { httpOnly: true });

    return res.status(201).json({
      message: "Registro exitoso",
      userId: newUser.id, 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const signOutCtrl = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Cierre de sesión exitoso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMeCtrl = (req, res) => {
  try {
    res.status(200).json({ userId: req.userId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  return;
};
