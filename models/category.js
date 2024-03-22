//Category Model
const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Category = sequelize.define("category", {
    categoryid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

},{
    timestamps: false
});

async function sync(){
    await Category.sync({alter: true});
    console.log("Category tablosu eklendi");

    const count = await Category.count();

    if(count == 0){
    await Category.bulkCreate([
        { name: "Web Geliştirme" },
        { name: "Mobil Geliştirme" },
        { name: "Programlama" }
    ]);
    }
    console.log("Kategoriler eklendi");
}

sync();

module.exports = Category;