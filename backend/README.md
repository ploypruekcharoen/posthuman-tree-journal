# Backend Setup

## Prerequisites
- Python 3.x
- pip (Python package installer)

## Configuration
1. Create a `.env` file in the backend directory
2. Add your OpenAI API key to the `.env` file:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## Installation
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Server
Start the backend server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The server will be available at `http://localhost:8000`

## Important Notes
- The `.env` file is ignored by Git to keep your API key private
- Never commit your actual API key to version control
- Make sure to keep your API key secure and not share it with others 