const cors = require("cors");
const express = require("express");
const mysql = require("mysql2");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var session = require("express-session");
const app = express();
const port = 5000;
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "922003",
  database: "sudoku",
  port: "3306",
});

// Hàm truy vấn
function query(sql) {
  connection.connect();
  const res = new Promise((res, rej) => {
    connection.query(sql, (err, results) => {
      if (err) rej(err);
      res(results);
    });
  });
  return res;
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use("/file", express.static("public"));
app.set("view engine", "ejs");

var session;
app.use(
  session({
    secret: "thietkevalaptringwebkhoqua",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
  })
);

app.get("/login", (req, res) => {
  res.render(`pages/login.ejs`);
});
// Đăng nhập
app.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var sql = `select password,type,fullname,email from accounts where username=\'${username}\';`;
  const Query = query(sql);
  Query.then((results) => {
    if (results[0] == null) res.json(`Sai tài khoản hoặc mật khẩu!`);
    else {
      if (results[0].password == password) {
        session = req.session;
        session.username = username;
        session.type = results[0].type;
        session.fullname = results[0].fullname;
        session.email = results[0].email;
        query(
          `UPDATE accounts SET login = NOW() WHERE username = \'${username}\';`
        );
        res.json(session);
      } else res.json(`Sai tài khoản hoặc mật khẩu!`);
    }
  }).catch((err) => res.json(err));
});
// Đăng xuất
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.json("Đăng xuất thành công!");
});
//Tạo path
app.get("/admin", (req, res) => {
  if (req.session.type != "admin") {
    res.redirect(`../login`);
  } else
    res.render(`partials/admin/admin_page.ejs`, {
      fullname: req.session.fullname,
    });
});
app.get("/", (req, res) => {
  if (req.session.type != "user") {
    res.redirect(`../login`);
  } else
    res.render(`pages/TrangChuGrid.ejs`, {
      fullname: req.session.fullname,
      email: req.session.email,
    });
});
app.get("/admin/dashboard", (req, res) => {
  if (req.session.type != "admin") {
    res.redirect(`../login`);
  } else {
    let accounts = 0,
      puzzles = 0,
      rate = 0;
    query(`select count(*) as accounts from accounts;`).then((data) => {
      accounts = data[0].accounts;
    });
    query(`select count(*) as puzzles from puzzles;`).then((data) => {
      puzzles = data[0].puzzles;
    });
    query(`select round(avg(rate),2) as rate from comments;`).then((data) => {
      rate = data[0].rate;
    });
    setTimeout(() => {
      res.render(`pages/admin/dashboard.ejs`, {
        fullname: req.session.fullname,
        view: req.cookies.visitCount,
        accounts: accounts,
        puzzles: puzzles,
        rate: rate,
      });
    }, 1000);
  }
});
app.get("/admin/accounts", (req, res) => {
  if (req.session.type != "admin") {
    res.redirect(`../login`);
  } else {
    res.render(`pages/admin/accounts.ejs`, {
      fullname: req.session.fullname,
    });
  }
});
app.get("/admin/edit_puzzles", (req, res) => {
  if (req.session.type != "admin") {
    res.redirect(`../login`);
  } else {
    res.render(`pages/admin/edit_puzzles.ejs`, {
      fullname: req.session.fullname,
    });
  }
});
app.get("/admin/add_puzzles", (req, res) => {
  if (req.session.type != "admin") {
    res.redirect(`../login`);
  } else {
    res.render(`pages/admin/add_puzzles.ejs`, {
      fullname: req.session.fullname,
    });
  }
});

app.get("/tutorial", (req, res) => {
  res.render(`pages/tutorial.ejs`);
});
app.get("/about-us", (req, res) => {
  res.render(`pages/GioiThieu.ejs`);
});

