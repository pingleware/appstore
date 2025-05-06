let apps = [];

let categories = [];

fetch('apps/categories.json')
  .then(res => res.json())
  .then(data => {
    categories = data;
    const categorySelect = document.getElementById("category-select");
    
    if (categorySelect.options.length === 1) {
      // Populate category dropdown, if empty (contains only the default option)
      categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
      });
    }

    // Add event listener for category selection
    categorySelect.addEventListener("change", (event) => {
      const selectedCategory = event.target.value;
      const appList = document.getElementById("app-list");
      appList.innerHTML = ""; // Clear current apps

      apps.forEach((app, index) => {
        fetch(`apps/${app}/info.json`)
          .then(res => res.json())
          .then(data => {
            if (data.metadata.categories.includes(selectedCategory)) {
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
            }
          });
      });
    });
  });

/*
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
*/