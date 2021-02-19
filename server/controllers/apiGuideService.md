
## Creating
- URL: `/api/service/`
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
- URL: `/api/service/`
- Method: `GET`
- Body parameters
    - N/A
- Query parameters
    - `?id=<id> : integer` - Retrieves a single service by ID
    - `?user=<userID : integer>` - Retrieves services belonging to specified user
    - `?tag=<tagName : string>` - Retrieves services with specified tag
    - `?search=<searchTerm : string>` - Retrieves services whose name or description contains a specified term
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