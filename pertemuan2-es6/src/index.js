let getMember = new Promise((resolve, reject) => {
    if (false) {
        resolve('Berhasil!')
    }

    reject('Gagal!')
})

console.log(getMember.then((msg) => {
    console.log('Ini dalam catch log ' + msg)
}, (msg) => {
    console.log('Ini dalam catch log baru' + msg)
}))

// import forum from './app/forum'

// console.log(forum)
