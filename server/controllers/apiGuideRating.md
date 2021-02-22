## Creating
- URL: `/api/rating/`
- Method: `POST`
- Body parameters
    - `user: <userID : integer>` - User who submitted this rating
    - `isPositive: <rating : boolean>` - The rating
    - `type: <type: string ['question', 'service', 'answer']>` - The type of entity this rating is attached to
    - `ref: <entityID : integer>` - ID number for the entity this rating is attached to
- Query parameters
    - N/A
- URL parameters
    - N/A

## Reading
- URL: `/api/rating/`
- Method: `GET`
- Body parameters
    - N/A
- Query parameters
    - `?user=<userID : integer>` - The user to find ratings for
    - `?type=<type : string ['question', 'service', 'answer']` - The type of entity which we want to find ratings for
    - `?ref=<refID : integer>` - The entity which we want to find ratings for
- URL parameters
    - N/A

## Updating
- URL: `/api/rating/`
- Method: `PUT`
- Body parameters
    - `id: <ratingID : integer>` - ID number for the rating to update
- Query parameters
    - N/A
- URL parameters
    - N/A

## Deleting
- URL: `/api/rating/:id`
- Method: `DELETE`
- Body parameters
    - N/A
- Query parameters
    - N/A
- URL parameters
    - `:id - <ratingID : integer>` - ID number for the rating to delete