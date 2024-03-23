const Category = require("../models/category");
const Blog = require("../models/blog");

async function populate(){
    const count = await Category.count();

    if(count == 0){
        await Category.bulkCreate([
            { name: "Web Geliştirme" },
            { name: "Mobil Geliştirme" },
            { name: "Programlama" }
        ]);

        await Blog.create({
            baslik: "Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
            altbaslik: "Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
            aciklama: "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!Üstelik 30 gün iade garantisiyle!",
            resim: "5.jpg",
            anasayfa: true,
            onay: true,
            categoryId: 1
        });
        
        await Blog.create({
            baslik: "Sıfırdan Uygulamalı React Geliştirme: Hooks, Redux & Firebase",
            altbaslik: "En popüler frontend kütüphanesi React'i baştan sona uygulamalı projelerle öğren. Hooks, Redux, Webpack, Firebase ve Fazlası.",
            aciklama: "Son zamanların en popüler frontend kütüphanesi React 'i baştan sona uygulamalı projelerle öğrenmeye ne dersiniz? React; facebook firması tarafından geliştirilen ve kullanıcı arayüzlerini kolaylıkla oluşturmamıza olanak sağlayan oldukça güzel bir Javascript kütüphanesidir.",
            resim: "7.jpg",
            anasayfa: true,
            onay: true,
            categoryId: 1
        });

        await Blog.create({
            baslik: "Sıfırdan Uygulamalı React Geliştirme: Hooks, Redux & Firebase",
            altbaslik: "En popüler frontend kütüphanesi React'i baştan sona uygulamalı projelerle öğren. Hooks, Redux, Webpack, Firebase ve Fazlası.",
            aciklama: "Son zamanların en popüler frontend kütüphanesi React 'i baştan sona uygulamalı projelerle öğrenmeye ne dersiniz? React; facebook firması tarafından geliştirilen ve kullanıcı arayüzlerini kolaylıkla oluşturmamıza olanak sağlayan oldukça güzel bir Javascript kütüphanesidir.",
            resim: "7.jpg",
            anasayfa: true,
            onay: true,
            categoryId: 2
        });

        await Blog.create({
            baslik: "Sıfırdan Uygulamalı React Geliştirme: Hooks, Redux & Firebase",
            altbaslik: "En popüler frontend kütüphanesi React'i baştan sona uygulamalı projelerle öğren. Hooks, Redux, Webpack, Firebase ve Fazlası.",
            aciklama: "Son zamanların en popüler frontend kütüphanesi React 'i baştan sona uygulamalı projelerle öğrenmeye ne dersiniz? React; facebook firması tarafından geliştirilen ve kullanıcı arayüzlerini kolaylıkla oluşturmamıza olanak sağlayan oldukça güzel bir Javascript kütüphanesidir.",
            resim: "7.jpg",
            anasayfa: true,
            onay: true,
            categoryId: 3
        });
    }
}

module.exports = populate;
