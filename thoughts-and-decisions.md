# Good Tape Case - Thoughts and Decisions

### Runing the project

**Clone the repository:**

```bash
git clone <repository-url>
cd <repository-folder>
```

Install depencies

```
npm install
# or
yarn install
```

Run the development server:

```
npm run dev
# or
yarn dev
```

### Vite Configuration

The project uses Vite for fast and efficient development. Below are the key configurations applied in the `vite.config.ts` file:

## Key Features

### Server Proxy

- API requests to `/api` are proxied to `https://api.goodtape.io` to simplify local development and avoid CORS issues.
- The proxy setup includes a path rewrite that removes the `/api` prefix before forwarding requests to the backend.

```javascript
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.goodtape.io',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
  }
})
```

Cross-Origin Policies
The following headers are set to enable SharedArrayBuffer usage, which is necessary for working with certain libraries like @ffmpeg/ffmpeg:

- Cross-Origin-Opener-Policy: same-origin
- Cross-Origin-Embedder-Policy: require-corp

```
headers: {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp'
}
```

Dependency Optimization
The @ffmpeg/ffmpeg and @ffmpeg/util packages are excluded from optimization. This ensures they are processed correctly by Vite and avoids potential issues during development.

```
optimizeDeps: {
  exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
}
```


### Tech and Tools Used:

- **React**
- **TypeScript**
- **Tailwind**
- **Axios**
- **Clsx**
- **ffmpeg**
- **FontAwesome**

## Sidequests

For my three sidequests, I have chosen:

- `1. Styling Challenge`
- `3. Implement Voice Output for the Jokes`
- `5. Custom Feature`

## Styling Challenge

In this challenge, I have implemented a themed UI inspired by some of Good Tape's colors, like `#853BFD`. The themed UI includes elements such as buttons and inputs. These components offer a variety of options for customizability and reusability. My aim was to implement a theme with an approachable and relaxed feel. I focused on the use of rounded corners as an example. The UI also comes with a clear CTA.

## Implement Voice Output for the Jokes

This sidequest seemed natural considering a large portion of the web app deals with audio. The web app uses a custom `useUttering` hook to access and use the voice output. In this hook, I use `const isSpeechSynthesisSupported = 'speechSynthesis' in window` to check if the browser supports `speechSynthesis` and then render the UI based on that.

## Custom Feature

This custom feature supports two separate views. The ViewToggle functionality was implemented to provide users with a flexible and personalized way to interact with the content. This feature aims to create a dynamic and customizable user experience. The ability to toggle between views allows the user to select the most comfortable or desirable layout based on their preferences, giving them more control over how they engage with the content. It was achieved using `useState` to set the desired view onClick and render the UI accordingly.

## Other Ideas

In a future iteration, there are several features and elements that I would like to include and optimize:

- **Match the response from the good tape service with an array of predefined keywords to allow users to speak whole commands like 'show me jokes about [cats]'.**

- **With the power of localStorage, enable features like saving recent jokes and adding jokes to favorites.**

- **Remove the need for manual audio upload.**

- **Implement path aliases for cleaner imports.**

