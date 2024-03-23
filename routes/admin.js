const express = require("express");
const router = express.Router();

const imageUpload = require("../helpers/image-upload");

const adminController = require("../controllers/admin");

//Blog Delete
router.get("/blog/delete/:blogid", adminController.get_blog_delete);

router.post("/blog/delete/:blogid", adminController.post_blog_delete);

//Category Delete
router.get("/category/delete/:categoryid", adminController.get_category_delete);

router.post("/category/delete/:categoryid", adminController.post_category_delete);

//Blog Create
router.get("/blog/create", adminController.get_blog_create);

router.post("/blog/create", imageUpload.upload.single("resim"), adminController.post_blog_create);

//Category Create
router.get("/category/create", adminController.get_category_create);

router.post("/category/create", adminController.post_category_create);

//Blog Details
router.get("/blogs/:blogid", adminController.get_blog_edit);

router.post("/blogs/:blogid", imageUpload.upload.single("resim"), adminController.post_blog_edit);



//Category Details
router.get("/categories/:categoryid", adminController.get_category_edit);

router.post("/categories/:categoryid", adminController.post_category_edit);

//All Blogs
router.get("/blogs", adminController.get_blogs);

//All Categories
router.get("/categories", adminController.get_categories);



module.exports = router;