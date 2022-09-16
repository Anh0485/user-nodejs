
import db from '../models/index';
import CRUDService from '../services/CRUDService.js';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('-------------')
        console.log(data)
        console.log('-------------')

        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });

    } catch (e) {
        console.log(e)
    }
    let data = await db.user.findAll();
    return res.render('homepage.ejs');
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('test/crud.ejs')
}

let postCRUD = async (req, res) => {
    let messege = await CRUDService.createNewUser(req.body);
    console.log(messege);
    console.log(req.body);
    return res.send('post crud from server');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('----------')
    console.log(data)
    console.log('----------')

    return res.render('display-crud.ejs', {
        dataTable: data
    })

}

let getEditCRUD = async (req, res) => {

    let userId = req.query.id;

    console.log(userId)

    if (userId) {

        let userData = await CRUDService.getUserInfoById(userId);
        //check userdata not found

        //let userData
        return res.render('editCRUD.ejs', {
            user: userData,
        })

    }
    else {

        return res.send('User not found');

    }
    console.log(req.query.id);
    return res.send('hello from edit page')
}
let putCRUD = async (req, res) => {

    let data = req.body;

    //lấy được input 
    let allUser = await CRUDService.updateUserData(data);
    // return res.send('update done!');
    return res.render('display-crud.ejs', {
        dataTable: allUser,
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteById(id);
        let data = await CRUDService.getAllUser();
        return res.render('display-crud.ejs', {
            dataTable: data,
        })
    } else {
        return res.send('user not found')
    }


}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,

}
