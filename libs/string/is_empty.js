module.exports.isEmpty = function(value) {
    let stat = false
    switch (value) {
        case "":
            stat = true
            break;
        case undefined:
            stat = true
            break;
    }
    return stat
}