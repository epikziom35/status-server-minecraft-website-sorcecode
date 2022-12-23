const serverStatusContainer = document.getElementById("server-status-container");
const getServerStatusButton = document.getElementById("get-server-status-button");

getServerStatusButton.addEventListener("click", () => {
  const serverType = document.getElementById("server-type").value;
  const serverAddress = document.getElementById("server-address").value;
  const language = document.getElementById("language").value;

  fetch(`https://api.mcsrvstat.us/2/${serverAddress}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        serverStatusContainer.innerHTML = `Error: ${data.error}`;
        return;
      }

      let serverStatus = "";
      if (serverType === "java") {
        serverStatus = `
          <table>
            <tr>
              <th>${language === "en" ? "Server Name" : "Nazwa serwera"}</th>
              <td>${data.hostname}</td>
            </tr>
            <tr>
              <th>${language === "en" ? "Version" : " Wersja"}</th>
              <td>${data.version}</td>
            </tr>
            <tr>
              <th>${language === "en" ? "Players" : " Gracze"}</th>
              <td>${data.players.online}/${data.players.max}</td>
            </tr>
            <tr>
              <th>${language === "en" ? "MOTD" : " OPIS"}</th>
              <td>${data.motd.clean.join("<br>")}</td>
            </tr>
          </table>
        `;
      } else {
        serverStatus = `
          <table>
            <tr>
              <th>${language === "en" ? "Server Name" : "Nazwa serwera"}</th>
              <td>${data.hostname}</td>
            </tr>
            <tr>
              <th>${language === "en" ? "Version" : " Wersja"}</th>
              <td>${data.version}</td>
            </tr>
            <tr>
              <th>${language === "en" ? "Players" : " Gracze"}</th>
              <td>${data.players.online}/${data.players.max}</td>
            </tr>
            <tr>
              <th>${language === "en" ? "MOTD" : " OPIS"}</th>
              <td>${data.description.text}</td>
            </tr>
          </table>
        `;
      }

      serverStatusContainer.innerHTML = serverStatus;
    });
});
