// GLOBAL VARIABLES
let inputForm = document.getElementById("input-form")
let listItem = document.getElementById("new-list-item")
let list = document.getElementById("list-items")
let deleteBtn = document.getElementById("delete-btn")

let myTodos = []
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myTodos"))

let newItem = true
let itemId = 0

// CHECK LOCAL STORAGE
if (leadsFromLocalStorage) {
  myTodos = leadsFromLocalStorage
  render(myTodos)
}

// ADD NEW LIST ITEM
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
    addDataToServer(newListItem)
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

const addDataToServer = async (item) => {
  const response = await fetch(`${url}/toDoList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: item,
    }),
  })

  const data = await response.json()
  console.log(data)
}

// RENDER LIST ITEMS
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

// EDIT LIST ITEM
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

// DELETE A LIST ITEM
function deleteItem(id) {
  console.log(`Clicked! ${id}`)
  let newArr = myTodos.filter((item) => item.id != id)

  myTodos = newArr

  render(myTodos)
  localStorage.setItem("myTodos", JSON.stringify(myTodos))
}

// DELETE ALL LIST ITEMS
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
  const response = await fetch(`${url}/toDoList`, {
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
  const response = await fetch(`${url}/toDoList/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()
  console.log(data)
}

getEmployeeData(employeeId)

// DELETE A SPECIFIC ID
const deleteEmployee = async (id) => {
  const response = await fetch(`${url}/toDoList/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()
  console.log(data)
}

// deleteEmployee(2)

// POST DATA
const addEmployee = async () => {
  const response = await fetch(`${url}/toDoList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Ben Bright",
    }),
  })

  const data = await response.json()
  console.log(data)
}
