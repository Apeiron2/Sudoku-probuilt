function send(mess) {
  document.querySelector(".mess i").innerText = mess;
}
document.getElementById("login").addEventListener("submit", function (event) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  fetch(`http://localhost:5000/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      switch (res.type) {
        case "admin":
          return (window.location.href = "/admin/dashboard");
        case "user":
          return (window.location.href = "/");
        default:
          return send(res);
      }
    })
    .catch((err) => {
      send("Server không phản hồi!");
    });
});

function specialchar(string) {
  let text = `!\"#$%&'()*+,-./:;<=>?@[\]^_\`\{|\}~`;
  return string.test(text);
}
document
  .getElementById("register")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var fullname = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var username = document.getElementById("username-register").value;
    var password = document.getElementById("password-register").value;
    fetch(`http://localhost:5000/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: fullname,
        email: email,
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.errno) {
          switch (res.errno) {
            case 1062:
              return "Tên đăng nhập hoặc email đã sử dụng!";
            case 1406:
              return "Dữ liệu không được quá 45 kí tự";
            default:
              return "Lỗi mysql: " + res.errno;
          }
        } else return "Đăng ký tài khoản thành công!";
      })
      .then((res) => {
        send(res);
      })
      .catch((err) => {
        send("Server không phản hồi!");
      });
  });
