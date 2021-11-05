//枚举的方法，注意在LoginType中写入isThisType
function isThisType(val) {
    for (let key in this) {
        if (this[key] == val) {
            return true
        }
    }
    return false
}

const LoginType = {
    USER_MINI_PROGRAM: 100, // 用户小程序
    USER_EMAIL: 101, // 用户emali
    USER_MOBILE: 102, // 用户手机号
    ADMIN_EMAIL: 200, // 超级管理员emali
    isThisType
}

const ArtType = {
    MOVIE: 100,
    MUSIC: 200,
    SENTENCE: 300,
    BOOK: 400,
    isThisType
}

module.exports = {
    LoginType,
    ArtType
}