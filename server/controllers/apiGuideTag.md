
## Creating
- URL: `/api/tag/`
- Method: `POST`
- Body parameters
    - `name: <name : string>` - Name for the new tag
    - `description: <description : string>` - Description for the new tag
- Query parameters
    - N/A
- URL paramters
    - N/A

## Reading
- URL: `/api/tag/`
- Method: `GET`
- Body parameters
    - N/A
- Query parameters
    - `?id=<id : integer>` - Retrieves a single tag by ID
    - `?name=<name : string>` - Retrieves a single tag by name
    - `?user=<userID : integer>` - Retrieves tags attached to a specified user
    - `?question=<questionID : integer>` - Retrieves tags attached to a specified user's question
    - `?service=<serviceID : integer>` - Retrieves tags attached to a specified user's service
    - `?search=<searchTerm : string>` - Retrieves tags whose name or description contains a specified term
- URL parameters
    - N/A

## Editing

### Re-naming a tag
- URL: `/api/tag/name`
- Method: `PUT`
- Body parameters
    - `id: <id : integer>` - Tag to re-name
    - `name: <name : string>` - New name
- Query parameters
    - N/A
- URL parameters
    - N/A

### Editing a tag's description
- URL: `/api/tag/description`
- Method: `PUT`
- Body parameters
    - `id: <id : integer>` - Tag to edit
    - `description: <description : string>` - New description
- Query parameters
    - N/A
- URL parameters
    - N/A

### Linking tags to a user
- URL: `/api/tag/user`
- Method: `PUT`
- Body parameters
    - `tags: [ <name : string> ]` - **Array** of tag **names** to link to a user
    - `user: <id : integer>` - User ID for user to link tags to
- Query parameters
    - N/A
- URL parameters
    - N/A

### Linking tags to a service
- URL: `/api/tag/service`
- Method: `PUT`
- Body parameters
    - `tags: [ <name : string> ]` - **Array** of tag **names** to link to a service
    - `service: <id : integer>` - Service ID for user to link tags to
- Query parameters
    - N/A
- URL parameters
    - N/A

### Linking tags to a question
- URL: `/api/tag/question`
- Method: `PUT`
- Body parameters
    - `tags: [ <name : string> ]` - **Array** of tag **names** to link to a question
    - `question: <id : integer>` - Question ID for user to link tags to
- Query parameters
    - N/A
- URL parameters
    - N/A