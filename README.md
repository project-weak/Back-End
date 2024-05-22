# Music Database Server

## Overview
This project is a backend server for managing a music database, built with Node.js and Express. It provides CRUD (Create, Read, Update, Delete) operations for two tables, `liked` and `playlist`, in a PostgreSQL database. The server also serves a JSON file and handles errors gracefully.

## Features
- **Environment Variables**: Configuration is handled using a `.env` file to store sensitive information such as the server port and database URL.
- **Database Integration**: Uses PostgreSQL to store and manage music data.
- **RESTful API**: Implements various endpoints to interact with the music database.
- **Error Handling**: Includes middleware for handling server and page not found errors.
- **CORS**: Enabled to allow cross-origin requests.
- **Axios**: Used for making HTTP requests to other services if needed.

## Setup and Installation

### Prerequisites
- Node.js and npm installed
- PostgreSQL installed and running

### Installation Steps
1. Clone the repository:
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:
    ```env
    Key_Port=3005
    URL_DB=postgresql://localhost:5432/musicdb
    ```

4. Initialize the database with the provided schema:
    ```sql
    CREATE TABLE liked (
        id SERIAL PRIMARY KEY,
        music_name VARCHAR(255),
        singer_name VARCHAR (255),
        url_image VARCHAR(255),
        audio VARCHAR(255), 
        comment VARCHAR(255)
    );

    CREATE TABLE playlist (
        id SERIAL PRIMARY KEY,
        music_name VARCHAR(255),
        singer_name VARCHAR (255),
        url_image VARCHAR(255),
        audio VARCHAR(255),
        comment VARCHAR(255)
    );
    ```

5. Start the server:
    ```bash
    node server.js
    ```

## API Endpoints

### `GET /`
Fetches the data from a JSON file and returns it.
- **Response**: JSON data from `src/data.json`.

### `GET /favorite`
Fetches combined data from `liked` and `playlist` tables in the database.
- **Response**: JSON object with two arrays, `Liked` and `Playlist`.

### `POST /addMusic`
Adds a new music entry to either the `liked` or `playlist` table.
- **Request Body**:
    ```json
    {
        "music_name": "string",
        "singer_name": "string",
        "url_image": "string",
        "audio": "string",
        "comment": "string",
        "table": "liked" or "playlist"
    }
    ```
- **Response**: The newly added music entry.

### `PUT /UPDATE/:id`
Updates the comment of a music entry in either the `liked` or `playlist` table.
- **Request Body**:
    ```json
    {
        "comment": "string",
        "table": "liked" or "playlist"
    }
    ```
- **Response**: The updated music entry.

### `DELETE /DELETE`
Deletes a music entry from either the `liked` or `playlist` table based on the provided ID.
- **Request Parameters**:
    ```json
    {
        "id": "number",
        "table": "liked" or "playlist"
    }
    ```
- **Response**: Confirmation message of deletion.

## Error Handlers
### `handleServerError`
Handles server errors by logging the error and sending a 500 status response.
### `handlePageNotFoundError`
Handles 404 errors for undefined routes.

## Running the Server
The server listens on the port defined in the `.env` file or defaults to port 3002.

```bash
Server is running on port 3005

{
  "popular": [
    {
      "id": 1,
      "music_name": "Balrog Boogie",
      "singer_name": "Diablo Swing Orchestra",
      "url_image": "https://usercontent.jamendo.com?type=album&id=49216&width=300&trackid=391002",
      "audio": "https://prod-1.storage.jamendo.com/?trackid=391002&format=mp31&from=K2GLQltYaVkmH%2Bp%2Fm1eF%2BQ%3D%3D%7CxIs98WZfYI22KHZVuw5JcA%3D%3D"
    }
  ]
}
# Technologies Used
Node.js: JavaScript runtime environment.
Express.js: Web framework for Node.js.
PostgreSQL: Relational database management system.
Axios: Promise-based HTTP client for the browser and Node.js.
CORS: Middleware to enable Cross-Origin Resource Sharing.