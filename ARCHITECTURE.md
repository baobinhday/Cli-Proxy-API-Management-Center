# CLAUDE.md

This file provides guidance to Code when working with code in this repository.

## Project Overview

This is the modern WebUI for managing the CLI Proxy API. It's a management interface that provides a web-based UI to configure and monitor the CLI Proxy API service. The main project is at https://github.com/router-for-me/CLIProxyAPI.

## Tech Stack

- **Frontend**: Plain HTML, CSS, JavaScript (ES6+)
- **Styling**: CSS3 + Flexbox/Grid with CSS Variables
- **Icons**: Font Awesome 6.4.0
- **Charts**: Chart.js for interactive data visualization
- **Editor/Parsing**: CodeMirror + js-yaml
- **API**: RESTful management endpoints with automatic authentication
- **Storage**: LocalStorage with lightweight encryption for preferences/credentials

## Architecture

The application follows a modular architecture with the following core components:

### Core Services (`src/core/`)
- `api-client.js`: Handles API requests with base URL normalization, authentication headers, and response processing
- `connection.js`: Manages API connection state, settings persistence, and version tracking
- `config-service.js`: Caches and manages configuration data with expiry
- `event-bus.js`: Provides event-driven communication between modules
- `error-handler.js`: Centralized error handling

### Modules (`src/modules/`)
- `login.js`: Authentication and connection management
- `settings.js`: Basic settings (debug, proxy URL, retries, etc.)
- `api-keys.js`: Management of proxy auth keys and provider configurations
- `ai-providers.js`: OpenAI-compatible providers with custom base URLs/headers
- `auth-files.js`: Upload/download/search of JSON credentials with pagination
- `oauth.js`: OAuth/Device flows for various providers
- `usage.js`: Usage analytics with charts and statistics
- `config-editor.js`: In-browser YAML editor for config files
- `logs.js`: Log viewer with auto-refresh and download capabilities
- `language.js`: Internationalization support
- `theme.js`: Theme management (light/dark)

### Utilities (`src/utils/`)
- `secure-storage.js`: Encrypted local storage for sensitive data
- `html.js`, `string.js`, `array.js`, `dom.js`: Utility functions
- `constants.js`: Configuration constants and default values

### Main Application (`app.js`)
- `CLIProxyManager` class that combines all modules using Object.assign
- Handles initialization, event binding, and state management
- Provides global access to manager instance

## Development Commands

- `npm install` - Install dependencies
- `npm start` - Start development server on http://localhost:3000
- `npm run dev` - Start development server on http://localhost:3090
- `npm run build` - Build the project to `dist/index.html` using webpack
- `npm run lint` - Lint code (currently just shows a message to use browser dev tools)

## Build Process

The build process creates a single `dist/index.html` file that contains all HTML, CSS, and JavaScript inlined. The custom build script (`build.cjs`):
- Bundles all JavaScript modules by inlining imports
- Inlines CSS and JavaScript into the HTML
- Replaces `__VERSION__` placeholder with actual version from git tags or package.json
- Optionally inlines a logo file if found

## Key Patterns

1. **Modular Architecture**: Each feature is implemented as a module that gets mixed into the main CLIProxyManager class
2. **Event-Driven**: Uses an event bus for inter-module communication
3. **API Client Abstraction**: Centralized API client handles authentication and request formatting
4. **Config Caching**: Configuration data is cached with expiry to reduce API calls
5. **Secure Storage**: Sensitive data is stored with encryption in localStorage
6. **Internationalization**: Built-in i18n support with language switching
7. **Theme Management**: Light/dark theme support with localStorage persistence

## Important Files

- `app.js`: Main application class that combines all modules
- `src/core/api-client.js`: Core API communication logic
- `src/core/connection.js`: Connection state management
- `index.html`: Main HTML template
- `styles.css`: Global styles
- `i18n.js`: Internationalization implementation
- `build.cjs`: Custom build script
- `webpack.config.js`: Webpack configuration for alternate build approach