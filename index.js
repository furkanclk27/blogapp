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

app.listen(3000, function(){
    console.log("Listening on port 3000");
})