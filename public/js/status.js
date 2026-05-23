const statusText = document.getElementById("api-status");
const statusDot = document.querySelector(".status-dot");

async function checkApiStatus() {
  try {
    const response = await fetch("http://localhost:8080/api-docs");

    if (response.ok) {
      statusText.textContent = "API Online";
      statusDot.classList.add("online");
    } else {
      throw new Error();
    }
  } catch (error) {
    statusText.textContent = "API Offline";
    statusDot.classList.add("offline");
  }
}

checkApiStatus();

module.exports = checkApiStatus;