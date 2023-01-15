let { workerHandlerFactory, getChannel, callWorker } = require('./worker.controller')

workerHandlerFactory('./app-one.js', 'app-one')

getChannel('app-one').listenToWorker(el=>console.log("[MAIN]: ", el))

setInterval(_=>{
    callWorker(`[${ new Date().getTime() }] Hello to workers`)
}, 1000)