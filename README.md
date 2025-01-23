# ItsMyBot - Modular Discord Bot Framework

![GitHub](https://img.shields.io/github/license/BilBini/Discord-Bot)
![Docker](https://img.shields.io/badge/Docker-supported-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)

ItsMyBot is a powerful, modular Discord bot framework built with TypeScript, designed for both personal and community use. With its plugin architecture and extensive customization options, you can create a bot tailored to your specific needs.

## Features

- 🧩 **Modular Plugin System**: Easily extend functionality with custom plugins
- ⚙️ **Custom Commands**: Create commands through simple YAML configuration
- 🗃️ **Database Support**: SQLite, MySQL, and MariaDB integration
- 🛡️ **Robust Validation**: Built-in validation for commands and configurations
- 📊 **Logging System**: Customizable logging with multiple levels
- 🐳 **Docker Support**: Easy deployment with Docker and Docker Compose

## Quick Start

### Prerequisites
- Node.js 18+
- Docker (optional)
- Discord bot token

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BilBini/Discord-Bot.git
   cd Discord-Bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your bot:
   - Copy `.env.example` to `.env`
   - Add your Discord token and other configuration

4. Build the bot:
   ```bash
   npm run build
   ```

5. Start the bot:
   ```bash
   npm start
   ```

### Docker Deployment

1. Build the Docker image:
   ```bash
   docker-compose build
   ```

2. Start the container:
   ```bash
   docker-compose up -d
   ```

## Configuration

Edit the following files to customize your bot:

- `.env`: Environment variables
- `config.yml`: Main configuration
- `commands.yml`: Command permissions
- `lang.yml`: Localization strings

## Plugin Development

To create a plugin:

1. Use the plugin generator:
   ```bash
   npm run make:plugin
   ```

2. Develop your plugin in the `plugins` directory

3. Enable your plugin in the configuration

## Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

This project is licensed under the Custom Software License Agreement - see the [LICENSE](LICENSE) file for details.

## Support

For help and support:
- Open an issue on GitHub

---

**Happy Botting!** 🤖 
