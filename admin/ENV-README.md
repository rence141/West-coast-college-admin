# Environment Configuration

## Development
- Use `.env.development` for local development
- API URL: `http://localhost:3001`

## Production  
- Use `.env.production` for production deployment
- API URL: `https://west-coast-college-admin.onrender.com`

## Current Setup
- `.env` file is currently set to development
- Copy appropriate file to `.env` when switching environments

## Switching Environments
```bash
# For development
cp .env.development .env

# For production
cp .env.production .env
```
