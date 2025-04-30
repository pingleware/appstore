const apps = [
  "administrative-assistant",
  "cra-dispute",
  "simplecommerce"
]; // Add your app folder names here

const appList = document.getElementById("app-list");

apps.forEach(app => {
  fetch(`apps/${app}/info.json`)
    .then(res => res.json())
    .then(data => {
      let download_links = "";
      const card = document.createElement("div");
      const download_os = Object.keys(data.download);
      download_os.forEach(os => {
        download_links += `<a href="${data.download[os]}" target="_blank">${os.toUpperCase()}</a>&nbsp;`;
      })
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