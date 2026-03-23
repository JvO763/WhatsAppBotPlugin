```mermaid
flowchart TD
    %% Estilos dos nós
    classDef script fill:#d0ebff,stroke:#1c7ed6,stroke-width:3px,color:#1c1c1c,font-weight:bold
    classDef dados fill:#ffe066,stroke:#e67700,stroke-width:3px,color:#1c1c1c
    classDef externo fill:#ffd6d6,stroke:#c92a2a,stroke-width:3px,color:#1c1c1c

    %% Nós principais
    Popup["🖱️ popup.js<br>(Interface do popup)<br>Botões: atualizar estoque e ligar/desligar bot"]
    Background["🖥️ background.js<br>(Gerencia comandos do popup)<br>Conecta com Google Sheets"]
    Content["🤖 content.js<br>(Bot WhatsApp)<br>Lê mensagens, envia respostas, registra histórico"]
    GoogleSheets["📊 Google Sheets<br>(Estoque e mensagens)"]
    WhatsAppWeb["💬 WhatsApp Web<br>(Cliente envia/recebe mensagens)"]

    %% Funções internas detalhadas
    PopupUpdate["Atualiza estoque"]
    PopupToggle["Liga/Desliga bot"]
    BackgroundFetch["fetchStockData()"]
    BackgroundToggle["toggleBot()"]
    ContentRead["openUnreadChat()"]
    ContentSend["sendMessage()"]
    ContentLog["logMessageToSheet()"]

    %% Relações / Fluxos detalhados
    Popup -->|Solicita estoque| PopupUpdate
    PopupUpdate -->|Comando| Background
    Background -->|Busca/atualiza| BackgroundFetch
    BackgroundFetch -->|Atualiza| GoogleSheets

    Popup -->|Liga/desliga bot| PopupToggle
    PopupToggle -->|Comando| Background
    Background --> BackgroundToggle
    BackgroundToggle --> Content

    Content -->|Lê mensagens| ContentRead
    ContentRead -->|Mostra mensagens| WhatsAppWeb
    Content -->|Envia respostas| ContentSend
    ContentSend --> WhatsAppWeb
    Content -->|Registra histórico| ContentLog
    ContentLog --> GoogleSheets

    WhatsAppWeb -->|Novas mensagens| ContentRead
    WhatsAppWeb -->|Recebe mensagens| ContentSend

    %% Classes
    class Popup,Background,Content script
    class GoogleSheets,ContentLog dados
    class WhatsAppWeb externo
