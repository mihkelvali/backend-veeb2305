const express = require('express');
const cors = require('cors');
const pool = require('./config');

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
    res.send('Simple API homepage');
});

app.get('/api/treks', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM treks;'
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error.message});
  }
});

app.post('/api/treks', async (req, res) => {
  console.log(req.body);
  try {
    const { rows } = await pool.query(`
      INSERT INTO treks (
        name,
        latitude,
        longitude,
        price,
        image_url,
        start_time,
        end_time,
        description
      ) VALUES (
        '${req.body.name}',
        '${req.body.latitude}',
        '${req.body.longitude}',
        '${req.body.price}',
        '${req.body.imageUrl}',
        '${req.body.startTime}',
        '${req.body.endTime}',
        '${req.body.description}'
      );
    `);
    res.status(201).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error.message});
  }
});

app.put('/api/treks/:trekId', async (req, res) => {
  const trekId = req.params.trekId;
  console.log(req.body);

  try {
    const { rows } = await pool.query(`
      UPDATE treks 
      SET
        name = '${req.body.name}',
        latitude = '${req.body.latitude}'
      WHERE id = ${trekId};
    `);
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error.message});
  }
});

app.listen(10000, () => {
    console.log("Server running on port 10000");
});
