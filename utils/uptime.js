const os = require('os');
const process = require('process');

const psup = () => {
    var ps_ut_sec = Math.floor(process.uptime());
    var ps_ut_min = Math.floor(ps_ut_sec/60);
    var ps_ut_hour = Math.floor(ps_ut_min/60);
    ps_hour = ps_ut_hour%60;
    ps_min = ps_ut_min%60;
    ps_sec = ps_ut_sec%60;
    return { ps_sec, ps_min, ps_hour};
};

const sysup = () => {
    var os_ut_sec = Math.floor(os.uptime());
    var os_ut_min = Math.floor(os_ut_sec/60);
    var os_ut_hour = Math.floor(os_ut_min/60);
    os_hour = os_ut_hour%60;
    os_min = os_ut_min%60;
    os_sec = os_ut_sec%60;
    return { os_sec, os_min, os_hour};
};


module.exports = {
    psup,
    sysup,
}
