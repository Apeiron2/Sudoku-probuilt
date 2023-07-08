window.addEventListener("load", function () {
  create_table([]);
});
function send(mess) {
  document.getElementById("mess").innerHTML = mess;
}
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
function add() {
  let puzzle = [];
  const idname = document.querySelector(".info-puzzle p:first-child");
  const indexs = document.querySelectorAll(".input");
  indexs.forEach((x) => {
    puzzle.push(x.value);
  });
  fetch(`http://localhost:5000/add_puzzle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      puzzle: puzzle.toString(),
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      send("Thêm thành công!");
      idname.textContent = "ID: " + res.insertId;
      create_table([]);
    })
    .catch((err) => {
      send("Thêm thất bại!");
      create_table([]);
    });
}
function reset() {
  create_table([]);
}
