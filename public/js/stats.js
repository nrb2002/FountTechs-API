

async function loadStats() {
  try {
    const response = 
      await fetch("http://localhost:8080/startups"); //For local development, change the URL to your backend endpoint

    const startups = await response.json();

    const industries = new Set();
    const cities = new Set();

    startups.forEach(startup => {
      if (startup.industry) {
        industries.add(startup.industry);
      }

      if (startup.location?.city) {
        cities.add(startup.location.city);
      }
    });

    document.getElementById("startup-count")
      .textContent = startups.length;

    document.getElementById("industry-count").textContent = industries.size;

    document.getElementById("city-count").textContent = cities.size;

  } catch (error) {
    console.error(error);
  }
}

loadStats();

