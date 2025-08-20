// console.log("Bot WhatsApp iniciado!");

// // Função para esperar um elemento estar disponível
// function waitForElement(selector, callback, interval = 1000, maxAttempts = 10) {
//     let attempts = 0;
//     const checkExist = setInterval(() => {
//         let element = document.querySelector(selector);
//         if (element) {
//             clearInterval(checkExist);
//             callback(element);
//         } else if (attempts >= maxAttempts) {
//             clearInterval(checkExist);
//             console.error(`Elemento ${selector} não encontrado após várias tentativas.`);
//         }
//         attempts++;
//     }, interval);
// }

// // Função para buscar mensagem da planilha com duas condições
// async function getMessageFromSheet(condicao1, condicao2) {
//     const sheetUrl = `https://script.google.com/macros/s/AKfycbz5HpGBDN19RnQWbxUpLca3YW8TOC8BgbBYfa3MwS3DD608ZE1haAki4hSaLn806Cp4yA/exec?condicao1=${encodeURIComponent(condicao1)}&condicao2=${encodeURIComponent(condicao2)}`;
    
//     try {
//         let response = await fetch(sheetUrl);
//         let data = await response.json();
//         return data.mensagem || "Mensagem padrão não encontrada";
//     } catch (error) {
//         console.error("Erro ao buscar mensagem da planilha:", error);
//         return "Erro ao obter mensagem";
//     }
// }

// // Função para registrar mensagem enviada na planilha
// async function logMessageToSheet(usuario, mensagem) {
//     const sheetUrl = "https://script.google.com/macros/s/AKfycbz5HpGBDN19RnQWbxUpLca3YW8TOC8BgbBYfa3MwS3DD608ZE1haAki4hSaLn806Cp4yA/exec";
//     try {
//         await fetch(sheetUrl, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ usuario, mensagem })
//         });
//         console.log("📜 Mensagem registrada no histórico.");
//     } catch (error) {
//         console.error("❌ Erro ao registrar mensagem na planilha:", error);
//     }
// }

// // Delay inicial de 10 segundos antes de ativar o bot
// setTimeout(() => {
//     console.log("Iniciando o observador após 10 segundos...");

//     waitForElement("div.app-wrapper-web", () => {
//         console.log("Observador ativado!");

//         // Inicia a busca por notificações de novos chats
//         setInterval(() => {
//             if (!botPaused) openUnreadChat();
//         }, 3000);
//     });
// }, 5000);

// // Função para abrir o chat com notificação
// function openUnreadChat() {
    
//     let attempts = 0;
//     if (botPaused||botPaused2) {
//         console.log("🚫 Bot pausado! Não abrindo chat.");
//         return;
//     }
//     function tryFindUnreadChat() {
//         if (botPaused||botPaused2) {
//             console.log("🚫 Bot pausado! Ignorando tentativa de abrir chat.");
//             return;
//         }
//         let unreadChats = [...document.querySelectorAll("div._ak8i span[aria-label]")];

//         if (unreadChats.length > 0) {
//             console.log("🔔 Chat com notificação encontrado!");

//             let chatElement = unreadChats[0].closest("div._ak72");

//             if (chatElement) {
//                 console.log("🖱 Tentando clicar no chat...");
//                 let mouseDownEvent = new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window });
//                 let mouseUpEvent = new MouseEvent("mouseup", { bubbles: true, cancelable: true, view: window });
//                 chatElement.dispatchEvent(mouseDownEvent);
//                 setTimeout(() => {
//                     chatElement.dispatchEvent(mouseUpEvent);
//                     console.log("✅ Clique enviado, aguardando abertura do chat...");
//                 }, 100);

//                 setTimeout(() => {
//                     let chatOpenCheck = document.querySelector("div[data-testid='conversation-header']");
//                     let messageBoxCheck = document.querySelector("footer div[contenteditable='true']");

//                     if (chatOpenCheck || messageBoxCheck) {
//                         console.log("✅ Chat aberto com sucesso!");
//                         handleMessage();
//                     } else {
//                         console.error("⚠️ O clique foi feito, mas o chat não abriu. Tentando novamente...");
//                         setTimeout(tryFindUnreadChat, 2000);
//                     }
//                 }, 2000);
//             } else {
//                 console.error("❌ Não foi possível encontrar o elemento do chat!");
//             }
//         } else if (attempts < 10) {
//             console.log("🔄 Nenhuma notificação encontrada, tentando novamente...");
//             document.querySelector("div[role='grid']")?.scrollBy(0, 100);
//             attempts++;
//             setTimeout(tryFindUnreadChat, 500);
//         } else {
//             console.error("❌ Nenhuma notificação encontrada na lista!");
//         }
//     }
    
