export const fetchVideosByPage = async (page: number) => {
  const response = await fetch(`/api/videos?page=${page}&limit=10`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// fetch videos by year
export const fetchVideosByYear = async (year: string, page?: number) => {
  let url = `/api/videos?year=${year}`;
  if (page) {
    url += `&page=${page}&limit=10`;
  }
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}