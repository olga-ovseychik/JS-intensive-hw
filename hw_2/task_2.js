const builtInConfirm = window.confirm;
const builtInAlert = window.alert;
const builtInPrompt = window.prompt;

window.alert = function(message) {
    builtInConfirm(message);
}

window.prompt = function(message) {
    builtInAlert(message);
}

window.confirm = function(message, defaultValue) {
    builtInPrompt(message, defaultValue);
}