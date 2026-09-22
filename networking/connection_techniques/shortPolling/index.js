const express = require('express');
const app = express();

let data = "Initial Data";
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/getData', (req, res) => {
  res.send({
    data
  })
})

// use post/put to update the data
app.get('/updateData', (req, res) => {
  data = "Updated data at " + new Date().toLocaleTimeString();
  res.send({
    message: "Data updated"
  })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});