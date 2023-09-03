async function handler(req, res) {
  const { name, email, message } = req.body;
  res.status(200).end();
}

export default handler;
