var keystone = require('keystone');
var request = require('request');
var cheerio = require('cheerio');
point = keystone.list('point');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = 'pointQrcode';

    view.on('init', async function (next) {
        const points = await point.model.find({
            state: { $in: ['DEPLOY', 'OPEN'] }
        }).exec();
        locals.points = points;
        locals.state = 'PRE';
        next();
    });

    view.on('get', { state: 'CREATE' }, async function (next) {

        const pointUrl = process.env.SIT_URL + '/scan/point/' + req.query.pointId;
        request.get({
            url: 'https://cli.im/api/qrcode/code?text=' + pointUrl + '&mhid=skTHBF3tnJ4hMHctLdZVOaI'
        }, (err, ret, body) => {
            var $ = cheerio.load(body);
            const url = 'http:' + $('img').attr('src');

            locals.state = 'CREATE';
            locals.qrcodeUrl = url;
            next();
        });
    });

    view.render('pointQrcode');
};
