const expressInit = require('./expressInitialization.js')
const meteorController = require('../UseCases/meteorController.js')

app = expressInit()

app.get('/meteors', meteorController.getMeteors);
app.get('/meteorsView', meteorController.meteorsView);
app.post('/picture', meteorController.postPicture)