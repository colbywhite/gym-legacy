# Gym Legacy Backend
The lambda-powered backend for Gym Legacy

## Development
- One-time install of angular CLI: `npm install -g serverless`
- One-time def of Auth0 client id: `export AUTH0_BACKEND_CLIENT_ID=blah`
  - If developing for extended period of time, you'll probably want to define this in your `~/.zshrc` or equivalent.
- For deploying to a dev stage of lambdas: `npm run deploy`
- For deploying to a prod stage of lambdas: `npm run deploy -- -s prod`

## Tests
TODO
