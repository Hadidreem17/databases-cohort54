const mysql = require('mysql2/promise');

async function main() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',     
    database: 'bank_db'
  });

  try {
    const createAccountTable = `
      CREATE TABLE IF NOT EXISTS account (
        account_number INT PRIMARY KEY,
        balance DECIMAL(15, 2) NOT NULL
      ) ENGINE=InnoDB;
    `;

    const createAccountChangesTable = `
      CREATE TABLE IF NOT EXISTS account_changes (
        change_number BIGINT AUTO_INCREMENT PRIMARY KEY,
        account_number INT NOT NULL,
        amount DECIMAL(15, 2) NOT NULL,
        changed_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        remark VARCHAR(255),
        FOREIGN KEY (account_number) REFERENCES account(account_number)
          ON UPDATE CASCADE
          ON DELETE RESTRICT
      ) ENGINE=InnoDB;
    `;

    await connection.execute(createAccountTable);
    await connection.execute(createAccountChangesTable);

    console.log('Tables "account" and "account_changes" created successfully.');
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    await connection.end();
  }
}

main();
