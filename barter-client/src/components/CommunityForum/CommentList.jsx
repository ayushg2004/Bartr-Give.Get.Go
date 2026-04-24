import CommentItem from "./CommentItem"
import { ScrollArea } from "@/components/ui/scroll-area"

const CommentList = ({ comments }) => {
  if (!comments.length) {
    return (
      <div className="mt-6 text-center py-8">
        <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
      </div>
    )
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Comments ({comments.length})</h3>
      <ScrollArea className="h-[400px] pr-4">
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      </ScrollArea>
    </div>
  )
}

export default CommentList

