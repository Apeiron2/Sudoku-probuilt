window.addEventListener("load", function () {
  get_accounts();
});
function accounts(data) {
  const accounts = document.querySelector(".accounts tbody");
  accounts.innerHTML = "";
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
      '<td title="delete" onclick="del(' +
      element.id +
      ')">🗑</td>' +
      "</tr>";
  });
}
function get_accounts() {
  fetch(`http://localhost:5000/get_accounts`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      accounts(res);
    })
    .catch((err) => {
      alert("Server không phản hồi!");
    });
}
function create() {
  document.querySelector(".create_account").style.display = "block";
}
function cancer() {
  document.querySelector(".create_account").style.display = "none";
}
function del(id) {
  fetch(`http://localhost:5000/admin/del_account/${id}`)
    .then((res) => {
      alert("Xóa thành công!");
      get_accounts();
    })
    .catch((err) => {
      alert(err.message);
    });
}
