import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
export default function Card({ navigate, isDark }) {
  const [isChanged, setIsChanged] = useState(1);
  const countryCode = useParams();
  const [flagData, setFlagData] = useState([]);

  async function callApi(url) {
    try {
      const response = await axios.get(url);
      setFlagData(response.data);
    } catch (error) {
      console.error("Error getting data:", error);
      navigate("/error");
    }
  }

  useEffect(() => {
    callApi(`https://restcountries.com/v3.1/alpha/${countryCode.id}`);
  }, [isChanged]);

  return (
    <>
      <div className={isDark ? "dark all-cards" : "all-cards"}>
        {flagData.map((item) => {
          return (
            <div
              key={item.name.common}
              className={isDark ? "dark single-flag" : "single-flag"}
            >
              <Link to="/">
                <button className={isDark ? "dark-mode back-btn" : "back-btn"}>
                  Back
                </button>
              </Link>
              <div className={isDark ? "dark flag-data" : "flag-data"}>
                <img
                  src={item.flags.png}
                  className={isDark ? "dark-mode" : ""}
                />
                <div className={isDark ? "dark flag-info" : "flag-info"}>
                  <h1 className={isDark ? "dark-text" : ""}>
                    {item.name.common}
                  </h1>
                  <div className=" flag-info-data">
                    <div className="flag-info-section-1">
                      <h4 className={isDark ? "dark-text" : ""}>
                        <span> Native Name: </span>{" "}
                        {item.name.nativeName
                          ? Object.entries(item.name.nativeName)[0][1].common
                          : "N/A"}
                      </h4>
                      <h4 className={isDark ? "dark-text" : ""}>
                        <span> Population: </span> {item.population}
                      </h4>
                      <h4 className={isDark ? "dark-text" : ""}>
                        <span> Region: </span> {item.region}
                      </h4>
                      <h4 className={isDark ? "dark-text" : ""}>
                        <span> Sub Region: </span> {item.subregion}
                      </h4>
                      <h4 className={isDark ? "dark-text" : ""}>
                        <span> Capital: </span> {item.capital}
                      </h4>
                    </div>
                    <div className="flag-info-section-2">
                      <h4 className={isDark ? "dark-text" : ""}>
                        <span> Top Level Domain: </span>{" "}
                        {item.tld ? item.tld[0] : "N/A"}
                      </h4>
                      <h4 className={isDark ? "dark-text" : ""}>
                        <span> Currencies: </span>{" "}
                        {item.currencies
                          ? Object.entries(item.currencies)[0][1].symbol
                          : "N/A"}
                      </h4>
                      <h4 className={isDark ? "dark-text" : ""}>
                        <span> Languages: </span>{" "}
                        {item.languages
                          ? Object.entries(item.languages)[0][1]
                          : "N/A"}
                      </h4>
                    </div>
                  </div>
                  <div className="borders">
                    <h4 className={isDark ? "dark-text" : ""}>
                      Border Countries:
                    </h4>
                    {item.borders ? (
                      item.borders.map((code) => {
                        return (
                          <Link
                            key={code}
                            to={`/country/${code}`}
                            onClick={() => setIsChanged(isChanged + 1)}
                          >
                            <button
                              className={isDark ? "dark-mode-border" : ""}
                            >{`${code}`}</button>
                          </Link>
                        );
                      })
                    ) : (
                      <p className={isDark ? "dark-mode" : ""}>N/A</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
