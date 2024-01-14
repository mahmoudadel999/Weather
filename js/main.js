var submitSerch = document.getElementById('submitSerch');

async function weather(city) {
  var data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=33946106791c446992d152201241201&q=${city}&days=2`
  );

  // http://api.weatherapi.com/v1/search.json?key=33946106791c446992d152201241201&q=${city}&days=7

  // if (data.ok && 400 != data.status) {
  //   var response = await data.json();
  //   displayCurrent(response.location, response.current);
  //   displayAnother(response.forecast.forecastday);
  // }
  var response = await data.json();

  console.log(response);
  console.log(response.current);
  console.log(response.location);

  // console.log(response.forecast.forecastday);
  // console.log('cityy', response.location);
  // console.log('date', data);
  // console.log('current', response.current);

  displayCurrent(response.location, response.current);

  displayAnother(response.forecast.forecastday);
}

var searchBtn = document.getElementById('searchBtn');
var search = document.getElementById('search');
document.getElementById('search').addEventListener('keyup', (a) => {
  weather(a.target.value);
});
// searchBtn.addEventListener("click", () => {
//   weather(search.value);

// });

// searchBtn.addEventListener("click", function () {
//   console.log(search.value);
// });

var days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function displayCurrent(location, current) {
  if (null != current) {
    var e = new Date(current.last_updated.replace(' ', 'T'));
    let n = `<div class="today forecast">
    <div class="forecast-header" id="today">
      <div class="day">${days[e.getDay()]}</div>
      <div class="date">${e.getDate() + monthNames[e.getMonth()]}</div>
    </div>
    <div class="forecast-content" id="current">
      <div class="location">${location.name}</div>
      <div class="degree">
        <div class="num"> ${current.temp_c}<sup>o</sup>C</div>

        <div class="forecast-icon">
          <img
            src=https:${current.condition.icon}
            alt=""
            width="90"
          />
        </div>
      </div>
      <div class="custom">${current.condition.text}</div>
      <span><img src="images/icon-umberella.png" alt="" />20%</span>
      <span><img src="images/icon-wind.png" alt="" />18km/h</span>
      <span><img src="images/icon-compass.png" alt="" />East</span>
    </div>
    </div>`;
    document.getElementById('forecast').innerHTML = n;
  }
}

function displayAnother(arrayOf3Day) {
  let box = '';
  for (let e = 1; e < arrayOf3Day.length; e++)
    box += `<div class="forecast">
    <div class="forecast-header">
      <div class="day">
        ${days[new Date(arrayOf3Day[e].date.replace(' ', 'T')).getDay()]}
      </div>
    </div>
    <div class="forecast-content">
      <div class="forecast-icon">
        <img src="https:${
          arrayOf3Day[e].day.condition.icon
        }"  alt="" width="48">\n
      </div>
      <div class="degree">
        ${arrayOf3Day[e].day.maxtemp_c}
        <sup>o</sup>C
      </div>
      <small>
        ${arrayOf3Day[e].day.mintemp_c}
        <sup>o</sup> </small> <div class="custom">${
          arrayOf3Day[e].day.condition.text
        }</div>    </div></div> `;

  document.getElementById('forecast').innerHTML += box;
}
weather('cairo');
