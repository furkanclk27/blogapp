const express = require("express"); //Kutuphaneyi import ettik

const app = express();//Express uygulamasi olustu

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));//post ile alınan body kısmını direkt okur.

const path = require("path");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

app.use("/libs", express.static(path.join(__dirname, "node_modules")));//static olarak tanimladik. projede calisirken her zaman erisimi olacak yani public demek
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);//kisaltma yaptik
app.use(userRoutes);

const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data");
const Category = require("./models/category");
const Blog = require("./models/blog");

//Relationships
    //One-to-Many
    Category.hasMany(Blog, { //One category has many blogs
        foreignKey: {
            name: 'categoryId',
            allowNull: true
        },
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
    }); 

    Blog.belongsTo(Category); //Each Blog has one category

//Applying - Sync

//IIFE - Async Blok
(async () =>{
    await sequelize.sync({ alter: true });
    await dummyData();
})();

app.listen(3000, function(){
    console.log("Listening on port 3000");
})