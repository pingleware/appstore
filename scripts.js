const apps = [
  "administrative-assistant",
  "cra-dispute"
]; // Add your app folder names here

const appList = document.getElementById("app-list");

apps.forEach(app => {
  fetch(`apps/${app}/info.json`)
    .then(res => res.json())
    .then(data => {
      const card = document.createElement("div");
      card.className = "app-card";
      card.innerHTML = `
        <img src="${data.image}" alt="${data.name}" width="100" />
        <h2>${data.name}</h2>
        <p>${data.description}</p>
        <a href="${data.download}" target="_blank">Download</a>
      `;
      appList.appendChild(card);
    });
});