# Writing Assistant Chrome Extension

This is a Chrome extension that uses OpenAI's GPT-3 language model to generate personalized tales for users. The extension requires the user to enter their OpenAI API key to authenticate and access the GPT-3 API.

## Installation

To use this Chrome extension, you need to have an OpenAI API key. You can sign up for an API key and follow the installation instructions on the [OpenAI API documentation](https://beta.openai.com/docs/api-reference/introduction) to set up your API credentials.

After you have your API key, fork and clone this repository to your local machine and install the required dependencies using npm:

```
git clone https://github.com/YOUR_USERNAME/gpt3-writer-extension-starter.git
cd gpt3-writer-extension-starter
npm install
```


## Usage

To use the writing assistant extension, you need to load it into your Chrome browser. Here's how:

1. Open the Chrome browser and navigate to the Extensions page (`chrome://extensions`).
2. Enable Developer mode by toggling the switch in the top right corner.
3. Click the "Load unpacked" button and select the folder where you cloned the repository.
4. Once the extension is loaded, click the extension icon in the Chrome toolbar to open the popup window.

In the popup window, you will be asked to enter your OpenAI API key.

Then you can try writing a tale on [Calmly](https://www.calmlywriter.com/online/). Here's how:
1. Type a name for the main character.
2. Highlight the name and right click. 
3. Choose "Write Tale".

Wait several seconds to see the generated tale on the Calmly page.

## Acknowledgments

This project was inspired by the AI Assitant project from Buildspace.
