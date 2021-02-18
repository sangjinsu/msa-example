import axios from 'axios'
import { FormEvent, useState } from 'react'

const CommentCreate = ({ postId }: { postId: string }) => {
  const [content, setContent] = useState<string>('')
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    })
    setContent('')
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="">New Comment</label>
          <input
            type="text"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default CommentCreate
