let { sendFunctionToWorker, listenToParent, callParent } = require("./libs/worker")

function App() {
    let action = (message) => {
        let response = {
            response: "Hello from app-one",
            request: message
        }
        callParent(response)
    }
    listenToParent(action)
}

sendFunctionToWorker(App)
