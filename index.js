const express = require("express"); //Kutuphaneyi import ettik

const app = express();//Express uygulamasi olustu

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));//post ile alınan body kısmını direkt okur.

const path = require("path");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

app.use("/libs", express.static(path.join(__dirname, "node_modules")));//static olarak tanimladik. projede calisirken her zaman erisimi olacak yani public demek
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use("/account", authRoutes);
app.use(userRoutes);

const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data");
const Category = require("./models/category");
const Blog = require("./models/blog");
const User = require("./models/user");

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
    await sequelize.sync({ force: true });
    await dummyData();
})();

app.listen(3000, function(){
    console.log("Listening on port 3000");
})