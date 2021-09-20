const app = require('./app.js');
const PORT = process.env.PORT || 9090;

app.listen(PORT, (err) => {
  if (err) throw err;
  else {
    console.log(`listening in ${process.env.NODE_ENV} mode on port ${PORT}...`);
  }
});
