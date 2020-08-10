const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "673bcbea29874a",
    pass: "51643a102c7e9d"
  }
});