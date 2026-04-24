import { Link } from "react-router-dom"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const ThreadItem = ({ thread }) => {
  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Link
            to={`/forum/thread/${thread._id}`}
            className="text-xl font-semibold hover:text-primary transition-colors"
          >
            {thread.title}
          </Link>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={thread.author?.avatar} />
              <AvatarFallback>{thread.author?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2">{thread.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            {thread.commentCount || 0} comments
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
          </span>
        </div>
        <span>{thread.author?.name}</span>
      </CardFooter>
    </Card>
  )
}

export default ThreadItem

