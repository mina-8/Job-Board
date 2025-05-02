
# Career Jobs API

This is a simple API built with **Laravel** that allows users to manage job listings. The API supports the following functionalities:

- Viewing the list of jobs.
- Creating new job listings.
- Filtering and searching job listings based on various criteria.
  
## Features

### Endpoints:

1. **GET /api/jobs**
   - Retrieves a list of all available jobs, sorted by the most recently created.
   - Response:
     ```json
     [
       {
         "id": 1,
         "title": "Software Developer",
         "description": "Developing web applications",
         "location": "Cairo",
         "salary": 5000,
         "type": "full-time",
         "created_at": "2025-05-03T10:00:00",
         "updated_at": "2025-05-03T10:00:00"
       },
       ...
     ]
     ```

2. **POST /api/jobs**
   - Creates a new job listing.
   - Request Body:
     ```json
     {
       "title": "Web Developer",
       "description": "Building websites and web applications",
       "location": "Alexandria",
       "salary": 4000,
       "type": "part-time"
     }
     ```
   - Response:
     ```json
     {
       "success": true,
       "message": "create success"
     }
     ```

3. **GET /api/filters**
   - Filters jobs based on various criteria such as location, job type, and salary range.
   - Example request: `/api/filters?locations[]=Cairo&types[]=full-time&salary_ranges[]=0-30k`
   - Response:
     ```json
     {
       "success": true,
       "message": "Jobs retrieved successfully",
       "data": [
         {
           "id": 1,
           "title": "Software Developer",
           "location": "Cairo",
           "salary": 5000,
           "type": "full-time",
           "created_at": "2025-05-03T10:00:00",
           "updated_at": "2025-05-03T10:00:00"
         },
         ...
       ]
     }
     ```

4. **GET /api/searchjobs**
   - Searches for jobs by job title and location.
   - Example request: `/api/searchjobs?job=developer&location=Cairo`
   - Response:
     ```json
     [
       {
         "id": 1,
         "title": "Web Developer",
         "location": "Cairo",
         "salary": 5000,
         "type": "full-time",
         "created_at": "2025-05-03T10:00:00",
         "updated_at": "2025-05-03T10:00:00"
       },
       ...
     ]
     ```

### Error Handling:
- If validation fails for a request (e.g., missing required fields), the API will return a 400 response with an error message.
- In case of a server error, the API returns a 500 status code with an error message.

### Example Error Response:
```json
{
  "success": false,
  "message": {
    "title": ["The title field is required."],
    "description": ["The description field is required."]
  }
}
```

### Validation Rules:
- **POST /api/jobs**:
  - `title` (required): A string, maximum length 255 characters.
  - `description` (required): A string.
  - `location` (required): A string, maximum length 255 characters.
  - `salary` (required): An integer greater than or equal to 0.
  - `type` (required): Must be one of `full-time`, `part-time`, or `temporary`.

### Technology Stack:
- **Laravel**: PHP framework for backend API development.
- **MySQL**: For storing job listings data.

### Installation:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/career-jobs-api.git
   ```

2. Navigate to the project directory:
   ```bash
   cd career-jobs-api
   ```

3. Install dependencies:
   ```bash
   composer install
   ```

4. Set up your `.env` file by duplicating `.env.example` and modifying the database credentials:
   ```bash
   cp .env.example .env
   ```

5. Run migrations to set up the database:
   ```bash
   php artisan migrate
   ```

6. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

7. The API will be accessible at `http://localhost:8000/api/`.
