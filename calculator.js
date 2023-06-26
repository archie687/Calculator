const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/calculate', (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  const operator = req.body.operator;

  let result;
  let error = false;

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (num2 === 0) {
        error = true;
        result = 'Division by zero is not allowed';
      } else {
        result = num1 / num2;
      }
      break;
    default:
      error = true;
      result = 'Invalid operator';
  }

  if (error) {
    res.send(`<h3>Error: ${result}</h3>`);
  } else {
    res.send(`<h3>Result: ${result}</h3>`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
