const loadStats = require("./stats");

function animateValue(id, endValue) {
  const element = document.getElementById(id);
  let current = 0;
  const increment = Math.ceil(endValue / 60); // Adjust the divisor to control animation speed
  
  const timer = setInterval(() => {
    current += increment;

    if (current >= endValue) {
      current = endValue;
      clearInterval(timer);
    }

    element.textContent = current;
  }, 25);
}

loadStats().then((startups, industries, cities) => {
  animateValue("startup-count", startups.length);
  animateValue("industry-count", industries.size);
  animateValue("city-count", cities.size);
});







// Current Year
function currentYear(){
  document.getElementById("current-year")
    .textContent = new Date().getFullYear();
}

currentYear();

module.exports = currentYear;