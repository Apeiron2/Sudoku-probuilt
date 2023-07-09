window.addEventListener("load", function () {
  get_comments();
});
function send(mess) {
  document.getElementById("mess").innerHTML = mess;
}
function get_comments() {
  fetch("http://localhost:5000/get_comments")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      showcomment(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
function showcomment(comments) {
  const comment = document.querySelector(".comments");
  comment.innerHTML = "";
  comments.forEach((element) => {
    {
      comment.innerHTML +=
        '<div class="comment">' +
        '<div class="info-comment">' +
        '<p class="fullname">' +
        element.fullname +
        "</p>" +
        '<p class="time">' +
        element.time +
        "</p>" +
        '<p class="email">' +
        element.email +
        "</p>" +
        '<button onclick="del_comment(' +
        element.id +
        ')" class="del-comment">🗑</button>' +
        "</div>" +
        "<hr />" +
        "<div>" +
        '<p class="rate">' +
        element.rate +
        "</p>" +
        "</div>" +
        '<p class="content">' +
        element.content +
        "</p>" +
        "</div>";
    }
  });
}
function del_comment(id) {
  fetch(`http://localhost:5000/admin/del_comment/${id}`)
    .then((res) => {
      send("Xóa thành công!");
      get_comments();
    })
    .catch((err) => {
      send(err.message);
    });
}
