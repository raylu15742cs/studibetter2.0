import { API_URL } from "./config";

export type TTopic = {
  title: string;
  username: string;
  _id : string
}
// Create Topic
export async function createTopic(title: string, username: string) {
    const response = await fetch(`${API_URL}/topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        title,
        username
      })
    });
    return response.json()
}

// Get Topics
export async function getTopics(username: string): Promise<TTopic[]> {
    const response = await fetch(`${API_URL}/${username}/topics`);
    return response.json()
}

// Delete Topic
export async function deleteTopic(topicId: string){

    await fetch(`${API_URL}/topics/${topicId}`, {
      method: "DELETE",
    })
}

// Update Topic
export async function updateTopic(topicId: string , title: string) {
  const response = await fetch(`${API_URL}/topics/${topicId}/updateTopic` , {
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