//     tryFindUnreadChat();
// }

// async function ensureMessageIsRead() {
//     if (botPaused||botPaused2) {
//         console.log("📴 Bot pausado! Ignorando leitura.");
//         return;
//     }
//     let attempts = 0;
//     let maxAttempts = 5; // Número máximo de tentativas de remover a notificação

//     while (attempts < maxAttempts) {
//         let unreadChats = [...document.querySelectorAll("div._ak8i span[aria-label]")];

//         if (unreadChats.length > 0) {
//             console.log("🔔 Notificação ainda presente. Tentando marcar como lida...");

//             let chatElement = unreadChats[0].closest("div._ak72");

//             if (chatElement) {
//                 console.log("🖱 Clicando no chat para marcar como lido...");
                
//                 // Simula um clique no chat para abrir
//                 chatElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
//                 setTimeout(() => {
//                     chatElement.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
//                 }, 100);

//                 // Espera um pouco para garantir que o WhatsApp registre a leitura
//                 await new Promise(resolve => setTimeout(resolve, 2000));

//                 // Tenta pressionar Shift + Esc para fechar a notificação
//                 document.dispatchEvent(new KeyboardEvent("keydown", { key: "Shift", bubbles: true }));
//                 document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
//                 document.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape", bubbles: true }));
//                 document.dispatchEvent(new KeyboardEvent("keyup", { key: "Shift", bubbles: true }));

//                 console.log("✅ Tentativa de marcar mensagem como lida feita!");
//             }
//         } else {
//             console.log("📭 Nenhuma notificação encontrada, pronto para responder.");
//             break;
//         }

//         attempts++;
//         await new Promise(resolve => setTimeout(resolve, 2000)); // Aguarda antes da próxima tentativa
//     }
// }

// let botPaused = false;
// let botPaused2 = false;

// // 🔹 Detecta quando a aba perde o foco e pausa o bot
// document.addEventListener("visibilitychange", () => {

//         if (document.hidden) {
//         botPaused2 = true;
//         console.log("⏸️ Bot pausado (aba em segundo plano)");
//         } else {
//         botPaused2 = false;
//         console.log("▶️ Bot retomado (aba em primeiro plano)");


//     }
    
// });

// // 🔥 Modifique a função `handleMessage` para respeitar essa pausa
// async function handleMessage() {
//     if (botPaused||botPaused2) {
//         console.log("🤐 Bot pausado! Não respondendo mensagens.");
//         return;
//     }

//     let userMessages = document.querySelectorAll("div.message-in span.selectable-text");
//     let botMessages = document.querySelectorAll("div.message-out span.selectable-text");
    
//     if (userMessages.length > 0) {
//         // Pega a última mensagem do usuário (condição 1)
//         let lastUserMessage = userMessages[userMessages.length - 1].innerText.trim();

//         // Pega a última mensagem enviada pelo bot (condição 2), ou "Padrão" caso não tenha
//         let lastBotMessage = botMessages.length > 0 ? botMessages[botMessages.length - 1].innerText.trim() : "Padrão";

//         console.log(`📩 Usuário: "${lastUserMessage}", Bot: "${lastBotMessage}"`);

//         // Busca a resposta baseada nas duas condições
//         let responseMessage = await getMessageFromSheet(lastUserMessage, lastBotMessage);
//         sendMessage(responseMessage);
//     }
// }

// function getChatName() {
//     let chatTitle = document.querySelector("header div[role='button'] span");
//     return chatTitle ? chatTitle.innerText : "Desconhecido";
// }


// function registrarMensagem(usuario, mensagem) {
//     fetch("https://script.google.com/macros/s/AKfycbz5HpGBDN19RnQWbxUpLca3YW8TOC8BgbBYfa3MwS3DD608ZE1haAki4hSaLn806Cp4yA/exec", {
//         method: "POST",
//         mode: "no-cors",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ usuario: usuario, mensagem: mensagem })
//     }).then(() => {
//         console.log(`✅ Mensagem registrada na planilha: ${mensagem} | Cliente: ${usuario}`);
//     }).catch(err => console.error("❌ Erro ao registrar mensagem:", err));
// }

