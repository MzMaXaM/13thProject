const loadCommentsBtn = document.getElementById('loadCommentsBtn'),
 formSubmit = document.querySelector('#commentsForm form button'),
 titleInput = document.getElementById('title'),
 textInput = document.getElementById('text'),
 commentsSection = document.getElementById('commentsSection')

loadCommentsBtn.addEventListener('click', fetchComments)
formSubmit.addEventListener('click', saveComment)

async function fetchComments() {
  const postId = loadCommentsBtn.dataset.postid

  const res = await fetch(`/posts/${postId}/comments`)
  const data = await res.json()


}

async function saveComment(event) {
  event.preventDefault()
  const postId = formSubmit.dataset.postid
  const title = titleInput.value
  const text = textInput.value
  // console.log(`%c${postId}`, 'color: #7F95D1')

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