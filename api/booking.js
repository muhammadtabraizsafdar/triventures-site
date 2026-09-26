import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

const defaultData = {
  coaster: { tripName: "", seats: [] },
  cabin: { tripName: "", seats: [] }
};

const ADMIN_USER = "triventuresofficial7";
const ADMIN_PASS = "#TriVentures007";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-username, x-admin-password');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Publicly accessible to read seat availability
  if (req.method === 'GET') {
    try {
      const data = await redis.get('seat_database');
      return res.status(200).json(data || defaultData);
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

  // POST: Protected — checks username and password
  if (req.method === 'POST') {
    const user = req.headers['x-admin-username'];
    const pass = req.headers['x-admin-password'];

    if (user !== ADMIN_USER || pass !== ADMIN_PASS) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized: Invalid username or password' });
    }

    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      await redis.set('seat_database', payload);
      return res.status(200).json({ status: 'success', message: 'Data saved successfully' });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Failed to save data' });
    }
  }

  return res.status(405).json({ status: 'error', message: 'Method not allowed' });
}