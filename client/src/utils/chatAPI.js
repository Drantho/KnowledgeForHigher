const { ChatClient } = require('@azure/communication-chat');

const { AzureCommunicationTokenCredential, CommunicationUserIdentifier } = require("@azure/communication-common");
const { CommunicationIdentityClient } = require('@azure/communication-identity');

// Your unique Azure Communication service endpoint
let endpointUrl = 'https://kfhchat.communication.azure.com/';

module.exports = class Chat {
    id;
    token;
    client;
    threads;
    constructor() {
        //
    }

    constructor( id, token, client ) {
        //
        this.id = id; 
        this.token = token;
        this.client = client;
    }

    // If no args, create a new user, token, and client
    static async build() {
        const identityClient = new CommunicationIdentityClient(process.env.AZURE_CHAT_CONN_STRING);
        const idResponse = await identityClient.createUser();

        const { token, expiresOn }
            = await identityClient.issueToken({ communicationUserId: this.id }, 'chat');
        this.token = token;
        const client
            = new ChatClient(endpointUrl, new AzureCommunicationTokenCredential(token));
        return new Chat( idResponse.id, token, client );
    }

    // If provided an ID and token, refresh the token and construct the object
    static async build( id, token ) {
        const identityClient
            = new CommunicationIdentityClient(process.env.AZURE_CHAT_CONN_STRING);
        const { newToken, expiresOn }
            = await identityClient.issueToken({ communicationUserId: id }, 'chat');
        const client
            = new ChatClient(endpointUrl, new AzureCommunicationTokenCredential(token));
        
        return new Chat( id, newToken, client );
    }

    listChatThreads() {
        this.client.listChatThreads();
    }

    createThread(otherUser) {
        const createThreadRequest = {

            topic: `Chat with ${otherUser.firstName} ${otherUser.lastName}`,
            participants: [{
                user: { communicationUserId: this.id },
                displayName: 'name1'
            }, {
                user: { communicationUserId: otherUser.id },
                displayName: otherUser.firstName
            }]
        }

        const createThreadResponse = await this.client.createChatThread(createThreadRequest);
        return createThreadResponse.chatThread.id;
    }

    createThreadClient() {

    }

    setUserID(id) {
        this.id = id;
    }

    setToken(token) {
        this.token = token;
    }

    setClient(client) {
        this.client = client
    }
}
