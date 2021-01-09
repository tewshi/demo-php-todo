/** @format */

const loginForm = document.querySelector('.js-login-form')
if (loginForm) {
  const usernameInput = document.querySelector('#js-username-input')
  const passwordInput = document.querySelector('#js-password-input')
  const submit = document.querySelector('#js-submit')

  function setLoading(state = true) {
    if (state) {
      usernameInput.setAttribute('disabled', 'disabled')
      passwordInput.setAttribute('disabled', 'disabled')
      submit.setAttribute('disabled', 'disabled')
    } else {
      usernameInput.removeAttribute('disabled')
      passwordInput.removeAttribute('disabled')
      submit.removeAttribute('disabled')
    }
  }

  localStorage.clear()
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const errorDiv = document.querySelector('#login-message')
    errorDiv.innerText = ''
    const usernameInput = document.querySelector('#js-username-input')
    const passwordInput = document.querySelector('#js-password-input')

    const username = usernameInput.value.trim()
    const password = passwordInput.value
    const fd = new FormData()
    fd.append('username', username)
    fd.append('password', password)
    setLoading()
    fetch('/api.php?action=login', { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 'success') {
          errorDiv.innerText = data.message
          setLoading(false)
        } else {
          localStorage.setItem('todoItems', JSON.stringify(data.data.todos))
          localStorage.setItem('user', JSON.stringify(data.data.user))
          location.href = '/'
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  })
}
