const express = require('express');
const router = express.Router();

const { ChatClient } = require('@azure/communication-chat');

const { AzureCommunicationTokenCredential } = require("@azure/communication-common");
const { CommunicationIdentityClient } = require('@azure/communication-identity');

// Your unique Azure Communication service endpoint
let endpointUrl = 'https://kfhchat.communication.azure.com/';

let chatClient;
let threadIDstore;

router.post('/', async (req, res) => {

    const identityClient = new CommunicationIdentityClient(process.env.AZURE_CHAT_CONN_STRING);

    let JackIdentityResponse = await identityClient.createUser();
    let GeetaIdentityResponse = await identityClient.createUser();
    console.log(`\nCreated an identity with ID: ${JackIdentityResponse.communicationUserId}`);
    const jackTokenResponse = await identityClient.issueToken(JackIdentityResponse, ['chat']);
    const geetaTokenResponse = await identityClient.issueToken(GeetaIdentityResponse, ['chat']);

    console.log(`\nIssued an access token with 'chat' scope that expires at ${jackTokenResponse.expiresOn}`);
    console.log(jackTokenResponse.token);

    let jackTokenCredential = new AzureCommunicationTokenCredential(jackTokenResponse.token);
    chatClient = new ChatClient(endpointUrl, jackTokenCredential);

    console.log('Created communication chat client');

    const createThreadRequest = {
        topic: 'Test chat thread!',
        participants: [{
            user: { communicationUserId: JackIdentityResponse.communicationUserId },
            displayName: 'Jack'
        }, {
            user: { communicationUserId: GeetaIdentityResponse.communicationUserId },
            displayName: 'Geeta'
        }]
    }

    const createThreadResponse = await chatClient.createChatThread(createThreadRequest);

    console.log('Chat thread client for thread ID: ' + createThreadResponse.chatThread.id);
    threadIDstore = createThreadResponse.chatThread.id;
    res.json(createThreadResponse.chatThread.id);
});

router.post('/message', async (req, res) => {
    const chatThreadClient = await chatClient.getChatThreadClient(threadIDstore);
    console.log('Chat thread started on thread ID: ' + threadIDstore);

    const sendChatMessageResult = await chatThreadClient.sendMessage({
        content: req.body.msg
    }, {
        priority: 'normal',
        senderDisplayName: req.body.senderFirstName
    });

    console.log('Message sent! Message ID: ' + sendChatMessageResult.id);
});


module.exports = router;