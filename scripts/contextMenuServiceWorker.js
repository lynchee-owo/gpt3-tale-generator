const getKey = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['openai-key'], (result) => {
        if (result['openai-key']) {
          const decodedKey = atob(result['openai-key']);
          resolve(decodedKey);
        }
      });
    });
};

const sendMessage = (content) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0].id;
    
        chrome.tabs.sendMessage(
            activeTab,
            { message: 'inject', content },
            (response) => {
            if (response.status === 'failed') {
                console.log('injection failed.');
            }
            }
        );
    });
  };

const generate = async (prompt) => {
    const key = await getKey();
    const url = 'https://api.openai.com/v1/completions';

    const completionResponse = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 1250,
        temperature: 0.7,
        }),
    });

    const completion = await completionResponse.json();
    return completion.choices.pop();
}

const generateCompletionAction = async (info) => {
    try {
        sendMessage('generating...');

        const { selectionText } = info;
        const basePromptPrefix = `
        Write a tale with the main character called the name below.
    
        Name:
        `;

        const baseCompletion = await generate(`${basePromptPrefix}${selectionText}`);

        const secondPrompt = `
        Write a new tale with the main character called the name below based on the tale below.
        
        Name: ${selectionText}
        
        Tale: ${baseCompletion.text}
        
        New Tale:
        `;

        const secondPromptCompletion = await generate(secondPrompt);
        // Send the output when we're all done
        sendMessage(secondPromptCompletion.text);
    } catch (error) {
        console.log(error);
        sendMessage(error.toString());
    }
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'context-run',
        title: 'Write tale',
        contexts: ['selection'],
    });
});

chrome.contextMenus.onClicked.addListener(generateCompletionAction);