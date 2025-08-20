// // background.js - Conecta com o Google Sheets e repassa comandos ao content.js

// console.log("Background script rodando...");

// // URL da API do Google Sheets
// const SHEETS_API_URL = "https://script.google.com/macros/s/AKfycbzCW7v44VJycLOR2JDf7dytq4IkIr4Xun4icTSx3suDHUkj96fWN2L72INoW1mWIifTjA/exec";

// // Escutando mensagens do popup.js
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "getStockData") {
//         fetchStockData(sendResponse);
//         return true;
//     }

//     if (request.action === "toggleBot") {
//         // Salva o estado do bot e repassa para o content.js
//         chrome.storage.local.set({ botPaused: request.state }, () => {
//             chrome.tabs.query({ url: "https://web.whatsapp.com/*" }, tabs => {
//                 tabs.forEach(tab => {
//                     chrome.tabs.sendMessage(tab.id, { action: "toggleBot", state: request.state });
//                 });
//             });
//         });
//     }
// });

// // Função para buscar dados do estoque no Google Sheets
// function fetchStockData(sendResponse) {
//     fetch(SHEETS_API_URL + "?action=getStock")
//         .then(response => response.json())
//         .then(data => {
//             sendResponse({ stock: data.stock });
//         })
//         .catch(error => {
//             console.error("Erro ao buscar estoque:", error);
//             sendResponse({ stock: "Erro ao acessar o estoque." });
//         });
// }

// background.js - Conecta com o Google Sheets e repassa comandos ao content.js

/**
 * Mensagem de log indicando que o background script está rodando.
 * @type {void}
 */
console.log("Background script rodando...");

/**
 * URL da API do Google Sheets.
 * @constant {string}
 */
const SHEETS_API_URL = "https://script.google.com/macros/s/AKfycbzCW7v44VJycLOR2JDf7dytq4IkIr4Xun4icTSx3suDHUkj96fWN2L72INoW1mWIifTjA/exec";

/**
 * Listener de mensagens vindas do popup.js.
 * Executa ações dependendo do valor de `request.action`.
 * 
 * @param {Object} request - Objeto com os dados da mensagem.
 * @param {Object} sender - Informações do remetente da mensagem.
 * @param {Function} sendResponse - Função para enviar resposta de volta.
 * @returns {boolean|undefined} Retorna true se for async (fetchStockData).
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getStockData") {
        fetchStockData(sendResponse);
        return true;
    }

    if (request.action === "toggleBot") {
        /**
         * Salva o estado do bot e repassa para o content.js.
         /** @type {boolean} Bot está pausado */
         
        chrome.storage.local.set({ botPaused: request.state }, () => {
            chrome.tabs.query({ url: "https://web.whatsapp.com/*" }, tabs => {
                tabs.forEach(tab => {
                    chrome.tabs.sendMessage(tab.id, { action: "toggleBot", state: request.state });
                });
            });
        });
    }
});

/**
 * Função para buscar dados do estoque no Google Sheets.
 * Retorna o resultado para a função `sendResponse` do listener.
 * 
 * @param {Function} sendResponse - Função usada para enviar a resposta assíncrona.
 * @returns {void}
 */
function fetchStockData(sendResponse) {
    fetch(SHEETS_API_URL + "?action=getStock")
        .then(response => response.json())
        .then(data => {
            sendResponse({ stock: data.stock });
        })
        .catch(error => {
            console.error("Erro ao buscar estoque:", error);
            sendResponse({ stock: "Erro ao acessar o estoque." });
        });
}
