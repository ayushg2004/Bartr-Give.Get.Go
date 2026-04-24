import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentList from "@/components/CommunityForum/CommentList";
import CommentForm from "@/components/CommunityForum/CommentForm";
import { BACKEND_URL } from "@/constants";

const ThreadDetails = () => {
  const { id } = useParams();
  console.log("id", id);
  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchThreadAndComments = async () => {
      if (!id) return; // Prevent fetching if id is undefined
  
      try {
        const threadRes = await fetch(`${BACKEND_URL}/api/forum/threads/`,{
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
        if (!threadRes.ok) throw new Error("Failed to fetch thread");
        const threadData = await threadRes.json();
        setThread(threadData);
      } catch (error) {
        console.error("Error fetching thread:", error);
      }
  
      try {
        const commentsRes = await fetch(`${BACKEND_URL}/api/forum/comments/${id}`,{
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
        if (!commentsRes.ok) throw new Error("Failed to fetch comments");
        const commentsData = await commentsRes.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
  
    fetchThreadAndComments();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {thread ? (
        <>
          <h2 className="text-2xl font-semibold">{thread.title}</h2>
          <p className="text-gray-600 mt-2">{thread.content}</p>
          <CommentList comments={comments} />
          <CommentForm threadId={id} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ThreadDetails;
