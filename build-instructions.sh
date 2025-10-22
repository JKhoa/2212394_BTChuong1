#!/bin/bash

echo "🚀 VS Code AI Extension Builder"
echo "================================"

# Tạo extension structure
create_extension_structure() {
    echo "📁 Creating extension structure..."
    
    mkdir -p ai-unlimited-chat/src
    mkdir -p ai-unlimited-chat/media
    mkdir -p ai-unlimited-chat/out
    
    cd ai-unlimited-chat
    
    # Copy files
    cp ../ai-chat-extension.ts src/extension.ts
    cp ../aiService.ts src/aiService.ts  
    cp ../chatProvider.ts src/chatProvider.ts
    cp ../package.json package.json
    
    echo "✅ Extension structure created"
}

# Install dependencies
install_dependencies() {
    echo "📦 Installing dependencies..."
    
    npm install
    npm install --save-dev @types/vscode @types/node typescript
    npm install node-fetch @types/node-fetch
    
    echo "✅ Dependencies installed"
}

# Create TypeScript config
create_typescript_config() {
    echo "⚙️ Creating TypeScript configuration..."
    
    cat > tsconfig.json << 'EOF'
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "ES2020",
        "outDir": "out",
        "lib": [
            "ES2020"
        ],
        "sourceMap": true,
        "rootDir": "src",
        "strict": true
    },
    "exclude": [
        "node_modules",
        ".vscode-test"
    ]
}
EOF
    
    echo "✅ TypeScript configuration created"
}

# Create webpack config for production
create_webpack_config() {
    echo "📦 Creating Webpack configuration..."
    
    npm install --save-dev webpack webpack-cli ts-loader
    
    cat > webpack.config.js << 'EOF'
const path = require('path');

module.exports = {
    target: 'node',
    entry: './src/extension.ts',
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '../[resource-path]'
    },
    devtool: 'source-map',
    externals: {
        vscode: 'commonjs vscode'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [{
                loader: 'ts-loader'
            }]
        }]
    }
};
EOF
    
    echo "✅ Webpack configuration created"
}

# Create build scripts
update_package_scripts() {
    echo "🔧 Updating package.json scripts..."
    
    # Update package.json scripts using node
    node -e "
        const fs = require('fs');
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        pkg.scripts = {
            ...pkg.scripts,
            'vscode:prepublish': 'npm run package',
            'compile': 'webpack',
            'watch': 'webpack --watch',
            'package': 'webpack --mode production --devtool hidden-source-map',
            'test-compile': 'tsc -p ./',
            'test-watch': 'tsc -watch -p ./'
        };
        fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
    "
    
    echo "✅ Package scripts updated"
}

# Build extension
build_extension() {
    echo "🔨 Building extension..."
    
    npm run compile
    
    if [ $? -eq 0 ]; then
        echo "✅ Extension built successfully"
    else
        echo "❌ Build failed"
        exit 1
    fi
}

# Package extension
package_extension() {
    echo "📦 Packaging extension..."
    
    npm install -g vsce
    vsce package
    
    if [ $? -eq 0 ]; then
        echo "✅ Extension packaged successfully"
        echo "🎉 Your .vsix file is ready for installation!"
    else
        echo "❌ Packaging failed"
        exit 1
    fi
}

# Create README
create_readme() {
    echo "📝 Creating README..."
    
    cat > README.md << 'EOF'
# AI Unlimited Chat - VS Code Extension

🤖 Unlimited AI chat for VS Code - like Cursor but completely free!

## Features

- 💬 **Unlimited AI Chat** - No rate limits like Cursor
- 🧠 **Multiple AI Providers** - OpenAI, Claude, HuggingFace, Local LLM
- 🔄 **Smart Fallback** - Automatically switches providers if one fails
- 📝 **Code Context** - AI understands your current code
- 🔍 **Code Analysis** - Analyze, explain, and fix code issues
- ⚡ **Fast & Free** - Use local LLM via Ollama for unlimited usage

## Installation

1. Download the `.vsix` file
2. Open VS Code
3. Go to Extensions (Ctrl+Shift+X)
4. Click "..." → "Install from VSIX"
5. Select the downloaded file

## Setup

### Option 1: Local LLM (Recommended - Free & Unlimited)
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull a model
ollama pull llama2
```

### Option 2: API Keys (Optional)
Set environment variables:
```bash
export OPENAI_API_KEY="your-key"
export ANTHROPIC_API_KEY="your-claude-key"
export HUGGINGFACE_API_KEY="your-hf-key"
```

## Usage

- **Open Chat**: `Ctrl+Shift+A` (Mac: `Cmd+Shift+A`)
- **Explain Code**: `Ctrl+Shift+E` (Mac: `Cmd+Shift+E`)  
- **Analyze Code**: `Ctrl+Shift+R` (Mac: `Cmd+Shift+R`)

Or use Command Palette: `Ctrl+Shift+P` → "AI Chat"

## Commands

- `AI Chat: Open` - Open chat panel
- `AI Chat: Explain Code` - Explain selected code
- `AI Chat: Analyze Code` - Analyze code quality
- `AI Chat: Fix Code Issues` - Get fix suggestions
- `AI Chat: Generate Code` - Generate code from description
- `AI Chat: Switch Provider` - Change AI provider
- `AI Chat: Clear History` - Clear chat history

## Configuration

Go to Settings → Extensions → AI Chat:

- **Default Provider**: Choose your preferred AI
- **API Keys**: Configure your API keys
- **Max Context**: How much conversation history to keep
- **Code Context**: Auto-include code in chat

## Why This Extension?

- ✅ **Completely Free** with local LLM
- ✅ **No Rate Limits** unlike Cursor
- ✅ **Multiple AI Options** for redundancy  
- ✅ **Privacy First** - your code stays local with Ollama
- ✅ **Open Source** - modify as needed
- ✅ **Active Development** - regular updates

## Troubleshooting

**Chat not working?**
1. Check if Ollama is running: `ollama serve`
2. Verify model is installed: `ollama list`
3. Check VS Code Developer Console for errors

**No response from AI?**
- Extension will auto-fallback to next available provider
- Check your API keys in settings
- Ensure internet connection for cloud providers

## Contributing

This is an open-source project. Contributions welcome!

## License

MIT License - Use freely!

---

🚀 **Happy Coding with Unlimited AI!** 🚀
EOF
    
    echo "✅ README created"
}

# Main execution
main() {
    echo "Starting VS Code AI Extension build process..."
    echo ""
    
    create_extension_structure
    install_dependencies
    create_typescript_config
    create_webpack_config  
    update_package_scripts
    build_extension
    create_readme
    package_extension
    
    echo ""
    echo "🎉 SUCCESS! Your AI VS Code Extension is ready!"
    echo ""
    echo "📁 Files created:"
    echo "   - ai-unlimited-chat/ (extension folder)"
    echo "   - ai-unlimited-chat-X.X.X.vsix (installable package)"
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Install Ollama: curl -fsSL https://ollama.ai/install.sh | sh"
    echo "   2. Pull model: ollama pull llama2"
    echo "   3. Install extension: Extensions → Install from VSIX"
    echo "   4. Use Ctrl+Shift+A to open AI chat"
    echo ""
    echo "✨ Enjoy unlimited AI coding assistance!"
}

# Run main function
main
