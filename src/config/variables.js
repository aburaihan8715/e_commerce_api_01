import "dotenv/config";

const serverPort = process.env.SERVER_PORT || 5001;
const mongodbLocalUri = process.env.MONGODB_LOCAL_URI;

export { serverPort, mongodbLocalUri };
