const mysql = require('mysql2/promise');

async function main() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bank_db'
  });

  try {
    const insertAccounts = `
      INSERT INTO account (account_number, balance)
      VALUES
        (101, 5000.00),
        (102, 2000.00),
        (103, 7500.00)
      ON DUPLICATE KEY UPDATE
        balance = VALUES(balance);
    `;

    await connection.execute(insertAccounts);

    const insertChanges = `
      INSERT INTO account_changes (account_number, amount, remark)
      VALUES
        (101, 5000.00, 'Initial deposit'),
        (102, 2000.00, 'Initial deposit'),
        (103, 7500.00, 'Initial deposit');
    `;

    await connection.execute(insertChanges);

    console.log('Sample data inserted into "account" and "account_changes".');
  } catch (err) {
    console.error('Error inserting sample data:', err);
  } finally {
    await connection.end();
  }
}

main();
