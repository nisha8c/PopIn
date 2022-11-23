// api/user/:id
// get user ID
// create a data entry/ insert with date
const { MongoClient } = require('mongodb');
const url = process.env.MONGODB_URI;

const dataBaseName = 'PopIn';
let client;
let users;

const connectToMongo = async () => {
  client = await MongoClient.connect(url, { useNewUrlParser: true });
  const db = client.db(dataBaseName);
  users = db.collection('users');
  // db.on('close', () => console.log('closing connection'));
  // db.on('reconnect', () => console.log('reconnected'));
};

const getUserId = async (id) => {
  await connectToMongo();
  const userId = await users.findOne({ id: id });
  setTimeout(() => client.close(), 1000);
  return productQuantity;
};

export default async function handler(req, res) {
  return res.status(404).json({message: 'Bad request'});
}