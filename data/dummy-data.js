const Category = require("../models/category");
const Blog = require("../models/blog");
const slugField = require("../helpers/slugfield");
const User = require("../models/user");
const bcrypt = require("bcrypt");

async function populate(){
    const count = await Category.count();

    if(count == 0){

        const categories = await Category.bulkCreate([
            { name: "Web Geliştirme", url: slugField("Web Geliştirme") },
            { name: "Mobil Geliştirme", url: slugField("Mobil Geliştirme") },
            { name: "Programlama", url: slugField("Programlama") },
            { name: "Veri Analizi", url: slugField("Veri Analizi") }
        ]);

        const blogs = await Blog.bulkCreate([
            {
            baslik: "Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
            url: slugField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
            altbaslik: "Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
            aciklama: "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!Üstelik 30 gün iade garantisiyle!",
            resim: "5.jpg",
            anasayfa: true,
            onay: true
            },
            {
            baslik: "Sıfırdan Uygulamalı React Geliştirme: Hooks, Redux & Firebase",
            url: slugField("Sıfırdan Uygulamalı React Geliştirme: Hooks, Redux & Firebase"),
            altbaslik: "En popüler frontend kütüphanesi React'i baştan sona uygulamalı projelerle öğren. Hooks, Redux, Webpack, Firebase ve Fazlası.",
            aciklama: "Son zamanların en popüler frontend kütüphanesi React 'i baştan sona uygulamalı projelerle öğrenmeye ne dersiniz? React; facebook firması tarafından geliştirilen ve kullanıcı arayüzlerini kolaylıkla oluşturmamıza olanak sağlayan oldukça güzel bir Javascript kütüphanesidir.",
            resim: "7.jpg",
            anasayfa: true,
            onay: true
            },{
            baslik: "Python ile Sıfırdan İleri Seviye Python Programlama",
            url: slugField("Python ile Sıfırdan İleri Seviye Python Programlama"),
            altbaslik: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
            aciklama: "Neden Python? Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır. sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin. Python programlamanın popülerliğinden dolayı bir çok yazılımcı ve firma python için kütüphaneler oluşturup python kütüphane havuzunda paylaşmaktadır. Dolayısıyla python dünyasına giriş yaptığımızda işlerimizi kolaylaştıracak bazı imkanlara sahip oluyoruz.",
            resim: "1.jpg", 
            anasayfa: true, 
            onay: true
            },{
            baslik: ".Net Core Web Api & Angular ile Proje Geliştirme Kursu",
            url: slugField(".Net Core Web Api & Angular ile Proje Geliştirme Kursu"),
            altbaslik: "Sıfırdan asp.net core web api ve angular 9 kullanarak baştan sona proje geliştiyoruz.",
            aciklama: "Farklı platformlarda geliştirdiğiniz web, mobil, masaüstü vb. uygulamalar için verilerinizi tek bir yerden yönetmek asp net core web api ile artık çok kolay. Servis tabanlı bir uygulama talebi son zamanlarda çok popüler hale geldi. Çünkü veri erişim kodlarımızı her platforma özel tek tek yazmaktansa bir servis üzerinden bir defa yazmak çok daha mantıklıdır.",
            resim: "4.jpg",
            anasayfa: true,
            onay: true
            },
            {
            baslik: "Sıfırdan Uygulamalı React Geliştirme: Hooks, Redux & Firebase",
            url: slugField("Sıfırdan Uygulamalı React Geliştirme: Hooks, Redux & Firebase"),
            altbaslik: "En popüler frontend kütüphanesi React'i baştan sona uygulamalı projelerle öğren. Hooks, Redux, Webpack, Firebase ve Fazlası.",
            aciklama: "Son zamanların en popüler frontend kütüphanesi React 'i baştan sona uygulamalı projelerle öğrenmeye ne dersiniz? React; facebook firması tarafından geliştirilen ve kullanıcı arayüzlerini kolaylıkla oluşturmamıza olanak sağlayan oldukça güzel bir Javascript kütüphanesidir.",
            resim: "7.jpg",
            anasayfa: true,
            onay: true
            },{
            baslik: "Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
            url: slugField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
            altbaslik: "Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
            aciklama: "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!Üstelik 30 gün iade garantisiyle!",
            resim: "5.jpg",
            anasayfa: true,
            onay: true
                
            },{
            baslik: "Python ile Sıfırdan İleri Seviye Python Programlama",
            url: slugField("Python ile Sıfırdan İleri Seviye Python Programlama"),
            altbaslik: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
            aciklama: "Neden Python? Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır. sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin. Python programlamanın popülerliğinden dolayı bir çok yazılımcı ve firma python için kütüphaneler oluşturup python kütüphane havuzunda paylaşmaktadır. Dolayısıyla python dünyasına giriş yaptığımızda işlerimizi kolaylaştıracak bazı imkanlara sahip oluyoruz.",
            resim: "1.jpg", 
            anasayfa: true, 
            onay: true
            },{
            baslik: ".Net Core Web Api & Angular ile Proje Geliştirme Kursu",
            url: slugField(".Net Core Web Api & Angular ile Proje Geliştirme Kursu"),
            altbaslik: "Sıfırdan asp.net core web api ve angular 9 kullanarak baştan sona proje geliştiyoruz.",
            aciklama: "Farklı platformlarda geliştirdiğiniz web, mobil, masaüstü vb. uygulamalar için verilerinizi tek bir yerden yönetmek asp net core web api ile artık çok kolay. Servis tabanlı bir uygulama talebi son zamanlarda çok popüler hale geldi. Çünkü veri erişim kodlarımızı her platforma özel tek tek yazmaktansa bir servis üzerinden bir defa yazmak çok daha mantıklıdır.",
            resim: "4.jpg",
            anasayfa: true,
            onay: true
            },{
            baslik: "Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
            url: slugField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
            altbaslik: "Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
            aciklama: "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!Üstelik 30 gün iade garantisiyle!",
            resim: "5.jpg",
            anasayfa: true,
            onay: true
            },
            {
            baslik: "Sıfırdan Uygulamalı React Geliştirme: Hooks, Redux & Firebase",
            url: slugField("Sıfırdan Uygulamalı React Geliştirme: Hooks, Redux & Firebase"),
            altbaslik: "En popüler frontend kütüphanesi React'i baştan sona uygulamalı projelerle öğren. Hooks, Redux, Webpack, Firebase ve Fazlası.",
            aciklama: "Son zamanların en popüler frontend kütüphanesi React 'i baştan sona uygulamalı projelerle öğrenmeye ne dersiniz? React; facebook firması tarafından geliştirilen ve kullanıcı arayüzlerini kolaylıkla oluşturmamıza olanak sağlayan oldukça güzel bir Javascript kütüphanesidir.",
            resim: "7.jpg",
            anasayfa: true,
            onay: true
            },{
                baslik: ".Net Core Web Api & Angular ile Proje Geliştirme Kursu",
                url: slugField(".Net Core Web Api & Angular ile Proje Geliştirme Kursu"),
                altbaslik: "Sıfırdan asp.net core web api ve angular 9 kullanarak baştan sona proje geliştiyoruz.",
                aciklama: "Farklı platformlarda geliştirdiğiniz web, mobil, masaüstü vb. uygulamalar için verilerinizi tek bir yerden yönetmek asp net core web api ile artık çok kolay. Servis tabanlı bir uygulama talebi son zamanlarda çok popüler hale geldi. Çünkü veri erişim kodlarımızı her platforma özel tek tek yazmaktansa bir servis üzerinden bir defa yazmak çok daha mantıklıdır.",
                resim: "4.jpg",
                anasayfa: true,
                onay: true
                },
            {
            baslik: "Python ile Sıfırdan İleri Seviye Python Programlama",
            url: slugField("Python ile Sıfırdan İleri Seviye Python Programlama"),
            altbaslik: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
            aciklama: "Neden Python? Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır. sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin. Python programlamanın popülerliğinden dolayı bir çok yazılımcı ve firma python için kütüphaneler oluşturup python kütüphane havuzunda paylaşmaktadır. Dolayısıyla python dünyasına giriş yaptığımızda işlerimizi kolaylaştıracak bazı imkanlara sahip oluyoruz.",
            resim: "1.jpg", 
            anasayfa: true, 
            onay: true
            }
        ]);

        const users = await User.bulkCreate([
            { fullname: "Furkan Çelik", email: "furkanomer175337@gmail.com", password: await bcrypt.hash("furkan123", 10)},
            { fullname: "Mehmet Çelik", email: "mehmet-027271@gmail.com", password: await bcrypt.hash("mehmet123", 10)}
        ]);

        await blogs[0].addCategory(categories[0]);
        await blogs[0].addCategory(categories[2]);

        await blogs[1].addCategory(categories[0]);
        await blogs[1].addCategory(categories[2]);

        await blogs[2].addCategory(categories[0]);
        await blogs[2].addCategory(categories[2]);

        await blogs[3].addCategory(categories[0]);
        await blogs[3].addCategory(categories[2]);

        await blogs[4].addCategory(categories[0]);
        await blogs[4].addCategory(categories[2]);

        await blogs[5].addCategory(categories[0]);
        await blogs[5].addCategory(categories[1]);

        await blogs[6].addCategory(categories[1]);
        await blogs[6].addCategory(categories[3]);

        await blogs[7].addCategory(categories[1]);
        await blogs[7].addCategory(categories[3]);

        await blogs[8].addCategory(categories[0]);
        await blogs[8].addCategory(categories[2]);

        await blogs[9].addCategory(categories[0]);
        await blogs[9].addCategory(categories[2]);

        await blogs[10].addCategory(categories[0]);
        await blogs[10].addCategory(categories[2]);

        await blogs[11].addCategory(categories[0]);
        await blogs[11].addCategory(categories[3]);

        await categories[2].addBlog(blogs[2]);
        await categories[3].addBlog(blogs[2]);

        await categories[0].addBlog(blogs[3]);
        await categories[2].addBlog(blogs[3]);
    }
}

module.exports = populate;
