const nodemailer = require('nodemailer')


const sendEmail = async (req,res) => {
  let testAccount = await nodemailer.createTestAccount()

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'howell98@ethereal.email',
        pass: 'ftux1pU2svbCjDUF16'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let info = await transporter.sendMail({
    from:'"Ilham Surya" <ilham.surya@gmail.com>',
    to: 'zukeberg@gmail.com',
    subject: 'Hai',
    html: '<h2>oi Meta gimana kabar</h2>'
  })
  res.json(info)
}

module.exports = sendEmail