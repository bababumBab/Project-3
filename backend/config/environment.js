

const secret = 'thisSecretIsSuperTrashButItWillBeOkForNow'
const port = process.env.PORT || 8000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/events-db'

module.exports = {
  secret,
  port,
  dbURI
}

