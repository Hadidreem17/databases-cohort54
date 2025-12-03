const mysql = require('mysql2/promise');

async function transferAmount(fromAccount, toAccount, amount) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bank_db'
  });

  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute(
      'SELECT balance FROM account WHERE account_number = ? FOR UPDATE',
      [fromAccount]
    );

    if (rows.length === 0) {
      throw new Error(`Source account ${fromAccount} does not exist.`);
    }

    const currentBalance = parseFloat(rows[0].balance);
    if (currentBalance < amount) {
      throw new Error(`Insufficient funds in account ${fromAccount}.`);
    }

    await connection.execute(
      'UPDATE account SET balance = balance - ? WHERE account_number = ?',
      [amount, fromAccount]
    );

    const [toRows] = await connection.execute(
      'SELECT balance FROM account WHERE account_number = ? FOR UPDATE',
      [toAccount]
    );

    if (toRows.length === 0) {
      throw new Error(`Destination account ${toAccount} does not exist.`);
    }

    await connection.execute(
      'UPDATE account SET balance = balance + ? WHERE account_number = ?',
      [amount, toAccount]
    );

    await connection.execute(
      'INSERT INTO account_changes (account_number, amount, remark) VALUES (?, ?, ?)',
      [fromAccount, -amount, `Transfer to account ${toAccount}`]
    );

    await connection.execute(
      'INSERT INTO account_changes (account_number, amount, remark) VALUES (?, ?, ?)',
      [toAccount, amount, `Transfer from account ${fromAccount}`]
    );

    await connection.commit();
    console.log(`Successfully transferred ${amount} from ${fromAccount} to ${toAccount}.`);
  } catch (err) {
    console.error('Error during transaction, rolling back...', err.message);
    await connection.rollback();
  } finally {
    await connection.end();
  }
}

transferAmount(101, 102, 1000.00);
