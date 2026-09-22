const users=[
  {name: "Nishant", age: 29},
  {name: "Akshay", age: 28},
  {name: "Bob", age: 30},
  {name: "Alice", age: 27},
]

function sortByAge(){
  const data=users.sort((a, b) => a.age - b.age)
  // return data
}

console.log(sortByAge())

module.exports = sortByAge