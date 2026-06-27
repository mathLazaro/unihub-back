const { Client } = require('pg');

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
    // Apaga os registros duplicados de documento, mantendo o de menor ID para cada grupo de documento.
    const query = `
      DELETE FROM users 
      WHERE id NOT IN (
        SELECT (array_agg(id ORDER BY created_at ASC))[1] 
        FROM users 
        GROUP BY documento
      )
    `;
    const res = await client.query(query);
    console.log(`Deletados ${res.rowCount} usuários duplicados com base no documento.`);
  } catch (error) {
    console.error('Erro ao deletar:', error);
  } finally {
    await client.end();
  }
}

run();
