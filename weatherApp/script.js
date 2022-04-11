const link =
    "http://api.weatherstack.com/current?access_key=7774bbc01724c0f78708a6071ef9ed30";

const root = document.getElementById('root');
//const city = document.getElementById('city');
const popup = document.getElementById('popup');
const textInput = document.getElementById('text-input');
const form = document.getElementById('form');
const closeBtn = document.getElementById('close');
let store = {
    city: "Moscow",
    cloudcover: 0,
    temperature: 0,
    humidity: 0,
    observationTime: "00:00 AM",
    pressure: 0,
    uvIndex: 0,
    visibility: 0,
    isDay: "yes",
    description: '',
    windSpeed: 0,
    properties: {
        cloudcover: 0,
        temperature: 0,
        uvIndex: 0,
        windSpeed: 0,
        visibility: 0,
        humidity: 0,
    }
}
const fetchData = async () => {
    try {
        const query = localStorage.getItem("query") || store.city;
        const result = await fetch(`${link}&query=${query}`);
        const data = await result.json();
        console.log(data);
        const {
            current: {
               
                cloudcover,
                humidity,
                wind_speed: windSpeed,
                temperature,
                observation_time: observationTime,
                pressure,
                uv_index: uvIndex,
                visibility,
                is_day: isDay,
                weather_descriptions: description,
            },
            location: {
                name
            },
        } = data;
        store = {
            ...store,
          
            observationTime,
            temperature,
            isDay,
            city: name,
            description: description[0],
            properties: {
                cloudcover: {
                    title: 'Cloudcover',
                    value: `${cloudcover}%`,
                    icon: `cloud.png`,
                },
                uvIndex: {
                    title: 'UV Index',
                    value: `${uvIndex}`,
                    icon: `uv-index.png`,
                },
                pressure: {
                    title: 'Pressure',
                    value: `${pressure}b`,
                    icon: `gauge.png`,
                },
                windSpeed: {
                    title: 'Wind Speed',
                    value: `${windSpeed}m/h`,
                    icon: `wind.png`,
                },
                visibility: {
                    title: 'Visibility',
                    value: `${visibility}`,
                    icon: `visibility.png`,
                },
                humidity: {
                    title: 'Humidity',
                    value: `${humidity}%`,
                    icon: `humidity.png`,
                },
            }
        };
        renderComponent();
    } catch(err){
        console.log(err);
    }
};
const getImage = (description) => {
    const value = description.toLowerCase();
    switch (value) {
        case 'overcast': return 'cloudy.png';
        case 'sunny': return 'sunny.png';
        case 'cloud': return 'cloud.png';
        case 'fog': return 'fog.png';
        case 'cloud': return 'cloud.png';
        case 'light rain shower': return 'rainy.png';
        case 'mist': return 'fog.png';
        default: return 'the.png'
    }


}

const renderProperty = (properties) => {
    return Object.values(properties).map(({ title, value, icon }) => {
        return `<div class="property">
        <div class="property-icon">
          <img src="./img/icons/${icon}" alt="">
        </div>
        <div class="property-info">
          <div class="property-info__value">${value}</div>
          <div class="property-info__description">${title}</div>
        </div>
      </div>`;
    }).join("");
}
const markup = () => {
    const { city, description, observationTime, temperature, isDay, properties } = store;
    const containerClass = isDay === 'yes' ? 'is-day' : "";
    return `<div class="container ${containerClass}">
            <div class="top">
              <div class="city">
                <div class="city-subtitle">Weather Today in</div>
                  <div class="city-title" id="city">
                  <span>${city}</span>
                </div>
              </div>
              <div class="city-info">
                <div class="top-left">
                <img class="icon" src="./img/${getImage(description)}" alt="" />
                <div class="description">${description}</div>
              </div>
            
              <div class="top-right">
                <div class="city-info__subtitle">as of ${observationTime}</div>
                <div class="city-info__title">${temperature}</div>
              </div>
            </div>
          </div>
        <div id="properties">${renderProperty(properties)}</div>
      </div>`;
}
const togglePopupClass = () => {
    popup.classList.toggle("active");
}
const renderComponent = () => {
    root.innerHTML = markup();

    const city = document.getElementById('city');
    city.addEventListener('click', togglePopupClass)
}
const handleInput = (e) => {
    store = {
        ...store,
        city: e.target.value,
    };
};
const handleSubmit = (e) => {
    e.preventDefault();
    const value = store.city;
    if(!value) return null;
    localStorage.setItem("query", value);
    fetchData();
    togglePopupClass();
}
form.addEventListener('submit', handleSubmit)
textInput.addEventListener('input', handleInput)
closeBtn.addEventListener('click', togglePopupClass)
fetchData();