// // // Função para enviar a mensagem automática com delay
// function sendMessage(message) {
//     if (botPaused||botPaused2) {
//         console.log("📴 Bot pausado! Mensagem não será enviada.");
//         return;
//     }
//     setTimeout(() => {
//         let messageBox = document.querySelector("footer div[contenteditable='true']");
//         let userMessages = document.querySelectorAll("div.message-in span.selectable-text");

//         // Simula um clique na última mensagem do cliente
//         if (userMessages.length > 0) {
//             let lastUserMessage = userMessages[userMessages.length - 1];
//             lastUserMessage.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
//             console.log("🖱 Clique simulado na última mensagem do cliente!");
//         } else {
//             console.warn("⚠️ Nenhuma mensagem do cliente encontrada para clicar.");
//         }

//         if (messageBox) {
//             messageBox.focus();

//             setTimeout(() => {
//                 // 🗑 Simula Ctrl + A (Selecionar tudo) e Backspace (Apagar)
//                 let event = new KeyboardEvent("keydown", {
//                     key: "a",
//                     code: "KeyA",
//                     ctrlKey: true,
//                     bubbles: true
//                 });
//                 messageBox.dispatchEvent(event);

//                 let backspaceEvent = new KeyboardEvent("keydown", {
//                     key: "Backspace",
//                     code: "Backspace",
//                     bubbles: true
//                 });
//                 messageBox.dispatchEvent(backspaceEvent);

//                 // Garante que o campo foi alterado enviando um evento 'input'
//                 messageBox.dispatchEvent(new InputEvent("input", { bubbles: true }));

//                 setTimeout(() => {
//                     // Escreve a nova mensagem
//                     messageBox.focus();
//                     document.execCommand("insertText", false, message);
//                     messageBox.dispatchEvent(new InputEvent("input", { bubbles: true }));

//                     setTimeout(() => {
//                         let sendButton = document.querySelector("footer button[aria-label='Enviar'], footer button[data-testid='compose-btn-send']");
//                         if (sendButton) {
//                             sendButton.click();
//                             let clientName = getChatName();
//                             console.log(`📨 Mensagem enviada para ${clientName}: ${message}`);

//                             // 📌 Registra a mensagem no Google Sheets com o nome do usuário correto
//                             registrarMensagem(clientName, message);
                            
//                             // Pressiona "Esc" para fechar o chat
//                             setTimeout(() => {
//                                 document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
//                                 document.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape", bubbles: true }));
//                                 console.log("🔙 Tecla 'Esc' pressionada para fechar o chat.");
//                             }, 500);
//                         } else {
//                             console.error("❌ Botão de enviar não encontrado!");
//                         }
//                     }, 200);
//                 }, 200);
//             }, 200);
//         } else {
//             console.error("❌ Caixa de mensagem não encontrada!");
//         }
//     }, 1000);
// }

// // Verifica se o bot está pausado ao iniciar
// chrome.storage.local.get("botPaused", data => {
//     botPaused = data.botPaused || false;
//     console.log(`🔄 Estado inicial do bot: ${botPaused ? "PAUSADO" : "ATIVADO"}`);
// });

