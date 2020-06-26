const cool = require('cool-ascii-faces');
const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/badposttext', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("INSERT INTO note(message) VALUES('Hey another note in ATRAApps')");
      res.send('inserted another note');
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .post('/posttext', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("INSERT INTO note(message) VALUES($1)", ['Hey a note POSTed and safely INSERTed in MITRA']);
      res.send('inserted another note via POST with safe INSERT');
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/gettext', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM note');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/note', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/cool', (req, res) => res.send(cool()))
  .get('/times', (req, res) => res.send(showTimes()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  showTimes = () => {
    let result = '';
    const times = process.env.TIMES || 5;
    for (i = 0; i < times; i++) {
      result += i + ' ';
    }
    return result;
  }
