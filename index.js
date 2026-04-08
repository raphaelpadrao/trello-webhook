const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

const CALLMEBOT_PHONE = process.env.CALLMEBOT_PHONE;
const CALLMEBOT_APIKEY = process.env.CALLMEBOT_APIKEY;
const TARGET_LIST = 'Campanhas - a subir (Zavi)';

app.head('/', (req, res) => res.sendStatus(200));
app.get('/', (req, res) => res.status(200).send('OK'));

app.post('/', async (req, res) => {
  res.sendStatus(200);
  try {
    const action = req.body?.action;
    if (!action || action.type !== 'updateCard') return;
    if (!action.data?.listAfter) return;
    if (action.data.listAfter.name !== TARGET_LIST) return;

    const cardName = action.data.card.name;
    const msg = `🔔 Trello: O card ${cardName} entrou na fila ${TARGET_LIST}`;
    const url = `https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${encodeURIComponent(msg)}&apikey=${CALLMEBOT_APIKEY}`;
    await fetch(url);
  } catch (e) {
    console.error(e);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
