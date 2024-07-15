# KidSafe Content Checker[Node]

## Summary
The KidSafe Content Checker is an AI-powered tool designed to evaluate Text, Image, and Video content to determine if they contain potentially dangerous content for children.

Leveraging OpenAI’s natural language processing capabilities, the tool analyzes the given input and returns a simple “Yes” or “No” response, indicating whether the content is suitable for kids.

Additionally, it provides a brief explanation for its decision, highlighting specific elements that may be deemed inappropriate or harmful.

## Set Up Project Environment
### 1. Set Up a Virtual Environment
`npm install`

### 3. Run Project
`npm start`

## API Specification
### 1. Text Checker Endpoints
**Endpoints:** `/api/kidsafe/text`

**Method:** `POST`

**Content-Type:** `application/json`

**Body Parameters:** 

`text`: The text to be analyzed.

**Status Code:**
`200 OK`, `400 Bad Request`, `500 Internal Server Error`

### 2. Image Checker Endpoints
**Endpoints:** `/api/kidsafe/image`

**Method:** `POST`

**Content-Type:** `application/json`

**Body Parameters:** 

`image_url`: The text to be analyzed.

**Status Code:**
`200 OK`, `400 Bad Request`, `500 Internal Server Error`

### 3. Video Checker Endpoints
**Endpoints:** `/api/kidsafe/video`

**Method:** `POST`

**Content-Type:** `application/json`

**Body Parameters:** 

`video_url`: The text to be analyzed.

**Status Code:**
`200 OK`, `400 Bad Request`, `500 Internal Server Error`
