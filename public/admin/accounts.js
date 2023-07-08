window.addEventListener("load", function () {
  get_accounts();
});
function accounts(data) {
  const accounts = document.querySelector(".accounts tbody");
  data.forEach((element) => {
    accounts.innerHTML +=
      "<tr>" +
      "<td>" +
      element.id +
      "</td>" +
      "<td>" +
      element.fullname +
      "</td>" +
      "<td>" +
      element.type +
      "</td>" +
      "<td>" +
      element.username +
      "</td>" +
      "<td>" +
      element.password +
      "</td>" +
      "<td>" +
      element.email +
      "</td>" +
      "<td>" +
      element.time +
      "</td>" +
      "<td>" +
      element.login +
      "</td>" +
      '<td title="edit">⚙</td>' +
      '<td title="delete">🗑</td>' +
      "</tr>";
  });
}
function get_accounts() {
  fetch(`http://localhost:5000/get_accounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: null,
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      accounts(res);
    })
    .catch((err) => {
      send("Server không phản hồi!");
    });
}
