## Creating
- URL: `/api/comment/`
- Method: `POST`
- Body parameters
    - `text: <text : string>` - The comment's text
    - `UserId: <userID : integer>` - The user who submitted the comment
    - `type: <type : ['service', 'answer', 'question']>` - The type of entry this comment is replying to
    - `ref: <refID : integer>` - The ID of the entry this comment is replying to
- Query parameters
    - N/A
- URL paramters
    - N/A

## Reading
- URL: `/api/comment/`
- Method: `GET`
- Body parameters
    - N/A
- Query parameters
    - `?id=<commentID : integer>` - ID of individual comment to retrieve
    - `?user=<userID : integer>` - ID of user to retreive comments for
    - `?question=<questionID : integer>` - ID of question to retrieve comments for
    - `?answer=<answerID : integer>` - ID of answer to retrieve comments for
    - `?service=<serviceID : integer>` - ID of service to retrieve comments for
- URL parameters
    - N/A

## Updating
- URL: `/api/comment/`
- Method: `PUT`
- Body parameters
    - `text: <newText : string>` - The comment's text

## Deleting
- URL: `/api/comment/:id`
- Method: `DELETE`
- Body parameters
    - N/A
- Query parameters
    - N/A
- URL parameters
    - `:id - <commentID : integer>` - ID of comment to delete