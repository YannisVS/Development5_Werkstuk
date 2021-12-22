const {
    app
} = require('./postgress')

const port = process.env.APIPORT || 5543;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});