const { Worker, parentPort } = require('worker_threads');
const { isEmpty } = require('./libs/is_empty');

let workerPool = new Map()

function workerHandlerFactory (fileName, channelAlias) {
    return new Promise((resolve, reject) => {
        workerPool.set(channelAlias, new Worker(fileName))
        let worker = workerPool.get(channelAlias);
        // worker.on('message', resolve);
        resolve({ workerName: fileName })
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`stopped with  ${code} exit code`));
        })
    })

}

function getChannel(channelAlias) {
    let worker = workerPool.get(channelAlias);
    return {
        callWorker: Object.bind(this, { worker} ),
        listenToWorker: Object.bind(this, { worker} )
    }
}

function sendFunctionToWorker(cb) {
    parentPort.postMessage(cb())
}

function callWorker(message) {
    this.worker.postMessage(message);
}

function callParent(message) {
    parentPort.postMessage(message);
}

function listenToParent(cb) {
    parentPort.on('message', (message) => {
        if ( !isEmpty(message) )
            cb(message)
    });
}

function listenToWorker(cb) {
    this.worker.on('message', (message) => {
        if ( !isEmpty(message) )
            cb(message)
    });
}

module.exports = { workerHandlerFactory, getChannel, sendFunctionToWorker, listenToParent, listenToWorker, callParent, callWorker }