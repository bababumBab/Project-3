

const secret = 'thisSecretIsSuperTrashButItWillBeOkForNow'

module.exports = {
  secret
}

const port = process.env.PORT || 4000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/database-name'
