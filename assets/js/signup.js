/** @format */

const loginForm = document.querySelector('.js-login-form')
if (loginForm) {
  const nameInput = document.querySelector('#js-name-input')
  const usernameInput = document.querySelector('#js-username-input')
  const passwordInput = document.querySelector('#js-password-input')
  const submit = document.querySelector('#js-submit')

  function setLoading(state = true) {
    if (state) {
      nameInput.setAttribute('disabled', 'disabled')
      usernameInput.setAttribute('disabled', 'disabled')
      passwordInput.setAttribute('disabled', 'disabled')
      submit.setAttribute('disabled', 'disabled')
    } else {
      nameInput.removeAttribute('disabled')
      usernameInput.removeAttribute('disabled')
      passwordInput.removeAttribute('disabled')
      submit.removeAttribute('disabled')
    }
  }

  localStorage.clear()
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const errorName = document.querySelector('#name-message')
    const errorUser = document.querySelector('#username-message')
    const errorPass = document.querySelector('#password-message')
    errorName.innerText = ''
    errorUser.innerText = ''
    errorPass.innerText = ''

    const name = nameInput.value.trim()
    const username = usernameInput.value.trim()
    const password = passwordInput.value
    const fd = new FormData()
    fd.append('name', name)
    fd.append('username', username)
    fd.append('password', password)
    setLoading()
    fetch('/api.php?action=signup', { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.status !== 'success') {
          if (data.key === 'name') {
            errorName.innerText = data.message
          } else if (data.key === 'username') {
            errorUser.innerText = data.message
          } else if (data.key === 'password') {
            errorPass.innerText = data.message
          }
          setLoading(false)
        } else {
          localStorage.setItem('todoItems', JSON.stringify([]))
          localStorage.setItem('user', JSON.stringify(data.data))
          location.href = '/'
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  })
}
