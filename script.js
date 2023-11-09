
const input = document.getElementById('search_input');
const search_button = document.getElementById('search');
const searched_city = document.getElementById('searched_city');
const status = document.getElementById('curr_stats');
const image = document.getElementById('status_img');
const image2 = document.getElementById('location_img');
const celsius = document.getElementById('c_data');
const fahrenheit = document.getElementById('f_data');
const humidity = document.getElementById('humidity_data');
const wind = document.getElementById('wind_data');
const clearButton = document.getElementById('clear');
const placeholder = document.getElementById('search_input')


const weather = async (name) => {
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${name}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd65614ae20msh90b2dec278f0d53p1ca0e1jsnefaeebd34fb7',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    const city_name = result.location.name;
    const weather_stat = result.current.condition.text;
    const temp_celsius = result.current.temp_c;
    const temp_fahrenheit = result.current.temp_f;
    const net_humidity = result.current.humidity;
    const wind_speed = result.current.wind_kph;
    const image_icon = result.current.condition.icon;

    searched_city.innerHTML = `<p>${city_name}</p>`;
    status.innerHTML = `<p>${weather_stat}</p>`;
    image.src = image_icon;
    image2.src = "location1.png";
    celsius.innerHTML = `<p>Temp. in C :   ${temp_celsius}<span>&#8451;</span></p>`;
    fahrenheit.innerHTML = `<p>Temp. in F :   ${temp_fahrenheit}<span>&#8457;</span></p>`;
    humidity.innerHTML = `<p>Humidity :   ${net_humidity}%</p>`;
    wind.innerHTML = `<p>Wind Speed :   ${wind_speed} km/h</p>`;

    document.getElementById('onResult').play()
    
  } catch (error) {
    console.error(error);
    document.getElementById('onError').play()
    alert("Invalid Name !!")
    clearWeatherData();
  }
};

const clearWeatherData = () => {
  document.getElementById('onClear').play()
  searched_city.innerHTML = "NIL";
  status.innerHTML = "NIL";
  image.src = "/wind.png";
  image2.src = "/location2.png";
  celsius.innerHTML = "Temp. in C : NIL";
  fahrenheit.innerHTML = "Temp. in F : NIL";
  humidity.innerHTML = "Humidity (%) : NIL";
  wind.innerHTML = "Wind Speed (Km/h) : NIL";
  placeholder.value = '';
};


search_button.addEventListener('click', () => {
  weather(input.value);
});

clearButton.addEventListener('click', clearWeatherData);
