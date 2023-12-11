export const fetchVideos = async (page: number) => {
  const response = await fetch(`/api/videos?page=${page}&limit=10`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
