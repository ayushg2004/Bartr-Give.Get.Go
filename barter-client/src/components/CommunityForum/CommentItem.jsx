import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

const CommentItem = ({ comment }) => {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={comment.user.avatar} />
            <AvatarFallback>{comment.user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{comment.user.name}</h4>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </span>
            </div>
            <p className="text-foreground/90 leading-relaxed">{comment.content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CommentItem

