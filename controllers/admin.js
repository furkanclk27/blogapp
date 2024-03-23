const Blog = require("../models/blog");
const Category = require("../models/category");

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
            altbaslik: altbaslik,
            aciklama: aciklama,
            resim: resim,
            anasayfa: anasayfa,
            onay: onay,
            categoryId: kategori
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

   
}

exports.post_blog_edit = async function(req, res){
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
                categoryId: kategoriid
            });
            await blog.save();
            return res.redirect("/admin/blogs?action=edit&blogid=" + blogid);
        }
            res.redirect("/admin/blogs");
    }
    catch(err){
        console.log(err);
    }


}

exports.get_category_edit = async function(req, res){
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
        const blogs = await Blog.findAll({attributes:["id", "baslik", "altbaslik", "resim"]});
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