/** @format */

let todoItems = []
const errorDiv = document.querySelector('#error-message')
const input = document.querySelector('#js-input')
const btn = document.querySelector('#js-submit')
const empty = document.querySelector('#empty-state')
const userRef = localStorage.getItem('user')
const ref = localStorage.getItem('todoItems')
let user = {}

function setLoading(state = true) {
  if (state) {
    input.setAttribute('disabled', 'disabled')
    btn.setAttribute('disabled', 'disabled')
  } else {
    input.removeAttribute('disabled')
    btn.removeAttribute('disabled')
  }
}

function renderTodo(todo) {
  const list = document.querySelector('.js-todo-list')
  const item = document.querySelector(`[data-key='${todo.id}']`)

  if (item && todo.status === 'deleted') {
    item.remove()
    todoItems = todoItems.filter((item) => item.status !== 'deleted')

    if (todoItems.length == 0) {
      empty.classList.remove('d-none')
    } else {
      empty.classList.add('d-none')
    }

    localStorage.setItem('todoItems', JSON.stringify(todoItems))
    if (todoItems.length === 0) list.innerHTML = ''
    return
  }

  if (todoItems.length == 0) {
    empty.classList.remove('d-none')
  } else {
    empty.classList.add('d-none')
  }

  localStorage.setItem('todoItems', JSON.stringify(todoItems))

  const isChecked = todo.status === 'done' ? 'done' : ''
  const node = document.createElement('li')
  node.setAttribute('class', `list-group-item d-flex justify-content-between align-items-center ${isChecked}`)
  node.setAttribute('data-key', todo.id)
  node.innerHTML = `
    <div class="custom-control custom-control-alternative custom-checkbox w-100" data-key="${todo.id}">
        <input class="custom-control-input js-tick" id="${todo.id}" type="checkbox" />
        <label class="custom-control-label w-100" for="${todo.id}"><span>${todo.text}</span></label>
    </div>
    <button class="delete-todo js-delete-todo text-red">
        <i class="fa fa-trash fa-2x"></i>
    </button>
  `

  if (item) {
    list.replaceChild(node, item)
  } else {
    list.append(node)
  }
  if (isChecked) {
    document.querySelector(`[data-key="${todo.id}"] > input`).setAttribute('checked', 'checked')
  }
}

function addTodo(text) {
  errorDiv.innerText = ''
  const fd = new FormData()
  fd.append('text', text)
  fd.append('user', user.id)
  setLoading()
  fetch('/api.php?action=add-todo', { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
    .then((response) => response.json())
    .then((data) => {
      if (data.status !== 'success') {
        errorDiv.innerText = data.message
      } else {
        todoItems.push(data.data)
        renderTodo(data.data)
      }

      setLoading(false)
    })
    .catch((error) => {
      setLoading(false)
      console.log(error)
    })
}

function toggleDone(key) {
  errorDiv.innerText = ''
  const index = todoItems.findIndex((item) => item.id === Number(key))
  const item = todoItems[index]
  let status = 'done'
  if (item.status === 'done') {
    status = 'pending'
  }

  const fd = new FormData()
  fd.append('todo', item.id)
  fd.append('user', user.id)
  fd.append('status', status)
  fetch('/api.php?action=change-todo-status', { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
    .then((response) => response.json())
    .then((data) => {
      if (data.status !== 'success') {
        errorDiv.innerText = data.message
      } else {
        todoItems[index] = data.data
        renderTodo(todoItems[index])
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

function deleteTodo(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key))
  const item = todoItems[index]

  const fd = new FormData()
  fd.append('todo', item.id)
  fd.append('user', user.id)
  fetch('/api.php?action=delete-todo', { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
    .then((response) => response.json())
    .then((data) => {
      if (data.status !== 'success') {
        errorDiv.innerText = data.message
      } else {
        todoItems[index].status = 'deleted'
        renderTodo(todoItems[index])
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const form = document.querySelector('.js-form')
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const input = document.querySelector('.js-todo-input')

  const text = input.value.trim()
  if (text !== '') {
    addTodo(text)
    input.value = ''
    input.focus()
  }
})

const list = document.querySelector('.js-todo-list')
list.addEventListener('click', (event) => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key
    return toggleDone(itemKey)
  }

  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key
    deleteTodo(itemKey)
  }
})

document.addEventListener('DOMContentLoaded', () => {
  if (ref) {
    todoItems = JSON.parse(ref)
    todoItems.forEach((t) => {
      renderTodo(t)
    })
  }

  if (userRef) {
    user = JSON.parse(userRef)
  }
})

const logoutBtn = document.querySelector('#logout-button')
logoutBtn.addEventListener('click', (event) => {
  event.preventDefault()
  localStorage.clear()
  location.href = '/login.php'
})
