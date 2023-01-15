let { codeWorkerFactory, getWorker } = require('./libs/worker')

const WORKER_NAME = "/app/package/log"

// Dependencies including is crucial for launching properly
const handler = () => {
    let { callParent } = require('./libs/worker')
    const msg = "Hello world"
    callParent(msg)
}

codeWorkerFactory(handler, WORKER_NAME)

getWorker(WORKER_NAME).listenToWorker(el=>console.log("[MAIN]: ", el))