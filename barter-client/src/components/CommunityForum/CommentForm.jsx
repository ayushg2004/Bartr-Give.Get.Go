"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { BACKEND_URL } from "@/constants"
import { toast } from "sonner"

const CommentForm = ({ threadId, onCommentAdded }) => {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`${BACKEND_URL}/api/forum/comments/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId, content }),
      })

      if (!response.ok) throw new Error("Failed to add comment")

      const data = await response.json()
      setContent("")
      toast.success("Comment added successfully!")
      if (onCommentAdded) onCommentAdded(data)
    } catch (error) {
      console.error("Error adding comment:", error)
      toast.error("Failed to add comment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts..."
        className="min-h-[100px]"
        disabled={isSubmitting}
      />
      <Button type="submit" className="flex gap-2" disabled={!content.trim() || isSubmitting}>
        <Send className="h-4 w-4" />
        {isSubmitting ? "Posting..." : "Post Comment"}
      </Button>
    </form>
  )
}

export default CommentForm

