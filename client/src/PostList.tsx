import axios from 'axios'
import { useEffect, useState } from 'react'
import CommentCreate from './CommentCreate'
import CommentList, { Comment } from './CommentList'

type Posts = {
  [k: string]: Post
}

type Post = {
  id: string
  title: string
  comments: Comment[]
}

const PostList = () => {
  const [posts, setPosts] = useState<Posts>({})
  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4002/posts')
    console.log(res.data)
    setPosts(res.data)
  }
  useEffect(() => {
    fetchPosts()
  }, [])

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id}></CommentCreate>
        </div>
      </div>
    )
  })
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between ">
      {renderedPosts}
    </div>
  )
}

export default PostList
