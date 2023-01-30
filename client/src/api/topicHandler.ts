import { API_URL } from "./config";

export type TTopic = {
  title: string;
  _id : string
}
// Create Topic
export async function createTopic(title: string) {
    const response = await fetch(`/topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        title,
      })
    });
    return response.json()
}

// Get Topics
export async function getTopics(): Promise<TTopic[]> {
    const response = await fetch(`/topics`);
    return response.json()
}

// Delete Topic
export async function deleteTopic(topicId: string){

    await fetch(`/topics/${topicId}`, {
      method: "DELETE",
    })
}

// Update Topic
export async function updateTopic(topicId: string , title: string) {
  const response = await fetch(`/topics/${topicId}/updateTopic` , {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
      },
    body:JSON.stringify({
        _id: topicId,
        title
      })
  })
  return response.json()
}