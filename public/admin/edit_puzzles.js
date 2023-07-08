window.addEventListener("load", function () {
  create_table([]);
});
function send(mess) {
  document.getElementById("mess").innerHTML = mess;
}

document
  .getElementById("open_puzzle")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const id = document.getElementById("id_puzzle").value;
    const idname = document.querySelector(".info-puzzle p:first-child");
    fetch(`http://localhost:5000/get_puzzle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const arr = res[0].puzzle.split(",");
        create_table(arr);
        idname.textContent = "ID: " + id;
        send("");
      })
      .catch((err) => {
        idname.textContent = "ID: " + id;
        send(`ID ${id} không tồn tại.`);
        create_table([]);
      });
  });
function create_table(array) {
  document.querySelector("#puzzle").innerHTML = "";
  const puzzle = document.querySelector("#puzzle");
  for (i = 0; i < 81; i++) {
    const col = (i % 9) + 1;
    const row = Math.floor(i / 9) + 1;
    let group;
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("min", 1);
    input.setAttribute("max", 9);
    input.setAttribute("id", i);
    input.setAttribute("class", `input col${col} row${row}`);

    if (array[i] == "") {
      input.setAttribute("value", null);
      input.classList.add("empty");
    } else {
      input.setAttribute("value", array[i]);
    }
    switch (col) {
      case 1:
      case 2:
      case 3:
        switch (row) {
          case 1:
          case 2:
          case 3:
            group = 1;
            break;
          case 4:
          case 5:
          case 6:
            group = 4;
            break;
          default:
            group = 7;
            break;
        }
        break;
      case 4:
      case 5:
      case 6:
        switch (row) {
          case 1:
          case 2:
          case 3:
            group = 2;
            break;
          case 4:
          case 5:
          case 6:
            group = 5;
            break;
          default:
            group = 8;
            break;
        }
        break;

      default:
        switch (row) {
          case 1:
          case 2:
          case 3:
            group = 3;
            break;
          case 4:
          case 5:
          case 6:
            group = 6;
            break;
          default:
            group = 9;
            break;
        }
        break;
    }
    input.classList.add("group" + group);
    puzzle.appendChild(input);
  }
}
function edit() {
  let puzzle = [];
  const id = document.getElementById("id_puzzle").value;
  const indexs = document.querySelectorAll(".input");
  indexs.forEach((x) => {
    puzzle.push(x.value);
  });
  fetch(`http://localhost:5000/edit_puzzle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      puzzle: puzzle.toString(),
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      send("Chỉnh sửa thành công!");
      create_table([]);
    })
    .catch((err) => {
      send("Chỉnh sửa thất bại!");
      create_table([]);
    });
}
function del() {
  const id = document.getElementById("id_puzzle").value;
  if (id == null) send("Chưa chọn câu đố!");
  else {
    fetch(`http://localhost:5000/del_puzzle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => {
        send("Xóa thành công!");
        create_table([]);
      })
      .catch((err) => {
        send("Xóa thất bại!");
        create_table([]);
      });
  }
}
