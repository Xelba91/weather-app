import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { ApiKey } from "../helper/api";

const FiveDay = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const formatDateTime = (dateTimeString) => {
    const optionsDay = {
      weekday: "long", // Nome del giorno della settimana
    };
    const optionsTime = {
      hour: "numeric", // Ora nel formato numerico
      minute: "numeric", // Minuto nel formato numerico
    };

    const date = new Date(dateTimeString);

    const dayOfWeek = date.toLocaleString("it-IT", optionsDay);
    const capitalizedDay = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
    const time = date.toLocaleString("it-IT", optionsTime);

    return { dayOfWeek: capitalizedDay, time };
  };

  const groupByDay = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      if (!groupedData[item.dayOfWeek]) {
        groupedData[item.dayOfWeek] = [];
      }
      groupedData[item.dayOfWeek].push(item);
    });
    return groupedData;
  };

  const getWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${ApiKey}&lang=it&units=metric`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel recupero dei dati meteorologici");
        }
        return response.json();
      })
      .then((data) => {
        const extractedData = {
          city: data.city.name,
          list: data.list.map((item) => {
            const { dayOfWeek, time } = formatDateTime(item.dt_txt);
            return {
              dayOfWeek,
              time,
              description: item.weather[0].description,
              temperature: item.main.temp.toFixed(1),
              minTemperature: item.main.temp_min.toFixed(1),
              maxTemperature: item.main.temp_max.toFixed(1),
              pressure: item.main.pressure,
              windSpeed: item.wind.speed,
              icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
            };
          }),
        };
        const groupedWeatherData = groupByDay(extractedData.list);
        setWeatherData(groupedWeatherData);
      })
      .catch((error) => {
        console.error("Errore nel recupero dei dati meteorologici:", error.message);
      });
  };

  return (
    <Container className="container text-white">
      <Row>
        <Col xs={3} md={2}></Col>
        <Col xs={6} md={8}>
          <p className="display-6 fs-3">Controlla il Meteo per i prossimi 5 giorni</p>
          <Form.Group controlId="formCity">
            <Form.Label className="display-6 my-5">Inserisci la città</Form.Label>
            <Form.Control type="text" placeholder="Città" value={city} onChange={(e) => setCity(e.target.value)} />
          </Form.Group>
          <Button className="border-white text-white shadow-lg mt-5 mb-2" variant="transparent" onClick={getWeather}>
            Ottieni informazioni Meteo
          </Button>
        </Col>
        <Col xs={3} md={2}></Col>
      </Row>

      {weatherData && (
        <Container>
          <h3>Previsioni Meteo per</h3>
          <h2 className="display-4 fw-bold">{city.charAt(0).toUpperCase() + city.slice(1)}</h2>
          {Object.keys(weatherData).map((day, index) => (
            <Row className="my-5 d-flex justify-content-center" key={index}>
              <h3 className="mb-4">{day}</h3>
              {weatherData[day].map((item, index) => (
                <div
                  className="shadow-lg"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    maxWidth: "15rem", // Larghezza massima per le card
                    margin: "0.5rem", // Spaziatura tra le card
                  }}
                  key={index}
                >
                  <Row className="g-3 my-4">
                    <Col xs={12} className="d-flex justify-content-center">
                      <img className=" d-block" src={item.icon} alt="icon" />
                    </Col>
                    <Col xs={12} className="d-flex justify-content-center my-0 ">
                      <p>Ore: {item.time}</p>
                    </Col>
                    <Col xs={12} className="d-flex justify-content-center my-0">
                      <p>
                        <strong>{item.description}</strong>
                      </p>
                    </Col>
                    <Col className="d-none d-md-block">
                      <p>
                        Temperatura <strong>{item.temperature}°C</strong>
                      </p>
                    </Col>

                    <Col className="d-none d-lg-block">
                      <p>
                        Vento <br />
                        <strong>{item.windSpeed} km/h</strong>
                      </p>
                    </Col>
                  </Row>
                </div>
              ))}
            </Row>
          ))}
        </Container>
      )}
    </Container>
  );
};

export default FiveDay;
