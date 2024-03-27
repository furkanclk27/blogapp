const Blog = require("../models/blog");
const Category = require("../models/category");
const { Op } = require("sequelize");
const sequelize = require("../data/db");
const slugField = require("../helpers/slugfield");

const fs = require("fs");

exports.get_blog_delete = async function(req,res){
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
}

exports.post_blog_delete = async function(req, res){
    const blogid = req.body.blogid;

    try{
        await Blog.destroy({
            where:{
                id: blogid
            }
        }
        );
        
        return res.redirect("/admin/blogs?action=delete");       
    }
    catch(err){
        console.log(err);
    }
}

exports.get_category_delete = async function(req,res){
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
}

exports.post_category_delete = async function(req, res){
    const categoryid = req.body.categoryid;

    try{
        await Category.destroy({
            where:{
                id: categoryid
            }
        });
         res.redirect("/admin/categories?action=catdelete");
    }
    catch(err){
        console.log(err);
    }
}

exports.get_blog_create = async function(req, res){
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
}

exports.post_blog_create = async function(req, res) {
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
            url: slugField(baslik),
            altbaslik: altbaslik,
            aciklama: aciklama,
            resim: resim,
            anasayfa: anasayfa,
            onay: onay
        });
        res.redirect("/admin/blogs?action=create");
    }

    catch(err){
        console.log(err); 
    }

}

exports.get_category_create = async function(req, res){
    try{
            res.render("admin/category-create", {
            title: "Add Category"
        });
    }
    catch(err){
    console.log(err);
    }
}

exports.post_category_create = async function(req, res) {
    const name = req.body.name;

    try{
        await Category.create({name: name});
        res.redirect("/admin/categories?action=catcreate");
    }

    catch(err){
        console.log(err); 
    }

}

exports.get_blog_edit = async function(req, res){
    const blogid = req.params.blogid;

    try{
        const blog = await Blog.findOne({
            where:{
                id: blogid
            },
            include: {
                model: Category,
                attributes: ["id"]
            }
        });
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

   
}

exports.post_blog_edit = async function(req, res){
    const blogid = req.body.blogid;
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    const kategoriIds = req.body.categories;
    const url = req.body.url;

    let resim = req.body.resim;

    if(req.file){
        resim = req.file.filename;

        fs.unlink("./public/images/" + req.body.resim, err=>{
            console.log(err);
        });

    }

    const anasayfa = req.body.anasayfa=="on"? 1:0;
    const onay = req.body.onay=="on"? 1:0;

    try{
        const blog = await Blog.findOne({
            where:{
                id: blogid
            },
            include: {
                model: Category,
                attributes: ["id"]
            }
        });

        if(blog){
            blog.set({
                baslik:baslik,
                altbaslik: altbaslik,
                aciklama: aciklama,
                resim: resim,
                anasayfa: anasayfa,
                onay: onay,
                url: url
            });

            if(kategoriIds == undefined){
                await blog.removeCategories(blog.categories);
            }

            else {
                await blog.removeCategories(blog.categories);
                const selectedCategories = await Category.findAll({
                    where:{
                        id: {
                            [Op.in]: kategoriIds //Admin selects category(ies) for the blog
                        }
                    }
                });
                await blog.addCategories(selectedCategories); //Admin sends selected categories to db for the blog
            }

            await blog.save();
            return res.redirect("/admin/blogs?action=edit&blogid=" + blogid);
        }
            res.redirect("/admin/blogs");
    }
    catch(err){
        console.log(err);
    }


}

exports.get_category_remove = async function (req, res){
    const blogid = req.body.blogid;
    const categoryid = req.body.categoryid;

    await sequelize.query(`DELETE FROM blogCategories WHERE blogId = ${blogid} AND categoryId = ${categoryid}`);
    res.redirect("/admin/categories/" + categoryid);
}

exports.get_category_edit = async function(req, res){
    const categoryid = req.params.categoryid;

    try{
        const category = await Category.findByPk(categoryid);
        const blogs = await category.getBlogs();//This brings all blogs that belongs to same category
        const countBlog = await category.countBlogs();//This brings the number of selected category

        if(category){
            return res.render("admin/category-edit", {
                title:category.dataValues.name,
                category:category.dataValues,
                blogs: blogs,
                countBlog: countBlog
        });

        }
        res.redirect("admin/categories");

    }
    catch(err){
        console.log(err);
    }

   
}

exports.post_category_edit = async function(req, res){
    const categoryid = req.body.categoryid;
    const name = req.body.name;

    try{
        await Category.update({ name: name}, {//Practical
            where: {
                id: categoryid
            }
        });
        return res.redirect("/admin/categories?action=edit&categoryid=" + categoryid);
    }
    catch(err){
        console.log(err);
    }


}

exports.get_blogs = async function(req, res){
    try{
        const blogs = await Blog.findAll({
            attributes:["id", "baslik", "altbaslik", "resim"],
            include: {
                model: Category,
                attributes: ["name"] // Just bring the name
            }
        });
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
    
}

exports.get_categories = async function(req, res){
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

   
}