// // Listener para mudanças no estado do bot (quando o botão de pausa for clicado)
// // Escuta mensagens do popup.js (como clique no botão)
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "toggleBot") {
//         botPaused = request.state;
//         console.log(`🔁 Estado do bot atualizado: ${botPaused ? "PAUSADO" : "ATIVADO"}`);
//     }
// });


// document.addEventListener("DOMContentLoaded", () => {
//     const toggleBotButton = document.getElementById("toggleBot");

//     // Carrega o estado salvo
//     chrome.storage.local.get("botPaused", data => {
//         const isPaused = data.botPaused || false;
//         updateButtonState(isPaused);
//     });

//     toggleBotButton.addEventListener("click", () => {
//         chrome.storage.local.get("botPaused", data => {
//             const currentState = data.botPaused || false;
//             const newState = !currentState;

//             // Atualiza o estado no armazenamento
//             chrome.storage.local.set({ botPaused: newState }, () => {
//                 updateButtonState(newState);

//                 // Envia a mensagem para o content script
//                 chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//                     chrome.tabs.sendMessage(tabs[0].id, {
//                         action: "toggleBot",
//                         state: newState
//                     });
//                 });
//             });
//         });
//     });

//     function updateButtonState(isPaused) {
//         if (isPaused) {
//             toggleBotButton.textContent = "Ativar Bot";
//             toggleBotButton.style.backgroundColor = "#4CAF50";
//         } else {
//             toggleBotButton.textContent = "Pausar Bot";
//             toggleBotButton.style.backgroundColor = "#f44336";
//         }
//     }
// });



console.log("Bot WhatsApp iniciado!");

/**
 * Espera um elemento estar disponível no DOM antes de executar o callback.
 * @param {string} selector - Seletor CSS do elemento.
 * @param {Function} callback - Função a ser executada quando o elemento existir.
 * @param {number} [interval=1000] - Intervalo entre tentativas em ms.
 * @param {number} [maxAttempts=10] - Número máximo de tentativas.
 */
function waitForElement(selector, callback, interval = 1000, maxAttempts = 10) {
    let attempts = 0;
    const checkExist = setInterval(() => {
        let element = document.querySelector(selector);
        if (element) {
            clearInterval(checkExist);
            callback(element);
        } else if (attempts >= maxAttempts) {
            clearInterval(checkExist);
            console.error(`Elemento ${selector} não encontrado após várias tentativas.`);
        }
        attempts++;
    }, interval);
}

/**
 * Busca mensagem na planilha com base em duas condições.
 * @param {string} condicao1 - Primeira condição para buscar a mensagem.
 * @param {string} condicao2 - Segunda condição para buscar a mensagem.
 * @returns {Promise<string>} Mensagem encontrada ou padrão.
 */
async function getMessageFromSheet(condicao1, condicao2) {
    const sheetUrl = `https://script.google.com/macros/s/AKfycbz5HpGBDN19RnQWbxUpLca3YW8TOC8BgbBYfa3MwS3DD608ZE1haAki4hSaLn806Cp4yA/exec?condicao1=${encodeURIComponent(condicao1)}&condicao2=${encodeURIComponent(condicao2)}`;
    
    try {
        let response = await fetch(sheetUrl);
        let data = await response.json();
        return data.mensagem || "Mensagem padrão não encontrada";
    } catch (error) {
        console.error("Erro ao buscar mensagem da planilha:", error);
        return "Erro ao obter mensagem";
    }
}

/**
 * Registra mensagem enviada na planilha.
 * @param {string} usuario - Nome do usuário que recebeu a mensagem.
 * @param {string} mensagem - Conteúdo da mensagem enviada.
 */
async function logMessageToSheet(usuario, mensagem) {
    const sheetUrl = "https://script.google.com/macros/s/AKfycbz5HpGBDN19RnQWbxUpLca3YW8TOC8BgbBYfa3MwS3DD608ZE1haAki4hSaLn806Cp4yA/exec";
    try {
        await fetch(sheetUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, mensagem })
        });
        console.log("📜 Mensagem registrada no histórico.");
    } catch (error) {
        console.error("❌ Erro ao registrar mensagem na planilha:", error);
    }
}

// Delay inicial de 10 segundos antes de ativar o bot
setTimeout(() => {
    console.log("Iniciando o observador após 10 segundos...");

    waitForElement("div.app-wrapper-web", () => {
        console.log("Observador ativado!");

        // Inicia a busca por notificações de novos chats
        setInterval(() => {
            if (!botPaused) openUnreadChat();
        }, 3000);
    });
}, 5000);

/**
 * Abre o chat com notificação não lida.
 */
