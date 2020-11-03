const path = require("path");
const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");
const arg = process.argv[2];
const version = "1.0.0";
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const app = express();
const PORT = process.env.PORT || 3002;

// Initialize Application
init = () => {
  app.use(session(sess));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));
  app.engine("handlebars", hbs.engine);
  app.set("view engine", "handlebars");

  // Initialize Routes
  app.use(routes);

  // Connect to DB and Start Server
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
  });
};

// Display Argument Data
if (arg === "-h") {
  console.log(`
        Usage: node server.js [ -h | -v | -l | -a ]
        or: npm start
        
        [options]
        -h          Display this message.
        -v          Show version.
        -l          Show license info.
        -a          What is TechNewz?
    `);
  process.exit();
} else if (arg === "-v") {
  console.log("TechNewz Version: " + version);
  process.exit();
} else if (arg === "-l") {
  console.log("Licensed under the Creative Commons CC0 Public Domain.");
  process.exit();
} else if (arg === "-a") {
  console.log(
    "Full stack Hacker News type blog application utilizing ORM with Sequelize and adhering to the Model View Controller methodology."
  );
  process.exit();
} else {
  init();
}
