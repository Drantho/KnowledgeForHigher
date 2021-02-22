## Creating
- URL: `/api/answer/`
- Method: `POST`
- Body parameters
    - `text: <name : string>` - Text content of the answer
    - `user: <userID : integer>` - User who submitted the answer
    - `question: <questionID : integer>` - Question that the answer is answering
- Query parameters
    - N/A
- URL paramters
    - N/A

## Reading
- URL: `/api/answer`
- Method: `GET`
- Body parameters
    - N/A
- Query parameters
    - `?id=<id> : integer` - Retrieves a single answer by ID
    - `?user=<userID : integer>` - Retrieves answers submitted by a specified user
    - `?question=<tagName : string>` - Retrieves all of a question's answers