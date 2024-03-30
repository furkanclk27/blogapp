const express = require("express");
const router = express.Router();

const imageUpload = require("../helpers/image-upload");
const isAuth = require("../middlewares/auth");
const csrf = require("../middlewares/csrf");

const adminController = require("../controllers/admin");

//Blog Delete
router.get("/blog/delete/:blogid", isAuth, csrf, adminController.get_blog_delete);

router.post("/blog/delete/:blogid", isAuth, adminController.post_blog_delete);

//Category Delete
router.get("/category/delete/:categoryid", isAuth, csrf, adminController.get_category_delete);

router.post("/category/delete/:categoryid", isAuth, adminController.post_category_delete);

//Blog Create
router.get("/blog/create", isAuth, csrf, adminController.get_blog_create);

router.post("/blog/create", isAuth, imageUpload.upload.single("resim"), adminController.post_blog_create);

//Category Remove
router.post("/categories/remove", adminController.get_category_remove);

//Category Create
router.get("/category/create", isAuth, csrf, adminController.get_category_create);

router.post("/category/create", isAuth, adminController.post_category_create);

//Blog Details
router.get("/blogs/:blogid", isAuth, csrf, adminController.get_blog_edit);

router.post("/blogs/:blogid", isAuth, imageUpload.upload.single("resim"), adminController.post_blog_edit);


//Category Details
router.get("/categories/:categoryid", isAuth, csrf, adminController.get_category_edit);

router.post("/categories/:categoryid", isAuth, adminController.post_category_edit);

//All Blogs
router.get("/blogs", isAuth, adminController.get_blogs);

//All Categories
router.get("/categories", isAuth, adminController.get_categories);



module.exports = router;