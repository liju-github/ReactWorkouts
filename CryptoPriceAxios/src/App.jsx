//https://api.coingecko.com/api/v3/search/trending
//Fetch using axios display in a table with error handling and loading,Preview the images and on hover highlight it.

import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom'

function App() {

  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("");
  const [hoveredImageURL, setHoveredImageURL] = useState("");


  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/search/trending")
      .then((response) => {
        setCryptos(response.data.coins)
        setLoading(false)
        setError("");
      })
      .catch(() => {
        setError("Unable to fetch URL")
      })
  }, [])


  function DisplayCryptos() {
    return (
      <>
        {error ? <p>{error}</p> :
          <table tabIndex={1} border={1}>
            <thead>
              <tr style={{
                fontFamily: "Roboto",
              }}>
                {
                  Object.keys(cryptos[0].item).map((value, index) => (
                    <th key={index}>{value}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>

              {cryptos.map((value, index) => (
                <tr key={index}>
                  {
                    Object.values(value.item).map((value, index) => (
                      <td key={index}>
                        {
                          typeof value === "string" && value.startsWith("http") ?
                            (<Link to={value}>
                              <img
                                src={value}
                                onPointerEnter={() => { setHoveredImageURL(value) }}
                                onPointerLeave={() => { setHoveredImageURL("") }}
                                style={{
                                  border: "solid",
                                  borderColor: hoveredImageURL === value ? "green" : "red",
                                }} />
                            </Link>) :
                            (typeof value === "object" ? (
                              <div>
                                {
                                  Object.entries(value).map((value, index) => (
                                    <div key={index}>
                                       Value: {JSON.stringify(value)}
                                    </div>
                                  ))
                                }
                              </div>
                            ) : <div>{ value}</div>)
                        }
                      </td>
                    ))
                  }
                </tr>

              ))
              }

            </tbody>
          </table>}
      </>
    )
  }

  return (
    <>
      {loading ? <p>Loading.....</p> : <DisplayCryptos />}
    </>
  )
}


export default App;