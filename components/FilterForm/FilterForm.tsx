import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { colors } from "../../app/GlobalStyles";

const YearSelectFormGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;

  select {
    font-family: "Inter", sans-serif;
    padding: 8px 16px;
    border-radius: 4px;
    background-color: ${colors.alabaster};
    border-color: ${colors.nocturnal_sea};
    color: ${colors.basically_black};
    font-size: 16px;
  }
`;

function FilterForm({
  selectedYear,
  setSelectedYear
}: {
  selectedYear: string;
  setSelectedYear: Dispatch<SetStateAction<string>>;
}) {
  let years = [];
  for (let i = 1992; i <= 2004; i++) {
    years.push(i);
  }

  return (
    <>
      <form>
        <YearSelectFormGroup>
          <label htmlFor="year">Year:</label>

          <select
            id="year"
            name="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="" disabled>
              Select
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </YearSelectFormGroup>
      </form>
      <div>
        {selectedYear === "" && (
          <p style={{ textAlign: "center" }}>Please select a year.</p>
        )}
      </div>
    </>
  );
}

export default FilterForm;
