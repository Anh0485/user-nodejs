import userService from '../services/userServices';
let handleLogin = async (req, res) => {
    //tra ve chuoi string
    //api giao tiep giua server va server
    let email = req.body.email;
    let password = req.body.password;
    //check email người dùng tồn tại ko
    //compared password
    //có hai ngoại lệ
    //lỗi 1: email ko có trong hệ thống
    //lỗi 2: pass sai
    // sửa cơ sở dữ liệu, trả lại userInfo
    // access_token: JWT, mỗi một api ,json web token cơ chế bảo mật web

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Mising inputs parameter!!!'

        })
    }

    let userData = await userService.handleUserLogin(email, password);
    console.log(userData);

    return res.status(200).json({
        // errCode: 0,
        // message: 'hello world',
        // yourEmail: email,
        // yourpassword: password,
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}


    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; //all, id

    if (!id) {
        return res.status(200).json({

            errCode: 1,
            errMessage: 'missing required parameters',
            users: []
        })
    }


    let users = await userService.getAllUsers(id);
    return res.status(200).json({

        errCode: 0,
        errMessage: 'OK',
        users
    })



}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);

}

let handleEditUser = async(req, res) => {
    let data = req.body;

    //lấy được input 
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)
    // return res.send('update done!');
    
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "missing required parameters!"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}



module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
}