const path = require("path");
const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const moment = require("moment");
const arg = process.argv[2];
const version = "1.0.0";
const exphbs = require("express-handlebars");
const hbs = exphbs.create({
  helpers: {
    dateFormat: function () {
      var date = moment(new Date());
      return date.format("YYYY");
    },
  },
});
const session = require("express-session");
const { format } = require("path");
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
    "Express.js back end for a Hacker News type social network utilizing MySql or JawsDB (Heroku)."
  );
  process.exit();
} else {
  init();
}
