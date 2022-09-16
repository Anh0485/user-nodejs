
import bcrypt from 'bcryptjs';
import db from '../models/index';


const salt = bcrypt.genSaltSync(10);
//thuật toán sử dụng hash password

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })

            resolve('tao duoc user thanh cong')

        } catch (e) {
            reject(e);
        }
    })


    // console.log('data from services')

    console.log(data);

    // console.log(hashPasswordFromBcrypt);

}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        //vì sao dùng promise? để đảm bảo hàm trả ra cho chúng ta
        // tránh việc xử lý bất đồng bộ js 
        try {

            var hashPassword = await bcrypt.hashSync(password, salt);

            resolve(hashPassword)

        } catch (e) {

            reject(e);

        }

    })
}

let getAllUser = () => {
    //xử lý bất đồng bộ
    // viết code 
    //dòng code 1 2 3 
    // dùng các function 
    //dùng promise, chờ promise xử lý xong, sẽ chạy tiếp tục
    return new Promise((resolve, reject) => {

        try {
            //mỗi Model là mỗi bảng db
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        }
        catch (e) {
            reject(e);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })

            if (user) {
                resolve(user)
            }
            else {
                //trong trường hợp ko kiếm user, hàm trả ra mảng rỗng
                resolve([])
            }

        } catch (e) {

            reject(e);

        }
    })
}

let updateUserData = (data) => {
    // console.log('data from serivce');
    // console.log(data);

    return new Promise(async (resolve, reject) => {
        try {
            //trước khi update, phải biết id \

            let user = await db.User.findOne({
                where: { id: data.id }
            })

            if (user) {
                user.firstName = data.firstName,
                    user.lastName = data.lastName,
                    user.address = data.address,

                    await user.save();

                let allUser = await db.User.findAll({})
                resolve(allUser)
            }
            else {
                resolve();
            }


        } catch (e) {
            console.log(e);
        }
    })
}

let deleteById = (userId) => {
    return new Promise(async (resolve, reject) => {

        try {
            let user = await db.User.findOne({
                where: { id: userId }
                //lấy giá trị userId gán vào trường id
            })
            if (user) {
                await user.destroy();
            }
            resolve(); // return
        }
        catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteById: deleteById,
}