// extensions/ai-chat/src/extension.ts
import * as vscode from 'vscode';
import { ChatProvider } from './chatProvider';
import { AIService } from './aiService';

export function activate(context: vscode.ExtensionContext) {
    // Tạo AI Chat Provider
    const chatProvider = new ChatProvider(context);
    
    // Đăng ký chat view
    const chatView = vscode.window.createWebviewPanel(
        'aiChat',
        'AI Chat',
        vscode.ViewColumn.Beside,
        {
            enableScripts: true,
            retainContextWhenHidden: true
        }
    );

    // Setup HTML content
    chatView.webview.html = getChatWebviewContent();

    // Handle messages từ webview
    chatView.webview.onDidReceiveMessage(
        async (message) => {
            switch (message.type) {
                case 'chat':
                    const response = await chatProvider.sendMessage(message.text);
                    chatView.webview.postMessage({
                        type: 'response',
                        text: response
                    });
                    break;
            }
        },
        undefined,
        context.subscriptions
    );

    // Commands
    context.subscriptions.push(
        vscode.commands.registerCommand('ai-chat.open', () => {
            chatView.reveal();
        })
    );
}

function getChatWebviewContent(): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Chat</title>
        <style>
            body {
                padding: 20px;
                font-family: var(--vscode-font-family);
                background-color: var(--vscode-editor-background);
                color: var(--vscode-editor-foreground);
            }
            .chat-container {
                display: flex;
                flex-direction: column;
                height: 100vh;
            }
            .messages {
                flex: 1;
                overflow-y: auto;
                padding: 10px;
                border: 1px solid var(--vscode-panel-border);
                margin-bottom: 10px;
            }
            .message {
                margin-bottom: 10px;
                padding: 8px;
                border-radius: 4px;
            }
            .user-message {
                background-color: var(--vscode-button-background);
                margin-left: 20%;
            }
            .ai-message {
                background-color: var(--vscode-textBlockQuote-background);
                margin-right: 20%;
            }
            .input-container {
                display: flex;
                gap: 10px;
            }
            input {
                flex: 1;
                padding: 8px;
                background-color: var(--vscode-input-background);
                color: var(--vscode-input-foreground);
                border: 1px solid var(--vscode-input-border);
            }
            button {
                padding: 8px 16px;
                background-color: var(--vscode-button-background);
                color: var(--vscode-button-foreground);
                border: none;
                cursor: pointer;
            }
        </style>
    </head>
    <body>
        <div class="chat-container">
            <div id="messages" class="messages"></div>
            <div class="input-container">
                <input type="text" id="messageInput" placeholder="Nhập tin nhắn...">
                <button onclick="sendMessage()">Gửi</button>
            </div>
        </div>
        
        <script>
            const vscode = acquireVsCodeApi();
            const messagesDiv = document.getElementById('messages');
            const messageInput = document.getElementById('messageInput');

            function sendMessage() {
                const message = messageInput.value.trim();
                if (message) {
                    addMessage(message, 'user');
                    vscode.postMessage({
                        type: 'chat',
                        text: message
                    });
                    messageInput.value = '';
                }
            }

            function addMessage(text, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${sender}-message`;
                messageDiv.textContent = text;
                messagesDiv.appendChild(messageDiv);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }

            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });

            // Listen for messages từ extension
            window.addEventListener('message', (event) => {
                const message = event.data;
                if (message.type === 'response') {
                    addMessage(message.text, 'ai');
                }
            });
        </script>
    </body>
    </html>`;
}

export function deactivate() {}
