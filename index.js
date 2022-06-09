// Global variables

let inputForm = document.getElementById("input-form")
let listItem = document.getElementById("new-list-item")
let list = document.getElementById("list-items")
let deleteBtn = document.getElementById("delete-btn")

let myTodos = []
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myTodos"))

let newItem = true
let itemId = 0

// Check Local Storage

if (leadsFromLocalStorage) {
  myTodos = leadsFromLocalStorage
  render(myTodos)
}

// Add new list item

inputForm.addEventListener("submit", addListItem)

function addListItem(event) {
  event.preventDefault()

  let ourFormData = new FormData(event.target)
  let newListItem = ourFormData.get("new")

  // Check if editing or creating a new item
  if (newItem) {
    let item = {
      name: newListItem,
      id: Date.now(),
    }

    myTodos.push(item)
  } else {
    const newList = myTodos.map((item) => {
      return item.id != itemId ? item : { ...item, name: newListItem }
    })

    myTodos = newList
  }

  localStorage.setItem("myTodos", JSON.stringify(myTodos))
  render(myTodos)

  listItem.value = ""
  newItem = true
}

// Render list items

function render(todos) {
  const toDoList = todos
    .map((item) => {
      return `
      <li>
        <p>${item.name}</p>
        <div>
          <i 
            class="ri-edit-box-line"
            id=${item.id}
            onclick=editItem(id)
          >
          </i>
          <i 
            class="ri-delete-bin-line" 
            id=${item.id}
            onclick=deleteItem(id)
          >
          </i>
        </div>
      </li>
    `
    })
    .join("")

  list.innerHTML = toDoList
  console.log(myTodos)
}

// Edit a list item
function editItem(id) {
  console.log(`Clicked! ${id}`)
  let editArr = myTodos.filter((item) => item.id == id)
  console.log(editArr)
  // console.log(myTodos)
  const editText = editArr[0].name

  listItem.value = editText

  // Use a boolean to toggle between existing item or new item
  newItem = false
  itemId = id
}

// Delete a list item
function deleteItem(id) {
  console.log(`Clicked! ${id}`)
  let newArr = myTodos.filter((item) => item.id != id)

  myTodos = newArr

  render(myTodos)
  localStorage.setItem("myTodos", JSON.stringify(myTodos))
}

// Delete all list items

deleteBtn.addEventListener("click", deleteAll)

function deleteAll() {
  localStorage.clear()
  myTodos = []
  render(myTodos)
}

// JSON SERVER WORKINGS
const url = "http://localhost:3000"

const newData = {
  name: "Ben Bright",
  salary: "10000",
}

const employeeId = 1

// GET DATA
const getData = async () => {
  const response = await fetch(`${url}/employees`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()
  console.log(data)
}

getData()

// GET SPECIFIC DATA ID
const getEmployeeData = async (id) => {
  const response = await fetch(`${url}/employees/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()
  console.log(data)
}

getEmployeeData(employeeId)

// POST DATA
const addEmployee = async () => {
  const response = await fetch(`${url}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Ben Bright",
      salary: 10000,
    }),
  })

  const data = await response.json()
  console.log(data)
}

// addEmployee()
