import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Filter from "./Filter";
import AllCards from "./AllCards";
import Card from "./Card";
import { useTheme, useThemeUpdate } from "./ThemeContext";

export default function App() {
  const [apiData, setApiData] = useState([]);
  const isDark = useTheme();
  const toggleTheme = useThemeUpdate();
  const navigate = useNavigate();

  useEffect(() => {
    callApi("https://restcountries.com/v3.1/all");
  }, []);

  async function callApi(url) {
    try {
      const response = await axios.get(url);
      setApiData(response.data);
    } catch (error) {
      console.error("Error getting data:", error);
      navigate("/error");
    }
  }

  return (
    <>
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Filter
                isDark={isDark}
                callApi={callApi}
                setApiData={setApiData}
                apiData={apiData}
              />
              {apiData.length === 0 && (
                <p className={isDark ? "dark-text loading" : "loading"}>
                  {"No Data Found"}
                </p>
              )}
              <AllCards
                apiData={apiData}
                isDark={isDark}
                setApiData={setApiData}
                callApi={callApi}
              />
            </>
          }
        />
        <Route
          path="/country/:id"
          element={
            <Card
              navigate={navigate}
              setApiData={setApiData}
              isDark={isDark}
              apiData={apiData}
            />
          }
        />
        <Route
          path="/error"
          element={<h1 className="error"> Error 404 Not Found </h1>}
        ></Route>
      </Routes>
    </>
  );
}
