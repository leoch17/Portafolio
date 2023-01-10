const express = require('express');
const app = express();
app.listen(3000, () => {
  console.log('servidor encendido');
});
app.use(express.static('public'));