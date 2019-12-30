window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureSection = document.querySelector(".temperatue-section");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";

      const api = `${proxy}https://api.darksky.net/forecast/a97ab94b3896fc74d3c452705446d5be/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          //Set DOM elements from the API
          temperatureDegree.textContent = temperature;

          temperatureDescription.textContent = summary;

          locationTimezone.textContent = data.timezone;
          //set icons
          setIcons(icon, document.querySelector(".icon"));

          //change temp to C/F
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
