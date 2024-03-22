const express = require("express");
const router = express.Router();

const Blog = require("../models/blog");
const Category = require("../models/category");

const { Op } = require("sequelize");

router.use("/blogs/category/:categoryid", async function(req,res){
    const id = req.params.categoryid;
    try{
        const blogs = await Blog.findAll({
            where:{
                categoryid: id,
                onay: true
            },
            raw: true
        });
        const categories = await Category.findAll({ raw:true });

        res.render("users/blogs", {
            title: "Tüm Kurslar",
            blogs: blogs,
            categories: categories,
            selectedCategory: id
        })
    }
    catch(err){
        console.log(err);
    }
});

router.use("/blogs/:blogid", async function(req, res){
    const id = req.params.blogid;
    try{
        const blog = await Blog.findOne({
            where: {
                blogid: id
            },
            raw: true
        });

        if(blog){
            return res.render("users/blog-details", {
                title: blog.baslik,
                blog: blog
            });
        }
        res.redirect("/");    
    }
    catch(err){
        console.log(err);
    }
});

router.use("/blogs", async function(req, res){
    try{
        const blogs = await Blog.findAll({
            where: {
                onay: {
                    [Op.eq]: true //onay = 1
                }
            },
            raw: true
        });
        const categories = await Category.findAll({ raw: true});

        res.render("users/blogs", {
            title: "Tüm Kurslar",
            blogs: blogs,
            categories: categories,
            selectedCategory: null
        })
    }
    catch(err){
        console.log(err);
    }

});

router.use("/", async function(req, res){

    try{
        const blogs = await Blog.findAll({
            where: {
                [Op.and]: [
                    { anasayfa: true },
                    { onay: true }
                ]
            },
            raw: true
        }           
        );

        const categories = await Category.findAll({ raw: true });

        res.render("users/index", {
            title: "Popüler Kurslar",
            blogs: blogs,
            categories: categories,
            selectedCategory: null
        })
    }
    catch(err){
        console.log(err);
    }

});

module.exports = router;//erisim saglandi

