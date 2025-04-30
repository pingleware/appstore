const apps = [
  "administrative-assistant",
  "cra-dispute"
]; // Add your app folder names here

const appList = document.getElementById("app-list");

apps.forEach(app => {
  fetch(`apps/${app}/info.json`)
    .then(res => res.json())
    .then(data => {
      let download_links = "";
      const card = document.createElement("div");
      console.log(data);
      card.className = "app-card";
      card.innerHTML = `
        <img src="${data.image}" alt="${data.name}" width="100" />
        <h2>${data.name}</h2>
        <p>${data.description}</p>
        <p>Download: ${download_links}</p>
      `;
      appList.appendChild(card);
    });
});