```
Hãy tạo cho tôi một VS Code extension hoặc fork hoàn chỉnh VS Code để tạo ra công cụ AI coding tương tự Cursor nhưng không giới hạn sử dụng. Tôi cần:

🎯 MỤC TIÊU CHÍNH:
Tạo một VS Code extension/fork với khả năng chat AI unlimited, tương tự Cursor nhưng hoàn toàn miễn phí và không bị rate limit.

📋 YÊU CẦU CHI TIẾT:

1. EXTENSION ARCHITECTURE:
   - Main extension entry point với proper activation
   - Webview panel cho chat interface đẹp mắt
   - AI service layer hỗ trợ multiple providers
   - Context management system để nhớ conversation
   - Deep integration với VS Code editor APIs
   - Command palette integration
   - Keyboard shortcuts support

2. AI PROVIDERS SYSTEM:
   - OpenAI GPT-4 (nếu có API key)
   - Anthropic Claude (nếu có API key) 
   - HuggingFace Inference API (free tier)
   - Local LLM qua Ollama (unlimited local)
   - Groq API (fast inference)
   - Together AI (multiple models)
   - Google Gemini API
   - Cohere API
   - Implement smart fallback chain khi provider fails
   - Auto-detection API keys từ environment
   - Provider switching UI

3. CORE AI FEATURES:
   - Interactive chat với conversation history
   - Code explanation từ selected text
   - Code analysis và quality assessment  
   - Code generation từ natural language descriptions
   - Bug detection và fixing suggestions
   - Code review tự động với suggestions
   - Context-aware responses (hiểu project structure)
   - Multi-file codebase understanding
   - Git diff analysis và explanation

4. UI/UX ADVANCED:
   - Modern chat interface với message bubbles
   - Syntax highlighting trong chat responses
   - Copy code snippets với one click
   - Export/import chat history
   - Dark/light theme auto-sync với VS Code
   - Resizable chat panel
   - Typing indicators
   - Message search functionality
   - Conversation branching
   - Favorite responses system

5. CODING ASSISTANCE:
   - Real-time code completion suggestions
   - Inline code suggestions
   - Error explanation khi có diagnostics
   - Code refactoring suggestions
   - Performance optimization tips
   - Security vulnerability detection
   - Code style consistency checks
   - Documentation generation
   - Test case generation
   - API usage examples

6. CONTEXT INTELLIGENCE:
   - Current file understanding
   - Selected code analysis
   - Entire project comprehension
   - Package.json dependencies awareness
   - Git repository context
   - Recent changes tracking
   - Error logs integration
   - Stack trace analysis

7. ADVANCED CAPABILITIES:
   - Multi-language support (JS, TS, Python, Go, Rust, etc.)
   - Framework-specific assistance (React, Vue, Django, etc.)
   - Database query optimization
   - API design suggestions
   - Architecture recommendations
   - Performance profiling insights
   - Deployment guidance
   - CI/CD pipeline suggestions

8. CONFIGURATION & CUSTOMIZATION:
   - Extensive settings panel
   - Custom prompts/templates
   - AI model preferences
   - Response length controls
   - Context window management
   - API rate limiting configuration
   - Custom keybindings
   - Theme customization

9. DEPLOYMENT & DISTRIBUTION:
   - Professional VSIX packaging
   - Auto-update mechanism
   - Telemetry và analytics (optional)
   - Error reporting system
   - User feedback collection
   - Documentation website
   - Tutorial videos

🛠️ TECHNICAL REQUIREMENTS:

- TypeScript với strict type checking
- Modern ES6+ syntax
- Comprehensive error handling
- Unit tests coverage
- Performance optimized
- Memory leak prevention  
- Secure API key handling
- Cross-platform compatibility (Windows, macOS, Linux)
- Professional code architecture
- Clean, maintainable codebase

📦 DELIVERABLES CẦN:

1. Complete source code structure:
   - src/extension.ts (main entry point)
   - src/aiService.ts (AI providers management)
   - src/chatProvider.ts (chat logic)
   - src/webview/ (HTML/CSS/JS cho UI)
   - src/commands/ (VS Code commands)
   - src/utils/ (helper functions)
   - src/types/ (TypeScript definitions)

2. Configuration files:
   - package.json (complete với all dependencies)
   - tsconfig.json (TypeScript config)
   - .vscodeignore (build exclusions)
   - webpack.config.js (bundling)

3. Assets và Resources:
   - icons/ (extension icons)
   - media/ (UI assets)
   - README.md (comprehensive guide)
   - CHANGELOG.md (version history)

4. Setup và Installation:
   - Build scripts và automation
   - Development environment setup
   - Testing procedures
   - Deployment instructions
   - User manual với screenshots

🎨 UI/UX DESIGN SPECS:

- Modern, clean chat interface
- VS Code native styling integration
- Responsive design cho different panel sizes
- Smooth animations và transitions
- Accessibility support (ARIA labels, keyboard navigation)
- Mobile-friendly webview design
- Professional typography
- Intuitive iconography

🔧 ADVANCED FEATURES:

- Code diff visualization
- Inline code suggestions
- Multi-cursor support
- Collaborative coding features
- Voice-to-code (optional)
- Code screenshot analysis
- Diagram generation from code
- API documentation lookup
- Stack Overflow integration
- GitHub Issues integration

💡 INNOVATION FEATURES:

- AI-powered code search
- Smart code templates
- Learning từ user coding patterns
- Personalized suggestions
- Team coding style enforcement
- Code quality metrics
- Technical debt analysis
- Refactoring automation
- Code migration assistance

🚀 PERFORMANCE TARGETS:

- < 2s response time cho AI queries
- < 500MB memory usage
- Smooth scrolling trong chat
- Fast startup time < 1s
- Efficient caching mechanisms
- Background processing support
- Minimal CPU usage khi idle

Hãy tạo cho tôi một solution HOÀN CHỈNH, PROFESSIONAL, PRODUCTION-READY với tất cả các files code, configuration, documentation và instructions chi tiết. Code phải clean, well-structured, commented và easy to maintain.

Tôi muốn có thể build và deploy ngay lập tức sau khi nhận được code từ bạn.
```
