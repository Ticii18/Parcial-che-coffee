import jwt from "jsonwebtoken";
const SECRET_KEY= "asdfa0s2k323j230a-as092323jalsdzxcv-a20342" 

export const createJwt = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    jwt.sign(
      payload,
      SECRET_KEY,
      {
        expiresIn: "4h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};