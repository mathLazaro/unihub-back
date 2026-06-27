const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
  host: 'localhost',
  port: 5435,
  user: 'postgres',
  password: '12345678',
  database: 'unihub_db',
});

async function run() {
  await client.connect();
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'seeder.sql'), 'utf8');
    const res = await client.query(sql);
    console.log('Seeder executado com sucesso!');
  } catch (error) {
    console.error('Erro ao executar seeder:', error);
  } finally {
    await client.end();
  }
}

run();
