import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

const defaultData = {
  coaster: { tripName: "", seats: [] },
  cabin: { tripName: "", seats: [] }
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Fetch current seat reservations
  if (req.method === 'GET') {
    try {
      const data = await redis.get('seat_database');
      return res.status(200).json(data || defaultData);
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

  // POST: Save updated seat reservations
  if (req.method === 'POST') {
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