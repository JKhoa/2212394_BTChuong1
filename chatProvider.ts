// extensions/ai-chat/src/chatProvider.ts
import * as vscode from 'vscode';
import { AIService } from './aiService';

export class ChatProvider {
    private aiService: AIService;
    private chatHistory: Array<{message: string, response: string, timestamp: Date}> = [];
    private context: string[] = [];

    constructor(private extensionContext: vscode.ExtensionContext) {
        this.aiService = new AIService();
        this.loadChatHistory();
    }

    async sendMessage(message: string): Promise<string> {
        try {
            // Thêm context từ editor hiện tại
            const activeEditor = vscode.window.activeTextEditor;
            let codeContext = '';
            
            if (activeEditor) {
                const selection = activeEditor.selection;
                if (!selection.isEmpty) {
                    codeContext = activeEditor.document.getText(selection);
                } else {
                    // Lấy một phần code xung quanh cursor
                    const line = selection.active.line;
                    const startLine = Math.max(0, line - 10);
                    const endLine = Math.min(activeEditor.document.lineCount - 1, line + 10);
                    const range = new vscode.Range(startLine, 0, endLine, 0);
                    codeContext = activeEditor.document.getText(range);
                }
            }

            // Tạo enhanced message với context
            let enhancedMessage = message;
            if (codeContext) {
                enhancedMessage = `Code context:\n\`\`\`\n${codeContext}\n\`\`\`\n\nQuestion: ${message}`;
            }

            // Gửi message với context history
            const response = await this.aiService.sendMessage(enhancedMessage, this.context);

            // Lưu vào history
            const chatEntry = {
                message,
                response,
                timestamp: new Date()
            };
            
            this.chatHistory.push(chatEntry);
            this.context.push(message);
            
            // Giữ context trong giới hạn (20 messages gần nhất)
            if (this.context.length > 20) {
                this.context = this.context.slice(-20);
            }

            // Lưu chat history
            this.saveChatHistory();

            return response;

        } catch (error) {
            vscode.window.showErrorMessage(`AI Chat Error: ${error.message}`);
            return 'Sorry, I encountered an error processing your request.';
        }
    }

    // Code analysis features
    async analyzeCode(): Promise<string> {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            return 'No active editor found.';
        }

        const code = activeEditor.document.getText();
        const language = activeEditor.document.languageId;

        const analysisPrompt = `Analyze this ${language} code and provide:
1. Code quality assessment
2. Potential bugs or issues
3. Suggestions for improvement
4. Security considerations

Code:
\`\`\`${language}
${code}
\`\`\``;

        return await this.aiService.sendMessage(analysisPrompt);
    }

    async explainCode(): Promise<string> {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            return 'No active editor found.';
        }

        const selection = activeEditor.selection;
        const text = selection.isEmpty ? 
            activeEditor.document.getText() : 
            activeEditor.document.getText(selection);

        const language = activeEditor.document.languageId;

        const explainPrompt = `Explain this ${language} code in detail:

\`\`\`${language}
${text}
\`\`\`

Please provide:
1. What the code does
2. How it works step by step
3. Key concepts used
4. Any patterns or best practices demonstrated`;

        return await this.aiService.sendMessage(explainPrompt);
    }

    async generateCode(requirements: string): Promise<string> {
        const activeEditor = vscode.window.activeTextEditor;
        const language = activeEditor ? activeEditor.document.languageId : 'javascript';

        const generatePrompt = `Generate ${language} code for the following requirements:

${requirements}

Please provide:
1. Clean, well-commented code
2. Error handling where appropriate
3. Best practices
4. Brief explanation of the solution`;

        return await this.aiService.sendMessage(generatePrompt);
    }

    async fixBugs(): Promise<string> {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            return 'No active editor found.';
        }

        // Get diagnostics (errors/warnings)
        const diagnostics = vscode.languages.getDiagnostics(activeEditor.document.uri);
        const code = activeEditor.document.getText();
        const language = activeEditor.document.languageId;

        let diagnosticsText = '';
        if (diagnostics.length > 0) {
            diagnosticsText = diagnostics.map(d => 
                `Line ${d.range.start.line + 1}: ${d.message} (${d.severity})`
            ).join('\n');
        }

        const fixPrompt = `Help fix issues in this ${language} code:

Code:
\`\`\`${language}
${code}
\`\`\`

${diagnosticsText ? `Known issues:\n${diagnosticsText}\n` : ''}

Please provide:
1. Identified problems
2. Fixed code
3. Explanation of changes made`;

        return await this.aiService.sendMessage(fixPrompt);
    }

    switchAIProvider(providerName: string): string {
        return this.aiService.switchProvider(providerName);
    }

    getAvailableProviders(): string[] {
        return this.aiService.getAvailableProviders();
    }

    getChatHistory(): Array<{message: string, response: string, timestamp: Date}> {
        return this.chatHistory;
    }

    clearChatHistory(): void {
        this.chatHistory = [];
        this.context = [];
        this.extensionContext.globalState.update('chatHistory', []);
    }

    private saveChatHistory(): void {
        // Lưu chỉ 100 entries gần nhất
        const recentHistory = this.chatHistory.slice(-100);
        this.extensionContext.globalState.update('chatHistory', recentHistory);
    }

    private loadChatHistory(): void {
        const saved = this.extensionContext.globalState.get<Array<any>>('chatHistory', []);
        this.chatHistory = saved.map(entry => ({
            ...entry,
            timestamp: new Date(entry.timestamp)
        }));
        
        // Khôi phục context từ history gần nhất
        this.context = this.chatHistory.slice(-20).map(entry => entry.message);
    }
}
