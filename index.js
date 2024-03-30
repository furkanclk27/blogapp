//Express Modules
const express = require("express"); 
const app = express();

const cookieParser = require('cookie-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const csurf = require("csurf");

//Node Modules
const path = require("path");

//Routes
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

//Custom Modules
const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data");
const locals = require("./middlewares/locals");

//Template Engine
app.set("view engine", "ejs");

//Models
const Category = require("./models/category");
const Blog = require("./models/blog");
const User = require("./models/user");

//Middlewares
app.use(express.urlencoded({extended: false}));//Post ile alınan body kısmını direkt okur.
app.use(cookieParser());
app.use(session({
    secret: "hello world",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //1 Day
    },
    store: new SequelizeStore({
        db: sequelize
    })
}));

app.use(locals);
app.use(csurf());

app.use("/libs", express.static(path.join(__dirname, "node_modules")));//Static olarak tanimladik. projede calisirken her zaman erisimi olacak yani public demek
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use("/account", authRoutes);
app.use(userRoutes);

Blog.belongsTo(User, {
    foreignKey: {
        allowNull: true
    }
});

User.hasMany(Blog);

Blog.belongsToMany(Category, {through: "blogCategories"});
Category.belongsToMany(Blog, {through: "blogCategories"});

//IIFE - Async Blok
(async () =>{
    // await sequelize.sync({ force: true });
    // await dummyData();
})();

app.listen(3000, function(){
    console.log("Listening on port 3000");
})