const Blog = require("../models/blog");
const Category = require("../models/category");

const { Op } = require("sequelize");

exports.blogs_by_category = async function(req,res){
    const slug = req.params.slug;
    try{
        const blogs = await Blog.findAll({
            where:{
                onay: true
            },
            include: {
                model: Category,
                where:{url: slug}
            },
            raw: true
        });
        const categories = await Category.findAll({ raw:true });

        res.render("users/blogs", {
            title: "Tüm Kurslar",
            blogs: blogs,
            categories: categories,
            selectedCategory: slug
        })
    }
    catch(err){
        console.log(err);
    }
}

exports.blogs_details = async function(req, res){
    const slug = req.params.slug;
    try{
        const blog = await Blog.findOne({
            where: {
                url: slug
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
}

exports.blog_list = async function(req, res){
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

}

exports.index = async function(req, res){

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

}