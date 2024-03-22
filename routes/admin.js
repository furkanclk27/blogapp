const express = require("express");
const router = express.Router();
const fs = require("fs");

const imageUpload = require("../helpers/image-upload");

const Blog = require("../models/blog");
const Category = require("../models/category");

//Blog Delete
router.get("/blog/delete/:blogid", async function(req,res){
    const blogid = req.params.blogid;

    try{
        const blog = await Blog.findByPk(blogid);

        if(blog){
            res.render("admin/blog-delete", {
                title:"Delete Blog",
                blog: blog
            });
        }
        res.redirect("/admin/blogs");

    }
    catch(err){
        console.log(err);
    }
});

router.post("/blog/delete/:blogid", async function(req, res){
    const blogid = req.body.blogid;

    try{
        await Blog.destroy({//Practical
            where:{
                blogid: blogid
            }
        });
        return res.redirect("/admin/blogs?action=delete");       
    }
    catch(err){
        console.log(err);
    }
});

//Category Delete
router.get("/category/delete/:categoryid", async function(req,res){
    const categoryid = req.params.categoryid;

    try{
        const category = await Category.findByPk(categoryid);

        res.render("admin/category-delete", {
            title:"Delete Category",
            category: category
        })
    }
    catch(err){
        console.log(err);
    }
});

router.post("/category/delete/:categoryid", async function(req, res){
    const categoryid = req.body.categoryid;

    try{
        await Category.destroy({
            where:{
                categoryid: categoryid
            }
        });
        res.redirect("/admin/categories?action=catdelete");
    }
    catch(err){
        console.log(err);
    }
});

//Blog Create
router.get("/blog/create", async function(req, res){
    try{
        const categories = await Category.findAll();
        res.render("admin/blog-create", {
            title: "Add Blog",
            categories: categories
        });
    }
    catch(err){
    console.log(err);
    }
});

router.post("/blog/create", imageUpload.upload.single("resim"), async function(req, res) {
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    const resim = req.file.filename;
    const kategori = req.body.kategori;
    const anasayfa = req.body.anasayfa == "on" ? 1:0;
    const onay = req.body.onay == "on" ? 1:0;

    try{
        await Blog.create({
            baslik: baslik,
            altbaslik: altbaslik,
            aciklama: aciklama,
            resim: resim,
            anasayfa: anasayfa,
            onay: onay,
            categoryid: kategori
        });
        res.redirect("/admin/blogs?action=create");
    }

    catch(err){
        console.log(err); 
    }

});

//Blog Details
router.get("/blogs/:blogid", async function(req, res){
    const blogid = req.params.blogid;

    try{
        const blog = await Blog.findByPk(blogid);
        const categories = await Category.findAll();

        if(blog){
            return res.render("admin/blog-edit", {
                title:blog.dataValues.baslik,
                blog: blog.dataValues,
                categories: categories
            }); 
        }
        res.redirect("admin/blogs");
    }
    catch(err){
        console.log(err);
    }

   
});

router.post("/blogs/:blogid", imageUpload.upload.single("resim"), async function(req, res){
    const blogid = req.body.blogid;
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    let resim = req.body.resim;

    if(req.file){
        resim = req.file.filename;

        fs.unlink("./public/images/" + req.body.resim, err=>{
            console.log(err);
        });

    }

    const anasayfa = req.body.anasayfa=="on"? 1:0;
    const onay = req.body.onay=="on"? 1:0;
    const kategoriid = req.body.kategori;

    try{
        const blog = await Blog.findByPk(blogid);
        if(blog){
            blog.set({
                baslik:baslik,
                altbaslik: altbaslik,
                aciklama: aciklama,
                resim: resim,
                anasayfa: anasayfa,
                onay: onay,
                categoryid: kategoriid
            });
            await blog.save();
            return res.redirect("/admin/blogs?action=edit&blogid=" + blogid);
        }
            res.redirect("/admin/blogs");
    }
    catch(err){
        console.log(err);
    }


});

//Category Create
router.get("/category/create", async function(req, res){
    try{
            res.render("admin/category-create", {
            title: "Add Category"
        });
    }
    catch(err){
    console.log(err);
    }
});

router.post("/category/create", async function(req, res) {
    const name = req.body.name;

    try{
        await Category.create({name: name});
        res.redirect("/admin/categories?action=catcreate");
    }

    catch(err){
        console.log(err); 
    }

});

//Category Details
router.get("/categories/:categoryid", async function(req, res){
    const categoryid = req.params.categoryid;

    try{
        const category = await Category.findByPk(categoryid);

        if(category){
            return res.render("admin/category-edit", {
                title:category.dataValues.name,
                category:category.dataValues
        });

        }
        res.redirect("admin/categories");

    }
    catch(err){
        console.log(err);
    }

   
});

router.post("/categories/:categoryid", async function(req, res){
    const categoryid = req.body.categoryid;
    const name = req.body.name;

    try{
        await Category.update({ name: name}, {//Practical
            where: {
                categoryid: categoryid
            }
        });
        return res.redirect("/admin/categories?action=edit&categoryid=" + categoryid);
    }
    catch(err){
        console.log(err);
    }


});

//All Blogs
router.get("/blogs", async function(req, res){
    try{
        const blogs = await Blog.findAll({attributes:["blogid", "baslik", "altbaslik", "resim"]});
        console.log(blogs);
        res.render("admin/blog-list",{
            title: "Blog List",
            blogs: blogs,
            action: req.query.action,
            blogid: req.query.blogid
        });
    }
    catch(err){
        console.log(err);
    }
    
});

//All Categories
router.get("/categories", async function(req, res){
    try{
        const categories = await Category.findAll();

        console.log(categories);

        res.render("admin/category-list", {
            title:"category-list",
            categories: categories,
            action: req.query.action,
            categoryid: req.query.categoryid
        }); 
    }
    catch(err){
        console.log(err);
    }

   
});



module.exports = router;