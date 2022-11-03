const os = require('os');

const cpu_core = () => {
    // set Processor cores
    var vcore = os.cpus().length;
    pcore = vcore/2;

    return { pcore, vcore };
}

module.exports = {
    cpu_core
}