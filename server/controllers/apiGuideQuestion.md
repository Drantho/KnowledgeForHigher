
## Creating
- URL: `/api/question/`
- Method: `POST`
- Body parameters
    - `title: <name : string>` - The new question's title
    - `text: <description : string>` - Text body (explanation) for the new question
    - `user: <user : integer>` - User ID number that the new question belongs to
- Query parameters
    - N/A
- URL paramters
    - N/A

## Reading
- URL: `/api/question/`
- Method: `GET`
- Body parameters
    - N/A
- Query parameters
    - `?id=<id> : integer` - Retrieves a single question by ID
    - `?user=<userID : integer>` - Retrieves questions belonging to specified user
    - `?tag=<tagName : string>` - Retrieves questions with specified tag
    - `?search=<searchTerm : string>` - Retrieves questions whose title or body contains a specified term
- URL parameters
    - N/A

## Editing 
### De-activating
- URL: `/api/question/deactivate/:id`
- Method: `PUT`
- Body parameters
    - N/A
- Query parameters
    - N/A
- URL parameters\
    - `<id : integer>` - Will set the specified question's 'isActive' state to false

## Deleting
- URL: `/api/question/:id`
- Method: `DELETE`
- Body parameters
    - N/A
- Query parameters
    - N/A
- URL parameters\
    - `<id : integer>` - Will delete the specified question (with all attached comments, answers, and ratings)