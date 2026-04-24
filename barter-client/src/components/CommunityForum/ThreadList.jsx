import ThreadItem from "./ThreadItem"

const ThreadList = ({ threads, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-32 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (!threads.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No threads found. Be the first to create one!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <ThreadItem key={thread._id} thread={thread} />
      ))}
    </div>
  )
}

export default ThreadList

