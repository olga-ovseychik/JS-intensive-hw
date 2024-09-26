let result = null;
const host = window.location.host; 
const styles = 
`<style>
    dialog {
        background-color: #525658;
        border-radius: 5px;
        border: none;
        width: 400px;
        color: #F1F0F1;
        font-family: sans-serif;
    }
    div {
        margin: 15px 0;
        max-height: 300px;
        overflow: auto;
    }
    form {
    width: 100%;
        display: flex;
        flex-direction: column;
    }
    button {
        background-color: #A8D6F9;
        border: none;
        border-radius: 50px;
        padding: 10px 20px;
        color: #272C2F;
        cursor: pointer;
        margin-right: 5px;
    }
    input {
        width: 97%;
        height: 30px;
        border: none;
        border-radius: 5px;
        padding-left: 10px;
    }
    .btns {
        align-self: end;
    }
</style>`;

function createModal(methodName, cb) {
    return function (message, defaultValue) {
        const dialog = document.createElement('dialog');
        document.head.innerHTML = styles;

        dialog.innerHTML = 
        `<p>${host} says</p>
        <div>${message}</div>
        <form method="dialog">
            ${methodName === 'prompt' ? `<input value=${defaultValue || ''}></input>` : ''}
            <div class='btns'>
                <button id='submitBtn'>OK</button>
                ${methodName === 'confirm' ||  methodName === 'prompt'? `<button id='cancelBtn'>Cancel</button>` : ''} 
            </div>
        </form>`;

        document.body.appendChild(dialog);
        dialog.showModal();

        const submitBtn = dialog.querySelector('#submitBtn');
        const cancelBtn = dialog.querySelector('#cancelBtn');

        cancelBtn?.addEventListener('click', (event) => {
            event.preventDefault();

            if (methodName === 'confirm') {
                cb(false);
            } else if (methodName === 'prompt') {
                cb(null);
            } 

            dialog.close();  
            dialog.remove();
        })

        submitBtn?.addEventListener('click', (event) => {
            event.preventDefault();

            if (methodName === 'prompt') {
                let promptValue = document.querySelector('input').value;

                cb(!promptValue || promptValue.replace(/\s/g, '').length === 0 ? null : promptValue.trim());
            } else if (methodName === 'confirm') {
                cb(true);
            }

            dialog.close();    
            dialog.remove();
        });   
    }
}

window.alert = createModal('confirm', (isConfirmed) => {
    result = isConfirmed;
});
window.confirm = createModal('prompt', (promptValue) => {
    result = promptValue;
});
window.prompt = createModal('alert');