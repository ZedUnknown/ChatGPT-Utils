/* ====[Ongoing Development]====
logging functions in a single module */

const DEBUG = false;
const PREFIX = "Loggers |";

window.logCaller = function (message = "") {
    if (message !== "") {
        message += " | ";
    }
    const error = new Error();
    const stackLines = error.stack?.split("\n");
    if (!stackLines) {
        if (DEBUG) console.log("Error: Could not retrieve stack trace.");
        return;
    }
    const callerPath = stackLines
        .slice(2)
        .map((path) => path.trim())
        .join(" -> ");
    if (DEBUG) console.log(`${PREFIX} ${message + callerPath}`);
};