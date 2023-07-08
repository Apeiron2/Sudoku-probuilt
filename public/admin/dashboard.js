function showcomment() {
  const comments = document.querySelector(".comments");
  for (let i = 0; i < 10; i++) {
    comments.innerHTML +=
      '<div class="comment">' +
      '<div class="info-comment">' +
      '<p class="fullname">Vũ Đức Tài</p>' +
      '<p class="time">24 giờ trước</p>' +
      '<p class="gmail">meorung922003@gmail.com</p>' +
      '<p class="del-comment">🗑</p>' +
      "</div>" +
      "<hr />" +
      '<div class="rate">' +
      '<div class="star">o</div>' +
      '<div class="star">o</div>' +
      '<div class="star">o</div>' +
      '<div class="star">o</div>' +
      '<div class="star">o</div>' +
      "</div>" +
      '<p class="content">Game rất hay! Chơi rèn luyện tư duy rất tốt!</p>' +
      "</div>";
  }
}
showcomment();
