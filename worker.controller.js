const { Worker, parentPort } = require('worker_threads');
const { isEmpty } = require('./libs/is_empty');

let workerPool = new Map()

function fileWorkerFactory (fileName, channelAlias) {
    return new Promise((resolve, reject) => {
        let worker = new Worker(fileName);
        workerPool.set(channelAlias, worker)
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`stopped with  ${code} exit code`));
        })
    })
}

function simpleWorkerFactory (codeSnippet, channelAlias) {
    return new Promise((resolve, reject) => {
        let worker = new Worker(`${ codeSnippet }`, {
            eval: true
        })
        workerPool.set(channelAlias, worker)
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
        callWorker: callWorker.bind({ worker }),
        listenToWorker: listenToWorker.bind({ worker })
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

module.exports = { fileWorkerFactory, simpleWorkerFactory, getChannel, sendFunctionToWorker, listenToParent, listenToWorker, callParent, callWorker }