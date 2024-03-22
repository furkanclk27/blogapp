//Blog Model
const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Blog = sequelize.define("blog", {
    blogid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    baslik: {
        type: DataTypes.STRING,
        allowNull: false
    },
    altbaslik: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aciklama: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    resim: {
        type: DataTypes.STRING,
        allowNull: false
    },
    anasayfa: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    onay: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    categoryid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

async function sync(){
    await Blog.sync({alter: true});
    const count = await Blog.count();

    if(count == 0){
        await Blog.create({
            baslik: "Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
            altbaslik: "Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
            aciklama: "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!Üstelik 30 gün iade garantisiyle!",
            resim: "5.jpg",
            anasayfa: true,
            onay: true,
            categoryid: 1
        });
        
        await Blog.create({
            baslik: "Sıfırdan Uygulamalı React Geliştirme: Hooks, Redux & Firebase",
            altbaslik: "En popüler frontend kütüphanesi React'i baştan sona uygulamalı projelerle öğren. Hooks, Redux, Webpack, Firebase ve Fazlası.",
            aciklama: "Son zamanların en popüler frontend kütüphanesi React 'i baştan sona uygulamalı projelerle öğrenmeye ne dersiniz? React; facebook firması tarafından geliştirilen ve kullanıcı arayüzlerini kolaylıkla oluşturmamıza olanak sağlayan oldukça güzel bir Javascript kütüphanesidir.",
            resim: "7.jpg",
            anasayfa: true,
            onay: true,
            categoryid: 1
        });
    }

}

sync();

module.exports = Blog;