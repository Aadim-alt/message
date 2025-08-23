# Simple Messenger

A lightweight, real-time chat application built with HTML, CSS, and JavaScript. No database required - messages are stored in memory and disappear when the page is refreshed.

## Features

- 💬 Real-time messaging interface
- 👤 Custom usernames (stored in localStorage)
- 🎨 Modern, responsive design
- 📱 Mobile-friendly layout
- ⚡ No backend required
- 🔄 Auto-scrolling message history
- 🕒 Message timestamps
- 🎭 Simulated bot responses

## How to Use

1. **Set Your Username**: Enter your name in the username field and click "Set Name"
2. **Start Chatting**: Type your message in the input field and press Enter or click "Send"
3. **Enjoy**: The chat will simulate responses from a bot

## Local Development

To run the messenger locally:

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start chatting!

### Using a Local Server (Recommended)

For better development experience, you can use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## GitHub Pages Deployment

To deploy to GitHub Pages:

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to repository Settings → Pages
4. Select the main branch as the source
5. Your site will be available at `https://[username].github.io/[repository-name]`

## File Structure

```
simple-messenger/
├── index.html      # Main HTML file
├── styles.css      # CSS styles
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Browser Support

- Chrome/Edge 60+
- Firefox 55+
- Safari 12+
- iOS Safari 12+
- Android Chrome 60+

## Customization

You can easily customize the messenger by modifying:

- **Colors**: Edit the CSS variables in `styles.css`
- **Responses**: Modify the `responses` array in `script.js`
- **Layout**: Adjust the HTML structure in `index.html`

## Limitations

- Messages are not persisted (lost on page refresh)
- No real user-to-user messaging (simulated responses only)
- No user authentication
- No message history storage

## Future Enhancements

Potential features that could be added:
- WebSocket integration for real multi-user chat
- Message persistence with localStorage
- File sharing capabilities
- Emoji support
- Message search
- User avatars

## License

This project is open source and available under the MIT License.
