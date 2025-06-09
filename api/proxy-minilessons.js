export default async function handler(req, res) {
  const url = 'https://englishlearningco.onrender.com/api/generate-minilessons';

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && {
          Authorization: req.headers.authorization,
        }),
      },
      body: req.method === 'GET' ? null : JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error', detail: error.toString() });
  }
}
