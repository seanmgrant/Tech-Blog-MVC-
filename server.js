const express = require('express');
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const PORT = process.env.PORT || 3001;
const app = express();  

const sess = {
    secret: "super super secret",
    cookie: { originalMaxAge: 600000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
    db: sequelize
    })
};




app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes);

sequelize.sync();

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});