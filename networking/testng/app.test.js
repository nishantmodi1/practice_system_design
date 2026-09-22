const sortByAge = require('./app')

test("Testing if the first user is Alice after sorting", () => {
  const sortedData = sortByAge()

  expect(sortedData[0].name).toBe("Alice")
})

test("Testing if the last user is Bob after sorting", () => {
  const sortedData = sortByAge()

  expect(sortedData[sortedData.length-1].name).toBe("Bob")
})

test("Testing if sorting data length has length of 4", () => {
  const sortedData = sortByAge()

  expect(sortedData.length).toBe(4)
})

test("Testing if sorting data return undefined ", () => {
  const sortedData = sortByAge()

  expect(sortedData).not.toBe(undefined)
})