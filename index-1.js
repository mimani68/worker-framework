let { fileWorkerFactory, getWorker } = require('./libs/worker')

fileWorkerFactory('./app-one.js', 'app-one')
fileWorkerFactory('./app-two.js', 'app-two')

getWorker('app-one').listenToWorker(el=>console.log("[MAIN]: ", el))
getWorker('app-two').listenToWorker(el=>console.log("[MAIN]: ", el))

setInterval(_=>{
    getWorker('app-one').callWorker(`[${ new Date().getTime() }] Hello to workers`)
}, 1000)

setInterval(_=>{
    getWorker('app-two').callWorker(`[${ new Date().getTime() }] Hello to workers`)
}, 900)
