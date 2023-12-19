export const fetchVideosByPage = async (page: number) => {
  const response = await fetch(`/api/videos?page=${page}&limit=10`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// fetch videos by year
export const fetchVideosByYear = async (year: string) => {
  const response = await fetch(`/api/videos?year=${year}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}