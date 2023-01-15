let { fileWorkerFactory, getChannel, simpleWorkerFactory } = require('./worker.controller')

fileWorkerFactory('./app-one.js', 'app-one')
fileWorkerFactory('./app-two.js', 'app-two')

const app = () => {
    let i = 1
    setInterval(_=>{
        console.log("hello man", i++)
    }, 500)
}
simpleWorkerFactory(app())

getChannel('app-one').listenToWorker(el=>console.log("[MAIN]: ", el))
getChannel('app-two').listenToWorker(el=>console.log("[MAIN]: ", el))


setInterval(_=>{
    getChannel('app-one').callWorker(`[${ new Date().getTime() }] Hello to workers`)
}, 1000)

setInterval(_=>{
    getChannel('app-two').callWorker(`[${ new Date().getTime() }] Hello to workers`)
}, 900)