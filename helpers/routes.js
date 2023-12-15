const path = require('path');


function initPageRoutes(app, express) {
    // app.use('/', (req, res) => {
    //     res.sendFile(path.join(__dirname, '../public/index.html'));
    // })

    app.use(express.static(path.join(__dirname, '../public'), {
        extensions: ['html', 'css', 'js', 'png', 'jpg', 'jpeg', 'gif', 'ico', 'svg'],
        index: 'index.html'
    }));
}


module.exports = {
    initPageRoutes
};