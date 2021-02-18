import axios from 'axios'
import { FormEvent, useState } from 'react'

const PostCreate = () => {
  const [title, setTitle] = useState<string>('')

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await axios.post('http://localhost:4000/posts', { title })
    setTitle('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default PostCreate
