const axios = require('axios');

const key_var = 'AZURE_TRANSLATE_KEY';
if (!process.env[key_var]) {
    throw new Error('Please set/export the following environment variable: ' + key_var);
}

const subscriptionKey = process.env[key_var];

const endpoint = "https://api.cognitive.microsofttranslator.com";
const region = 'westus2';

module.exports = (text) => {
    return axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': region,
            'Content-type': 'application/json'
        },
        params: {
            'api-version': '3.0',
            'to': ['en'],
            'profanityAction': 'Marked',
            'profanityMarker': 'Asterisk'
        },
        data: [{
            'text': text
        }],
        responseType: 'json'
    });
};