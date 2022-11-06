export const save = (items) => {
  localStorage.setItem('cart', JSON.stringify(items))
}

export const validate = (username, password, password2, errors) => {
  if (username === '') {
    errors.push('The username is missing')
  }
  if (password === '') {
    errors.push('The password is too short')
  }
  if (password !== password2) {
    errors.push("The passwords doesn't match")
  }
}
