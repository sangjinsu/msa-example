export type Comment = {
  id: string
  content: string
  postId: string
  status: string
}

const CommentList = ({ comments }: { comments: Comment[] }) => {
  const renderedCommnts = comments.map((comment) => {
    let content = ''
    if (comment.status === 'approved') {
      content = comment.content
    }
    if (comment.status === 'pending') {
      content = 'This comment is awating moderation'
    }
    if (comment.status === 'rejected') {
      content = 'This comment has been rejected'
    }
    return <li key={comment.id}>{content}</li>
  })
  return <ul>{renderedCommnts}</ul>
}

export default CommentList
