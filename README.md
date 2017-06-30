# Gym Legacy
An open-source web app for tracking progress through your workout programs.
Workout programs are based upon the open-source
[weight-program-schema](https://github.com/colbywhite/weight-program-schema).

## Development
- One-time install of angular CLI: `npm install -g @angular/cli`
- For running the app on `localhost:4200`: `npm start`
- For running the app on local IP: `ng serve -H ${LOCAL_IP}`
> Macs can surmise their local IPs via `ifconfig |grep inet`

## Tests
- For single run: `npm test`
- For testing in watch mode: `ng test -w`
- For end-to-end tests: `npm run e2e`
