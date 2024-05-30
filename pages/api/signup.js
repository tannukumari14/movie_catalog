import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const usersFilePath = path.join(process.cwd(), 'data', 'users.json');
    const usersData = fs.readFileSync(usersFilePath, 'utf-8');
    const users = JSON.parse(usersData);

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    users.push({ email, password });
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    return res.status(200).json({ message: 'Signup successful' });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}