// Đăng ký tài khoản
app.post("/register", (req, res) => {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const sql = `insert into accounts(fullname,email,username,password,time) values (\'${fullname}\',\'${email}\',\'${username}\',\'${password}\',now());`;
  const Query = query(sql);
  Query.then((results) => {
    res.json(results);
  }).catch((err) => res.json(err));
});
// Tạo tài khoản
app.post("/create_account", (req, res) => {
  if (req.session.type != "admin") {
    res.redirect(`../login`);
  } else {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const type = req.body.type;
    const sql = `insert into accounts(fullname,type,email,username,password,time) values (\'${fullname}\',\'${type}\',\'${email}\',\'${username}\',\'${password}\',now());`;
    const Query = query(sql);
    Query.then((res) => res.json(res)).catch((err) => res.end);
    res.render(`pages/admin/accounts.ejs`, {
      fullname: req.session.fullname,
    });
  }
});
// Xóa tài khoản
app.get("/admin/del_account/:id", (req, res) => {
  if (req.session.type != "admin") {
    res.redirect(`../login`);
  } else {
    const id = req.params.id;
    var sql = `DELETE FROM accounts where id=${id};`;
    const Query = query(sql);
    Query.then((res) => res.json(res)).catch((err) => {
      res.json(err);
    });
  }
});
// Đếm view
app.get("/", (req, res) => {
  let visitCount = req.cookies.visitCount || 0;
  visitCount++;
  res.cookie("visitCount", visitCount);
});

// Submit comment
app.post("/", (req, res) => {
  if (req.session.username == undefined) {
    res.redirect("../login");
  } else {
    const rate = req.body.rate;
    const content = req.body.content;
    const username = req.session.username;
    const sql = `insert into comments(username,content,rate,time) values ('${username}','${content}','${rate}',now())`;
    const Query = query(sql);
    res.render(`pages/TrangChuGrid.ejs`, {
      fullname: req.session.fullname,
      email: req.session.email,
    });
  }
});

// Nhận ds tài khoản
app.get("/get_accounts", (req, res) => {
  var sql = `select * from accounts;`;
  const Query = query(sql);
  Query.then((results) => {
    res.json(results);
  }).catch((err) => res.json(err));
});
// Nhận ds comment
app.get("/get_comments", (req, res) => {
  var sql = `select comments.id,fullname,comments.time,accounts.email,rate,content from comments join accounts ON comments.username=accounts.username;`;
  const Query = query(sql);
  Query.then((results) => {
    res.json(results);
  }).catch((err) => res.json(err));
});
// Xóa comment
app.get("/admin/del_comment/:id", (req, res) => {
  const id = req.params.id;
  var sql = `DELETE FROM comments where id=${id};`;
  const Query = query(sql);
  Query.then((res) => res.json(res)).catch((err) => {
    res.json(err);
  });
});
// Nhận câu đố
app.post("/get_puzzle", (req, res) => {
  const id = req.body.id;
  const sql = `select puzzle from puzzles where \`id\`="${id}";`;
  const Query = query(sql);
  Query.then((result) => res.json(result)).catch((err) => res.json(err));
});
app.post("/startgame", (req, res) => {
  const sql = `SELECT id, puzzle FROM puzzles ORDER BY RAND() LIMIT 1;`;
  const Query = query(sql);
  Query.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
// Thêm câu đố
app.post("/export_puzzle", (req, res) => {
  const data = req.body.puzzle;
  const sql = `insert into puzzles (puzzle) values ('${data}');`;
  const results = query(sql);
  results
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// Chỉnh sửa câu đố
app.post("/edit_puzzle", (req, res) => {
  const data = req.body.puzzle;
  const id = req.body.id;
  const sql = `update puzzles set \`puzzle\`= '${data}' where \`id\`='${id}';`;
  const results = query(sql);
  results
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});
// Xóa câu đố

app.post("/del_puzzle", (req, res) => {
  const id = req.body.id;
  const sql = `delete from puzzles where id='${id}';`;
  const results = query(sql);
  results
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});
// Thêm câu đố
app.get("/admin/add_puzzles", (req, res) => {
  res.render(`pages/admin/add_puzzles.ejs`);
});
app.post("/add_puzzle", (req, res) => {
  const puzzle = req.body.puzzle;
  const sql = `insert into \`puzzles\`(\`puzzle\`) values ('${puzzle}');`;
  const results = query(sql);
  results
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});
