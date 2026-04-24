import CreateThreadForm from "@/components/CommunityForum/CreateThreadForm"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const CreateThread = () => {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="ghost" className="mb-4" asChild>
          <Link to="/forum" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Forum
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Start a Discussion</h1>
        <p className="text-muted-foreground mt-2">Share your thoughts with the community</p>
      </div>
      <CreateThreadForm />
    </div>
  )
}

export default CreateThread

