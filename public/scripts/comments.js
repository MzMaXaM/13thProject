const loadCommentsBtn = document.getElementById('loadCommentsBtn')
const formSubmit = document.querySelector('#commentsForm form button')
const titleInput = document.getElementById('title')
const textInput = document.getElementById('text')

loadCommentsBtn.addEventListener('click', fetchComments)
formSubmit.addEventListener('click', saveComment)

async function fetchComments() {
  const postId = loadCommentsBtn.dataset.postId
  const res = await fetch(`/posts/${postId}/comments`)
  const data = await res.json()
  console.log(data)
}

async function saveComment(event) {
  event.preventDefault()
  const postId = formSubmit.dataset.postId
  const title = titleInput.value
  const text = textInput.value
  console.log(`%c${postId}`, 'color: #7F95D1')

  const comment = {
    title: title,
    text: text
  }
  const res = await fetch(`/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json'
    }
  })

}