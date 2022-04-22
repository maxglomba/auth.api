import { app } from './app';

app.listen(process.env.PORT || 5000, function () {
    console.log('App is running on port' + process.env.PORT + '!');
});