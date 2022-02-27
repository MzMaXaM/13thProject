const 
  loadCommentsBtn = document.getElementById('loadCommentsBtn'),
  formSubmit = document.querySelector('#commentsForm form button')

loadCommentsBtn.addEventListener('click', fetchComments)
formSubmit.addEventListener('click', saveComment)

async function fetchComments() {
  const postId = loadCommentsBtn.dataset.postid,
  commentsSection = document.getElementById('commentsSection')
  // console.log(`%c${postId}`, 'color: #7F95D1')

  const res = await fetch(`/posts/${postId}/comments`)
  const data = await res.json()

  commentsSection.innerHTML = ''
  commentsSection.appendChild(writeComments(data))
}

function writeComments(arr) {
  let res = document.createElement('ul')

  arr.forEach(comm => {
    const comment = document.createElement('li')
    comment.innerHTML = `
      <div class="comment-item">
        <h2>${comm.title}</h2>
        <p>${comm.text}</p>
      </div>
    `
    res.appendChild(comment)
  })

  return res
}

async function saveComment(event) {
  event.preventDefault()
  const postId = formSubmit.dataset.postid,
  titleInput = document.getElementById('title'),
  textInput = document.getElementById('text'),
  title = titleInput.value,
  text = textInput.value
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

  fetchComments()
}