# Good Tape Case - Thoughts and Decisions

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
