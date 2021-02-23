## Creating
- URL: `/api/user/`
- Method: `POST`
- Body parameters
    - `username: <username : string>`
    - `firstName: <firstName : string>`
    - `lastName: <lastName : string>`
    - `email: <email : string>`
    - `password: <password : string>`
- Query parameters
    - N/A
- URL parameters
    - N/A

## Reading
- URL: `/api/user/`
- Method: `GET`
- Body parameters
    - N/A
- Query parameters
    - `?id=<userID : integer>` - User ID number to retrieve
    - `?search=<searchTerm : string>` - A term to search for users
- URL parameters
    - N/A

## Updating
- URL: `/api/user/`
- Method: `PUT`
- Body parameters
    - `username: <username : string>`
    - `firstName: <firstName : string>`
    - `lastName: <lastName : string>`
    - `email: <email : string>`
    - `password: <password : string>`
- Query parameters
    - N/A
- URL parameters
    - N/A

## Deleting
- URL: `/api/user/:id`
- Method: `DELETE`
- Body parameters
    - N/A
- Query parameters
    - N/A
- URL parameters
    - `:id - <userID : integer>` - ID number of user to delete