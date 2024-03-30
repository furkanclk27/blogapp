const User = require("../models/user");
const bcrypt = require("bcrypt");
const emailService = require("../helpers/send-mail");
const config = require("../config");

exports.get_register = async function(req, res){
    try{
        return res.render("auth/register", {
            title: "Register"
        });
    }
    catch(err){
        console.log(err);
    }
}

exports.post_register = async function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        const user = await User.findOne({ where: { email: email }});
        if(user){
            req.session.message = { text: "Bu email adresiyle daha önce bir hesap oluşturulmuş.", class: "warning" };
            return res.redirect("login");
        }
        const newUser = await User.create({ fullname: name, email: email, password: hashedPassword });

        emailService.sendMail({
            from: config.email.from,
            to: newUser.email,
            subject: "Hesabınız oluşturuldu.",
            text: "Hesabınız başarıyla oluşturuldu."
        });

        req.session.message = { text: "Hesabınıza giriş yapabilirsiniz.", class: "success" };

        return res.redirect("login");
    }
    catch(err){
        console.log(err);
    }
}

exports.get_login = async function(req, res){
    const message = req.session.message;
    delete req.session.message;
    try{
        return res.render("auth/login", {
            title: "Login",
            message: message,
            csrfToken: req.csrfToken()
        });
    }
    catch(err){
        console.log(err);
    }
}

exports.get_logout = async function(req, res){
    try{
        await req.session.destroy();
        return res.redirect("/account/login");
    }
    catch(err){
        console.log(err);
    }
}

exports.post_login = async function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    try{
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if(!user){
            return res.render("auth/login", {
                title: "Login",
                message: { text: "Hatalı Email!", class: "danger" }
            });
        }

        //Password check
        const match = await bcrypt.compare(password, user.password);

        if(match){
            req.session.isAuth = true;
            req.session.fullname = user.fullname;
            const url = req.query.returnUrl || "/";
            return res.redirect(url);
        }

        return res.render("auth/login", {
            title: "Login",
            message: { text: "Hatalı Parola!", class: "danger" }
        });

    }
    catch(err){
        console.log(err);
    }
}