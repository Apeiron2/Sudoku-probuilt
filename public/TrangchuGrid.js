// Cookie quảng cáo

window.addEventListener("load", function () {
  checkCookie();
  get_comments();
});

// Lưu số lần truy cập trang; tgian tồn tại cookie là 1 phút
function setCookie(cname, cvalue, minutes) {
  const d = new Date();
  d.setTime(d.getTime() + minutes * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; //tạo cookie
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("cviews");
  if (user != "") {
  } else {
    setTimeout(function () {
      openPopup();
    }, 6000); // 1 phút = 60.000 milliseconds
    setCookie("cviews", ">1", 1);
  }
}

function openPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "flex";
}

function closePopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "none";
}

//bấm thời gian

var startTime; // Thời gian bắt đầu
var timerInterval; // ID của interval để cập nhật thời gian

// Bắt đầu đồng hồ
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTime, 1000); // Cập nhật thời gian mỗi giây
}

// Dừng đồng hồ
function stopTimer() {
  clearInterval(timerInterval);
}

// Cập nhật thời gian trên giao diện
function updateTime() {
  var elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Thời gian đã trôi qua tính bằng giây

  var hours = Math.floor(elapsedTime / 3600);
  var minutes = Math.floor((elapsedTime % 3600) / 60);
  var seconds = elapsedTime % 60;

  // Định dạng giờ phút giây thành dạng hh:mm:ss
  var timeString =
    padNumber(hours) + ":" + padNumber(minutes) + ":" + padNumber(seconds);

  document.getElementById("timeDisplay").textContent = timeString;
}

// Đảm bảo rằng số được hiển thị có 2 chữ số (thêm số 0 nếu cần)
function padNumber(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

// Gán các sự kiện cho nút bắt đầu và nút dừng
document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("stopButton").addEventListener("click", stopTimer);

//Comment
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
        "</div>" +
        '<p class="rate">' +
        element.rate +
        "</p>" +
        '<p class="content">' +
        element.content +
        "</p>" +
        "</div>";
    }
  });
}
