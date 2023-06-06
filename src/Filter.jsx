import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Filter({ isDark, callApi, setApiData, apiData }) {
  const downArraow = (
    <FontAwesomeIcon className="down-arrow" icon={faAngleDown} />
  );

  const [selectedRegion, setSelectedRegion] = useState("All");
  let regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  function handleSearchbar(e) {
    if (e.key === "Backspace") {
      if (selectedRegion !== "All")
        callApi(`https://restcountries.com/v3.1/region/${selectedRegion}`);
      else callApi("https://restcountries.com/v3.1/all");
    }
    let target = e.target.value.toLowerCase();
    const filteredCountries = apiData.filter(
      (country) =>
        country.name.common.toLowerCase().startsWith(target) &&
        (selectedRegion === "All" || country.region === selectedRegion)
    );

    setApiData(filteredCountries);
  }

  function handleSelect(e) {
    let region = e.target.value;
    setSelectedRegion(region);
    if (region === "All") callApi("https://restcountries.com/v3.1/all");
    else callApi(`https://restcountries.com/v3.1/region/${region}`);
  }

  return (
    <div className={isDark ? "dark search-area" : "search-area"}>
      <div className={isDark ? "dark-mode search-input" : "search-input"}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        <input
          onKeyDown={(e) => handleSearchbar(e)}
          onChange={(e) => handleSearchbar(e)}
          type="text"
          placeholder="Search for a country.."
          className={isDark ? "dark-mode" : ""}
        />
      </div>
      {downArraow}
      <select
        className={isDark ? "dark-mode drop-down" : "drop-down"}
        onChange={(e) => handleSelect(e)}
      >
        {regions.map((region) => (
          <option
            key={region}
            id={region}
            onClick={(e) => {
              handleSelect(e);
            }}
          >
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
