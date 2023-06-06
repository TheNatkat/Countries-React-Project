import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function AllCards({ apiData, isDark, callApi }) {
  useEffect(() => {
    callApi("https://restcountries.com/v3.1/all");
  }, []);

  return (
    <>
      <div className={isDark ? "dark all-cards" : "all-cards"}>
        {apiData.map((item, idx) => (
          <div key={idx} className={isDark ? "dark-mode card" : "card"}>
            <Link className="link" to={`/country/${apiData[idx].ccn3}`}>
              <img src={item.flags.png} />
              <div className="card-infos">
                <h2 className={isDark && "dark-text"}>{item.name.common}</h2>
                <>
                  <h6 className={isDark ? "dark-text" : ""}>
                    <span
                      className={isDark ? "dark-text" : ""}
                    >{`Population: `}</span>
                    {item.population}
                  </h6>
                  <h6 className={isDark ? "dark-text" : ""}>
                    <span
                      className={isDark ? "dark-text" : ""}
                    >{`Region: `}</span>
                    {item.region}
                  </h6>
                  <h6 className={isDark ? "dark-text" : ""}>
                    <span
                      className={isDark ? "dark-text" : ""}
                    >{`Capital: `}</span>
                    {item.capital}
                  </h6>
                </>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
