const log = require('../log/clog');

export default function loadUsergroup(context, payload, done) {
    log.info(context);
    context.service.read('usergroup.read', payload, { timeout: 20 * 1000 }, (err, res) => {
        if (err) {
            //do nothing
        }
        else {
            context.dispatch('DECKEDIT_LOAD_USERGROUP', res[0]);
            // console.log('got users of a group:', res);
        }
        done();
    });
}
