<<<<<<< HEAD
// // popup.js - Conecta os botões ao background.js

// document.getElementById("updateStock").addEventListener("click", () => {
//     chrome.runtime.sendMessage({ action: "getStockData" }, response => {
//         if (response && response.stock) {
//             alert("Estoque atualizado:\n" + response.stock);
//         } else {
//             alert("Erro ao acessar o estoque.");
//         }
//     });
// });

// // Chave de liga/desliga do bot
// const toggleBotCheckbox = document.getElementById("toggleBot");
// const botStatusText = document.getElementById("botStatusText"); // <- elemento de texto

// // Carregar estado salvo e atualizar o checkbox e o texto
// chrome.storage.local.get("botPaused", data => {
//     const isPaused = data.botPaused || false;
//     toggleBotCheckbox.checked = !isPaused; // Se pausado, checkbox desmarcado
//     botStatusText.textContent = isPaused ? "Bot desativado" : "Bot ativado";
// });

// // Ao mudar o estado da chave, atualizar o armazenamento, enviar mensagem e atualizar texto
// toggleBotCheckbox.addEventListener("change", () => {
//     const isChecked = toggleBotCheckbox.checked;
//     const newState = !isChecked; // Se marcado, bot está ativo → botPaused = false

//     chrome.storage.local.set({ botPaused: newState }, () => {
//         chrome.runtime.sendMessage({ action: "toggleBot", state: newState });
//     });

//     botStatusText.textContent = isChecked ? "Bot ativado" : "Bot desativado";
// });


// popup.js - Conecta os botões ao background.js

/**
 * Atualiza o estoque ao clicar no botão "updateStock".
 * Envia mensagem para o background.js e exibe alerta com o resultado.
 */
document.getElementById("updateStock").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "getStockData" }, response => {
        if (response && response.stock) {
            alert("Estoque atualizado:\n" + response.stock);
        } else {
            alert("Erro ao acessar o estoque.");
        }
    });
});

/**
 * Referência para o checkbox de liga/desliga do bot.
 * @type {HTMLInputElement}
 */
const toggleBotCheckbox = document.getElementById("toggleBot");

/**
 * Referência para o elemento de texto que indica o status do bot.
 * @type {HTMLElement}
 */
const botStatusText = document.getElementById("botStatusText");

/**
 * Carrega o estado salvo do bot no armazenamento local
 * e atualiza o checkbox e o texto de status.
 */
chrome.storage.local.get("botPaused", data => {
    const isPaused = data.botPaused || false;
    toggleBotCheckbox.checked = !isPaused; // Se pausado, checkbox desmarcado
    botStatusText.textContent = isPaused ? "Bot desativado" : "Bot ativado";
});

/**
 * Atualiza o estado do bot ao mudar o checkbox.
 * Salva no armazenamento local, envia mensagem para o background.js
 * e atualiza o texto de status.
 */
toggleBotCheckbox.addEventListener("change", () => {
    const isChecked = toggleBotCheckbox.checked;
    const newState = !isChecked; // Se marcado, bot está ativo → botPaused = false

    chrome.storage.local.set({ botPaused: newState }, () => {
        chrome.runtime.sendMessage({ action: "toggleBot", state: newState });
    });

    botStatusText.textContent = isChecked ? "Bot ativado" : "Bot desativado";
});
=======
// // popup.js - Conecta os botões ao background.js

// document.getElementById("updateStock").addEventListener("click", () => {
//     chrome.runtime.sendMessage({ action: "getStockData" }, response => {
//         if (response && response.stock) {
//             alert("Estoque atualizado:\n" + response.stock);
//         } else {
//             alert("Erro ao acessar o estoque.");
//         }
//     });
// });

// // Chave de liga/desliga do bot
// const toggleBotCheckbox = document.getElementById("toggleBot");
// const botStatusText = document.getElementById("botStatusText"); // <- elemento de texto

// // Carregar estado salvo e atualizar o checkbox e o texto
// chrome.storage.local.get("botPaused", data => {
//     const isPaused = data.botPaused || false;
//     toggleBotCheckbox.checked = !isPaused; // Se pausado, checkbox desmarcado
//     botStatusText.textContent = isPaused ? "Bot desativado" : "Bot ativado";
// });

// // Ao mudar o estado da chave, atualizar o armazenamento, enviar mensagem e atualizar texto
// toggleBotCheckbox.addEventListener("change", () => {
//     const isChecked = toggleBotCheckbox.checked;
//     const newState = !isChecked; // Se marcado, bot está ativo → botPaused = false

//     chrome.storage.local.set({ botPaused: newState }, () => {
//         chrome.runtime.sendMessage({ action: "toggleBot", state: newState });
//     });

//     botStatusText.textContent = isChecked ? "Bot ativado" : "Bot desativado";
// });


// popup.js - Conecta os botões ao background.js

/**
 * Atualiza o estoque ao clicar no botão "updateStock".
 * Envia mensagem para o background.js e exibe alerta com o resultado.
 */
document.getElementById("updateStock").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "getStockData" }, response => {
        if (response && response.stock) {
            alert("Estoque atualizado:\n" + response.stock);
        } else {
            alert("Erro ao acessar o estoque.");
        }
    });
});

/**
 * Referência para o checkbox de liga/desliga do bot.
 * @type {HTMLInputElement}
 */
const toggleBotCheckbox = document.getElementById("toggleBot");

/**
 * Referência para o elemento de texto que indica o status do bot.
 * @type {HTMLElement}
 */
const botStatusText = document.getElementById("botStatusText");

/**
 * Carrega o estado salvo do bot no armazenamento local
 * e atualiza o checkbox e o texto de status.
 */
chrome.storage.local.get("botPaused", data => {
    const isPaused = data.botPaused || false;
    toggleBotCheckbox.checked = !isPaused; // Se pausado, checkbox desmarcado
    botStatusText.textContent = isPaused ? "Bot desativado" : "Bot ativado";
});

/**
 * Atualiza o estado do bot ao mudar o checkbox.
 * Salva no armazenamento local, envia mensagem para o background.js
 * e atualiza o texto de status.
 */
toggleBotCheckbox.addEventListener("change", () => {
    const isChecked = toggleBotCheckbox.checked;
    const newState = !isChecked; // Se marcado, bot está ativo → botPaused = false

    chrome.storage.local.set({ botPaused: newState }, () => {
        chrome.runtime.sendMessage({ action: "toggleBot", state: newState });
    });

    botStatusText.textContent = isChecked ? "Bot ativado" : "Bot desativado";
});
>>>>>>> a991acee244cc889e7eb9196c6efe49060106e7a
