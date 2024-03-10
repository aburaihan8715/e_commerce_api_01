import jwt from "jsonwebtoken";

// create token
const createJWT = (data, secretKey, expiresIn = "1h") => {
  if (!data || typeof data !== "object") throw new Error("data must be a non-empty object!");

  if (!secretKey || typeof secretKey !== "string") throw new Error("Secret key must be a non-empty string!");

  try {
    const token = jwt.sign(data, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.error("Failed to sing the JWT:", error);
    throw error;
  }
};

export { createJWT };
