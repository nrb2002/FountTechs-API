async function loadStartupCount() {
  try {

    const response =
      await fetch("http://localhost:8080/startups");

    const startups =
      await response.json();

    document.getElementById("startup-count")
      .textContent = startups.length;

  } catch (error) {
    console.error(error);
  }
}

loadStartupCount();

module.exports = loadStartupCount;