let apps = [];

fetch('apps/apps.json')
  .then(res => res.json())
  .then(data => {
    apps = data;
    // Trigger the rest of the script after fetching apps
    const appList = document.getElementById("app-list");

    apps.forEach((app, index) => {
      fetch(`apps/${app}/info.json`)
        .then(res => res.json())
        .then(data => {
          let download_links = "";
          const card = document.createElement("div");
          const download_os = Object.keys(data.download);
          download_os.forEach(os => {
            download_links += `<a href="${data.download[os]}" target="_blank">${os.toUpperCase()}</a>&nbsp;`;
          });

          card.className = "app-card";
          card.innerHTML = `
            <img src="${data.image}" alt="${data.name}" width="100" />
            <h2>${data.name}</h2>
            <p>${data.description}</p>
            <p>Download: ${download_links}</p>
          `;

          // Determine row placement
          const row = Math.floor((Math.sqrt(8 * index + 1) - 1) / 2);
          const rowContainerId = `row-${row}`;
          let rowContainer = document.getElementById(rowContainerId);

          if (!rowContainer) {
            rowContainer = document.createElement("div");
            rowContainer.id = rowContainerId;
            rowContainer.className = "app-row";
            appList.appendChild(rowContainer);
          }

          rowContainer.appendChild(card);
        });
    });
  });
