# Postman Testing Guide

Use Postman to test the authentication and job management endpoints.

## Base URL
`http://localhost:5000`

## 1. Register User
- **Method**: `POST`
- **URL**: `/api/auth/register`
- **Body** (raw JSON):
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Expected Response (201 Created)**: JSON with user info + token.

## 2. Login User
- **Method**: `POST`
- **URL**: `/api/auth/login`
- **Body** (raw JSON):
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Expected Response (200 OK)**: JSON with token.
- **Action**: Copy the `token` from the response.

## 3. Get Current User
- **Method**: `GET`
- **URL**: `/api/auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Expected Response (200 OK)**: User profile JSON.

---

## 4. Create Job
- **Method**: `POST`
- **URL**: `/api/jobs`
- **Headers**: `Authorization: Bearer <token>`
- **Body** (raw JSON):
  ```json
  {
    "company": "Google",
    "role": "Frontend Developer",
    "status": "Applied",
    "location": "Remote",
    "jobUrl": "https://careers.google.com/jobs/results/123",
    "notes": "Referral from Alice"
  }
  ```
- **Expected Response (201 Created)**: Created job object.

## 5. Get All Jobs (Basic)
- **Method**: `GET`
- **URL**: `/api/jobs`
- **Headers**: `Authorization: Bearer <token>`
- **Expected Response (200 OK)**:
  ```json
  {
      "jobs": [...],
      "page": 1,
      "limit": 10,
      "totalJobs": 1,
      "totalPages": 1
  }
  ```

## 6. Advanced Querying
- **Headers**: `Authorization: Bearer <token>`
- **Filter by Status**:
  `GET /api/jobs?status=Interview`
- **Search (Company/Role)**:
  `GET /api/jobs?search=google`
- **Sort (Oldest Applied First)**:
  `GET /api/jobs?sort=appliedDate_asc`
- **Pagination**:
  `GET /api/jobs?page=1&limit=5`

## 7. Update Job
- **Method**: `PUT`
- **URL**: `/api/jobs/<job_id>`
- **Headers**: `Authorization: Bearer <token>`
- **Body** (raw JSON):
  ```json
  {
    "status": "Interview"
  }
  ```
- **Expected Response (200 OK)**: Updated job object.

## 8. Delete Job
- **Method**: `DELETE`
- **URL**: `/api/jobs/<job_id>`
- **Headers**: `Authorization: Bearer <token>`
- **Expected Response (200 OK)**: `{"id": "<job_id>"}`
