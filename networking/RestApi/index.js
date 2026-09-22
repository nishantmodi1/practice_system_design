import express from 'express';
import bodyParser from 'body-parser';

const port = 1111;
const app = express();
app.use(bodyParser.json())
// CRUD

const todos = [
  {
    id: 1,
    title: 'task 1',
    completed: false
  },
  {
    id: 2,
    title: 'task 2',
    completed: false
  }
]

//READ
app.get('/todos', (req, res) => {
   res.json(todos)
})

//create
app.post('/todos', (req, res) => {
  const newTodos= req.body;
  todos.push(newTodos)
  res.send('todos created successfully')
})


app.all('/', (req, res) => {
  console.log( 'request',req)
  console.log('response',res)
  res.send('I am up!')
})

app.listen(port, () => {
  console.log(`server is running on the port ${port}`)
})