function openUnreadChat() {
    let attempts = 0;
    if (botPaused||botPaused2) {
        console.log("🚫 Bot pausado! Não abrindo chat.");
        return;
    }

    function tryFindUnreadChat() {
        if (botPaused||botPaused2) {
            console.log("🚫 Bot pausado! Ignorando tentativa de abrir chat.");
            return;
        }

        let unreadChats = [...document.querySelectorAll("div._ak8i span[aria-label]")];

        if (unreadChats.length > 0) {
            console.log("🔔 Chat com notificação encontrado!");

            let chatElement = unreadChats[0].closest("div._ak72");

            if (chatElement) {
                console.log("🖱 Tentando clicar no chat...");
                let mouseDownEvent = new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window });
                let mouseUpEvent = new MouseEvent("mouseup", { bubbles: true, cancelable: true, view: window });
                chatElement.dispatchEvent(mouseDownEvent);
                setTimeout(() => {
                    chatElement.dispatchEvent(mouseUpEvent);
                    console.log("✅ Clique enviado, aguardando abertura do chat...");
                }, 100);

                setTimeout(() => {
                    let chatOpenCheck = document.querySelector("div[data-testid='conversation-header']");
                    let messageBoxCheck = document.querySelector("footer div[contenteditable='true']");

                    if (chatOpenCheck || messageBoxCheck) {
                        console.log("✅ Chat aberto com sucesso!");
                        handleMessage();
                    } else {
                        console.error("⚠️ O clique foi feito, mas o chat não abriu. Tentando novamente...");
                        setTimeout(tryFindUnreadChat, 2000);
                    }
                }, 2000);
            } else {
                console.error("❌ Não foi possível encontrar o elemento do chat!");
            }
        } else if (attempts < 10) {
            console.log("🔄 Nenhuma notificação encontrada, tentando novamente...");
            document.querySelector("div[role='grid']")?.scrollBy(0, 100);
            attempts++;
            setTimeout(tryFindUnreadChat, 500);
        } else {
            console.error("❌ Nenhuma notificação encontrada na lista!");
        }
    }
    
    tryFindUnreadChat();
}

/**
 * Garante que a mensagem foi lida marcando notificações como lidas.
 */
async function ensureMessageIsRead() {
    if (botPaused||botPaused2) {
        console.log("📴 Bot pausado! Ignorando leitura.");
        return;
    }

    let attempts = 0;
    let maxAttempts = 5;

    while (attempts < maxAttempts) {
        let unreadChats = [...document.querySelectorAll("div._ak8i span[aria-label]")];

        if (unreadChats.length > 0) {
            console.log("🔔 Notificação ainda presente. Tentando marcar como lida...");

            let chatElement = unreadChats[0].closest("div._ak72");

            if (chatElement) {
                console.log("🖱 Clicando no chat para marcar como lido...");
                chatElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
                setTimeout(() => {
                    chatElement.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
                }, 100);
                await new Promise(resolve => setTimeout(resolve, 2000));
                document.dispatchEvent(new KeyboardEvent("keydown", { key: "Shift", bubbles: true }));
                document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
                document.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape", bubbles: true }));
                document.dispatchEvent(new KeyboardEvent("keyup", { key: "Shift", bubbles: true }));

                console.log("✅ Tentativa de marcar mensagem como lida feita!");
            }
        } else {
            console.log("📭 Nenhuma notificação encontrada, pronto para responder.");
            break;
        }

        attempts++;
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

// Estado do bot
let botPaused = false;
let botPaused2 = false;

// 🔹 Pausa o bot quando a aba perde foco
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        botPaused2 = true;
        console.log("⏸️ Bot pausado (aba em segundo plano)");
    } else {
        botPaused2 = false;
        console.log("▶️ Bot retomado (aba em primeiro plano)");
    }
});

/**
 * Lida com mensagens recebidas no chat.
 */
async function handleMessage() {
    if (botPaused||botPaused2) {
        console.log("🤐 Bot pausado! Não respondendo mensagens.");
        return;
    }

    let userMessages = document.querySelectorAll("div.message-in span.selectable-text");
    let botMessages = document.querySelectorAll("div.message-out span.selectable-text");

    if (userMessages.length > 0) {
        let lastUserMessage = userMessages[userMessages.length - 1].innerText.trim();
        let lastBotMessage = botMessages.length > 0 ? botMessages[botMessages.length - 1].innerText.trim() : "Padrão";

        console.log(`📩 Usuário: "${lastUserMessage}", Bot: "${lastBotMessage}"`);

        let responseMessage = await getMessageFromSheet(lastUserMessage, lastBotMessage);
        sendMessage(responseMessage);
    }
}

/**
 * Obtém o nome do chat atual.
 * @returns {string} Nome do chat ou "Desconhecido".
 */
function getChatName() {
    let chatTitle = document.querySelector("header div[role='button'] span");
    return chatTitle ? chatTitle.innerText : "Desconhecido";
}

/**
 * Registra mensagem no Google Sheets.
 * @param {string} usuario - Nome do usuário.
 * @param {string} mensagem - Conteúdo da mensagem.
 */
