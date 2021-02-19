
## Creating
- URL: `/api/tag/`
- Method: `POST`
- Body parameters
    - `name: <name : string>` - Name for the new service
    - `description: <description : string>` - Description for the new service
    - `user: <user : integer>` - User ID number that the new service belongs to
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

## Deleting (deactivating)
- URL: `/api/service/:id`
- Method: `DELETE`
- Body parameters
    - N/A
- Query parameters
    - N/A
- URL parameters\
    - `<id : integer>` - Will set the specified service's 'isActive' state to false 