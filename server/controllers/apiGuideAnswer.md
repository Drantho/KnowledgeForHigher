## Creating
- URL - `/api/answers/`
- Method - `POST`
- Body parameters
    - `text: <text: string>` - The text content of the answer
    - `UserId: <userID: integer>` - The ID number of the user who submitted this answer
    - `QuestionId: <questionID: integer` - The ID number of the question that this answer is a response to.

## Reading
- URL - `/api/answers/`
- Method - `GET`
- Body parameters
    - N/A
- Query parameters
    - `?id=<id: integer>` - ID of individual answer to retreive
    - `?user=<userID: integer>` - ID of user (if provided, will retrieve all answers submitted by that user)
    - `?question=<questionID: integer>` - ID of question (if provided, will retrieve all answers in response to that question)
- URL parameters
    - N/A

## Updating
- URL - `/api/answers/`
- Method - `PUT`
- Body parameters
    - `text : <newText : string>` - New answer text
    - `id : <answerID : string>` - ID for answer to update

## Deleting
- URL - `/api/answers/:id`
- Method - `DELETE`
- Body parameters
    - N/A
- Query parameters
    - N/A
- URL parameters
    - `/:id - <answerID : integer>` - ID of individual answer to delete
