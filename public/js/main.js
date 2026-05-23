function animateValue(id, endValue) {
  const element = document.getElementById(id);
  let current = 0;
  const increment = Math.ceil(endValue / 60);
  
  const timer = setInterval(() => {
    current += increment;

    if (current >= endValue) {
      current = endValue;
      clearInterval(timer);
    }

    element.textContent = current;
  }, 25);
}

animateValue("startupCount", 150);
animateValue("industryCount", 24);
animateValue("countryCount", 12);