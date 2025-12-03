Exercise 3.3 – SQL Injection

 1. Example values that exploit SQL Injection

A malicious user can inject SQL code by passing the following values:

- **name:**
' OR '1'='1

- **code:**
abc

These values modify the SQL query so that the condition becomes always true:
Name = '' OR '1'='1'

Because `'1'='1'` is always TRUE, the query will return **all records in the database**, demonstrating SQL injection.


2. Secure version of the function (protected from SQL injection)

We fix the vulnerability by using **prepared statements** instead of string concatenation:

```js
function getPopulation(Country, name, code, cb) {
  const sql = "SELECT Population FROM ?? WHERE Name = ? AND code = ?";

  conn.query(sql, [Country, name, code], function (err, result) {
    if (err) return cb(err);
    if (result.length === 0) return cb(new Error("Not found"));
    cb(null, result[0].Population);
  });
}