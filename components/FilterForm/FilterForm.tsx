import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchVideosByYear } from "../../helpers/fetchVideos";

function FilterForm() {
  const [selectedYear, setSelectedYear] = useState<string>("");

  let years = [];
  for (let i = 1992; i <= 2004; i++) {
    years.push(i);
  }

  const {
    data: videos,
    isLoading,
    error
  } = useQuery({
    queryKey: ["videos", selectedYear],
    queryFn: () => fetchVideosByYear(selectedYear),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: selectedYear !== "" // This will only run the query if a year is selected
  });

  useEffect(() => {
    console.log("videos", videos);
  }, [videos]);

  return (
    <>
      <form>
        <label htmlFor="year">Year:</label>
        <select
          id="year"
          name="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="" disabled>
            Select a year
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </form>
      <div>
        <p>
          video results (to be moved to own component? or back to the parent
          page)
        </p>

        {selectedYear === "" && <p>Please select a year</p>}
      </div>
    </>
  );
}

export default FilterForm;