function registrarMensagem(usuario, mensagem) {
    fetch("https://script.google.com/macros/s/AKfycbz5HpGBDN19RnQWbxUpLca3YW8TOC8BgbBYfa3MwS3DD608ZE1haAki4hSaLn806Cp4yA/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: usuario, mensagem: mensagem })
    }).then(() => {
        console.log(`✅ Mensagem registrada na planilha: ${mensagem} | Cliente: ${usuario}`);
    }).catch(err => console.error("❌ Erro ao registrar mensagem:", err));
}

/**
 * Envia mensagem automática no chat.
 * @param {string} message - Mensagem a ser enviada.
 */
function sendMessage(message) {
    if (botPaused||botPaused2) {
        console.log("📴 Bot pausado! Mensagem não será enviada.");
        return;
    }

    setTimeout(() => {
        let messageBox = document.querySelector("footer div[contenteditable='true']");
        let userMessages = document.querySelectorAll("div.message-in span.selectable-text");

        if (userMessages.length > 0) {
            let lastUserMessage = userMessages[userMessages.length - 1];
            lastUserMessage.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
            console.log("🖱 Clique simulado na última mensagem do cliente!");
        } else {
            console.warn("⚠️ Nenhuma mensagem do cliente encontrada para clicar.");
        }

        if (messageBox) {
            messageBox.focus();

            setTimeout(() => {
                let event = new KeyboardEvent("keydown", { key: "a", code: "KeyA", ctrlKey: true, bubbles: true });
                messageBox.dispatchEvent(event);

                let backspaceEvent = new KeyboardEvent("keydown", { key: "Backspace", code: "Backspace", bubbles: true });
                messageBox.dispatchEvent(backspaceEvent);

                messageBox.dispatchEvent(new InputEvent("input", { bubbles: true }));

                setTimeout(() => {
                    messageBox.focus();
                    document.execCommand("insertText", false, message);
                    messageBox.dispatchEvent(new InputEvent("input", { bubbles: true }));

                    setTimeout(() => {
                        let sendButton = document.querySelector("footer button[aria-label='Enviar'], footer button[data-testid='compose-btn-send']");
                        if (sendButton) {
                            sendButton.click();
                            let clientName = getChatName();
                            console.log(`📨 Mensagem enviada para ${clientName}: ${message}`);

                            registrarMensagem(clientName, message);

                            setTimeout(() => {
                                document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
                                document.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape", bubbles: true }));
                                console.log("🔙 Tecla 'Esc' pressionada para fechar o chat.");
                            }, 500);
                        } else {
                            console.error("❌ Botão de enviar não encontrado!");
                        }
                    }, 200);
                }, 200);
            }, 200);
        } else {
            console.error("❌ Caixa de mensagem não encontrada!");
        }
    }, 1000);
}

// Inicializa estado do bot
chrome.storage.local.get("botPaused", data => {
    botPaused = data.botPaused || false;
    console.log(`🔄 Estado inicial do bot: ${botPaused ? "PAUSADO" : "ATIVADO"}`);
});

// Listener para mudanças no estado do bot
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleBot") {
        botPaused = request.state;
        console.log(`🔁 Estado do bot atualizado: ${botPaused ? "PAUSADO" : "ATIVADO"}`);
    }
});

// Configuração do botão de toggle no DOM
document.addEventListener("DOMContentLoaded", () => {
    const toggleBotButton = document.getElementById("toggleBot");

    chrome.storage.local.get("botPaused", data => {
        const isPaused = data.botPaused || false;
        updateButtonState(isPaused);
    });

    toggleBotButton.addEventListener("click", () => {
        chrome.storage.local.get("botPaused", data => {
            const currentState = data.botPaused || false;
            const newState = !currentState;

            chrome.storage.local.set({ botPaused: newState }, () => {
                updateButtonState(newState);

                chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: "toggleBot",
                        state: newState
                    });
                });
            });
        });
    });

    /**
     * Atualiza estado visual do botão de toggle.
     * @param {boolean} isPaused - Se o bot está pausado ou não.
     */
    function updateButtonState(isPaused) {
        if (isPaused) {
            toggleBotButton.textContent = "Ativar Bot";
            toggleBotButton.style.backgroundColor = "#4CAF50";
        } else {
            toggleBotButton.textContent = "Pausar Bot";
            toggleBotButton.style.backgroundColor = "#f44336";
        }
    }
});


