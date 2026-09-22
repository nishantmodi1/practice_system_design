const express = require('express');
const app = express();

let data = "Initial Data";
const waitingClient = []

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/getData', (req, res) => {
  if(data !== req.query.lastData){
    res.json({ data })
  }else {
    waitingClient.push(res)
  }
})

// use post/put to update the data
app.get('/updateData', (req, res) => {
  data = req.query.data

  while(waitingClient.length>0){
    const client = waitingClient.pop()
    client.json({ data  })
  }
  res.send({ success: 'data updated successfully'})
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});