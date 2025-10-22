// extensions/ai-chat/src/aiService.ts
export interface AIProvider {
    name: string;
    apiKey?: string;
    endpoint: string;
    sendMessage(message: string, context?: string[]): Promise<string>;
}

export class OpenAIProvider implements AIProvider {
    name = 'OpenAI';
    endpoint = 'https://api.openai.com/v1/chat/completions';
    
    constructor(private apiKey: string) {}

    async sendMessage(message: string, context: string[] = []): Promise<string> {
        const messages = [
            ...context.map(msg => ({ role: 'user', content: msg })),
            { role: 'user', content: message }
        ];

        const response = await fetch(this.endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages,
                temperature: 0.7,
            }),
        });

        const data = await response.json();
        return data.choices[0].message.content;
    }
}

export class ClaudeProvider implements AIProvider {
    name = 'Claude';
    endpoint = 'https://api.anthropic.com/v1/messages';
    
    constructor(private apiKey: string) {}

    async sendMessage(message: string, context: string[] = []): Promise<string> {
        const response = await fetch(this.endpoint, {
            method: 'POST',
            headers: {
                'x-api-key': this.apiKey,
                'Content-Type': 'application/json',
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-sonnet-20240229',
                max_tokens: 4000,
                messages: [
                    { role: 'user', content: message }
                ]
            }),
        });

        const data = await response.json();
        return data.content[0].text;
    }
}

// Free AI providers (không giới hạn)
export class HuggingFaceProvider implements AIProvider {
    name = 'HuggingFace';
    endpoint = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large';
    
    constructor(private apiKey: string) {}

    async sendMessage(message: string): Promise<string> {
        const response = await fetch(this.endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: message,
            }),
        });

        const data = await response.json();
        return data.generated_text || data[0]?.generated_text || 'Sorry, I could not process your request.';
    }
}

export class LocalLLMProvider implements AIProvider {
    name = 'Local LLM';
    endpoint = 'http://localhost:11434/api/generate'; // Ollama endpoint
    
    async sendMessage(message: string): Promise<string> {
        try {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'llama2',
                    prompt: message,
                    stream: false
                }),
            });

            const data = await response.json();
            return data.response;
        } catch (error) {
            return 'Local LLM not available. Please install Ollama and pull a model.';
        }
    }
}

export class AIService {
    private providers: AIProvider[] = [];
    private currentProvider: AIProvider | null = null;

    constructor() {
        this.initializeProviders();
    }

    private initializeProviders() {
        // Thêm providers với fallback
        const openaiKey = process.env.OPENAI_API_KEY;
        const claudeKey = process.env.ANTHROPIC_API_KEY;
        const hfKey = process.env.HUGGINGFACE_API_KEY;

        if (openaiKey) {
            this.providers.push(new OpenAIProvider(openaiKey));
        }

        if (claudeKey) {
            this.providers.push(new ClaudeProvider(claudeKey));
        }

        if (hfKey) {
            this.providers.push(new HuggingFaceProvider(hfKey));
        }

        // Luôn thêm local LLM như fallback
        this.providers.push(new LocalLLMProvider());

        // Chọn provider đầu tiên có sẵn
        this.currentProvider = this.providers[0] || null;
    }

    async sendMessage(message: string, context: string[] = []): Promise<string> {
        if (!this.currentProvider) {
            return 'No AI provider available. Please configure at least one API key.';
        }

        try {
            return await this.currentProvider.sendMessage(message, context);
        } catch (error) {
            // Fallback to next provider
            const currentIndex = this.providers.indexOf(this.currentProvider);
            const nextProvider = this.providers[currentIndex + 1];
            
            if (nextProvider) {
                this.currentProvider = nextProvider;
                return await this.sendMessage(message, context);
            }

            return `Error: ${error.message}`;
        }
    }

    switchProvider(providerName: string) {
        const provider = this.providers.find(p => p.name === providerName);
        if (provider) {
            this.currentProvider = provider;
            return `Switched to ${providerName}`;
        }
        return `Provider ${providerName} not found`;
    }

    getAvailableProviders(): string[] {
        return this.providers.map(p => p.name);
    }
}
