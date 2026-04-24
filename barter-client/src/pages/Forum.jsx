"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ThreadList from "@/components/CommunityForum/ThreadList"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { BACKEND_URL } from "@/constants"
import { toast } from "sonner"

const Forum = () => {
  const [threads, setThreads] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${BACKEND_URL}/api/forum/threads/`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })

        if (!response.ok) throw new Error("Failed to fetch threads")

        const data = await response.json()
        setThreads(data)
      } catch (error) {
        console.error("Error fetching threads:", error)
        toast.error("Failed to load threads. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Community Forum</h1>
          <p className="text-muted-foreground mt-1">Join the conversation with fellow community members</p>
        </div>
        <Button asChild>
          <Link to="/forum/create" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Thread
          </Link>
        </Button>
      </div>
      <ThreadList threads={threads} isLoading={isLoading} />
    </div>
  )
}

export default Forum

