const debug = require('debug')('goauth');
const express = require('express');
const app = express();
const port = 3000;

const DOMAIN = process.env.DOMAIN;
var CLIENT_ID;

app.get('/', (req, res) => res.send('Hello I\'m a fake google!'))

// Redirect user to received URI with state
app.get('/o/oauth2/auth', (req, res) => {
  debug('Got Oauth Request');

  let requestTime = Math.floor(Date.now() / 1000);
  let code = `gmock_${requestTime}`;

  let redirectUri = req.query.redirect_uri,
      state = req.query.state,
      scope = req.query.scope;
  let redirectFinal = `${redirectUri}?state=${state}&scope=${scope}&code=${code}`

  CLIENT_ID = req.query.client_id;
  debug(`Redirecting to: ${redirectFinal}`);
  res.redirect(redirectFinal);
});

// Validate the code, return the token
app.post('/token', (req, res) => {
  debug('Got Token Request');

  let id_token = {
    'iss': 'https://accounts.google.com',
    'azp': `${CLIENT_ID}`,
    'aud': `${CLIENT_ID}`,
    'sub': '0',
    'hd': `${DOMAIN}`,
    'email': `john.doe@${DOMAIN}`,
    'email_verified': true,
    'at_hash': '',
    'name': 'John Doe',
    'given_name': 'John',
    'family_name': 'Doe',
    'locale': 'en',
    'iat': Math.floor(Date.now() / 1000),
    'exp': Math.floor(Date.now() / 1000 + 3600)
  }

  let fakeToken = {
    'access_token': 'fake_access_token',
    'expires_in': 3600,
    'scope': 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    'token_type': 'Bearer',
    'id_token': `eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2ZmM0Y2QyM2QzODdjYmM0OTBmNjBkYjU0YTk0YTZkZDE2NTM5OTgiLCJ0eXAiOiJKV1QifQ.${Buffer.from(JSON.stringify(id_token)).toString('base64')}.MmesRidSSQrnPT2kk2iOuMaZO8KOM0dbykHdfPbk5MmZ48hJwNPjOWtRkgEm2Opv28B1m4qwRAoZ3TIa08oICqswpRIKuHk_CYglBsdj5d490k8QpLXM87z2cm6E91G3aJ-KnbJoPdsxYV_WhTSDOUIt3kW7EYOIWqrNvKJtMD65SrKQeifCOf9lJtZz1Ku61L_Eo0te1Kv03wrdclLTP6LmAxUYNsN3HUKZIaVSF0SEJKPLSZU4Sq4pOWoSgHU0qYXDfCPsHkp_Z8syoLZniNsmg8CuXaNVMDIaUALw5KRN2XxEk6vRJMjbVGuBi2yCjhGZDyCfoIskfECQP2Pvdg`
  }

  debug('Sending:');
  debug(fakeToken);
  res.send(fakeToken);
});

// userinfo
app.get('/oauth2/v3/userinfo', (req, res) => {
  debug('Got userinfo Request');

  let fakeUserInfo = {
    'family_name': 'Doe', 
    'sub': '0', 
    'locale': 'en', 
    'email_verified': true, 
    'given_name': 'John', 
    'email': `john.doe@${DOMAIN}`, 
    'hd': `${DOMAIN}`,
    'name': 'John Doe'
  }

  debug('Sending:');
  debug(fakeUserInfo);
  res.send(fakeUserInfo);
});

app.all('*', (req, res) => {
  debug(req);
  res.send('');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
