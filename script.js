document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const host = document.getElementById("host").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const channelsDiv = document.getElementById("channels");
  channelsDiv.innerHTML = "<p>Loading channels...</p>";

  try {
    const url = `${host}/player_api.php?username=${username}&password=${password}&action=get_live_streams`;
    const res = await fetch(url);
    const data = await res.json();

    channelsDiv.innerHTML = "";
    data.slice(0, 50).forEach(channel => {
      const div = document.createElement("div");
      div.className = "channel";
      div.innerHTML = `<strong>${channel.name}</strong>`;
      div.onclick = () => playChannel(host, username, password, channel.stream_id);
      channelsDiv.appendChild(div);
    });
  } catch (err) {
    channelsDiv.innerHTML = "<p style='color:red'>Error fetching channels</p>";
    console.error(err);
  }
});

function playChannel(host, username, password, stream_id) {
  const player = document.getElementById("player");
  player.src = `${host}/live/${username}/${password}/${stream_id}.m3u8`;
  player.play();
}
