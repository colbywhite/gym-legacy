# Gym Legacy
An open-source web app for tracking progress through your workout programs.
Workout programs are based upon the open-source
[weight-program-schema](https://github.com/colbywhite/weight-program-schema).

## Development
- One-time install of angular CLI: `npm install -g @angular/cli`
- One-time def of Auth0 client id: `export AUTH0_CLIENT_ID=blah`
  - If developing for extended period of time, you'll probably want to define this in your `~/.zshrc` or equivalent.
- For running the app on `localhost:4200`: `npm start`
- For running the app on local IP: `npm serve -- -H ${LOCAL_IP}`
> Macs can surmise their local IPs via `ifconfig |grep inet`

## Tests
- For single run: `npm test`
- For testing in watch mode: `npm run test:watch`
- For end-to-end tests: `npm run e2e`
