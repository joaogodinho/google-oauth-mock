Mockup server for oauth and googleapis, only fakes `userinfo`

# Setup

Generate a `rootCA.pem` using `mkcert` for the domains: `accounts.google.com`, `www.googleapis.com`, `oauth2.googleapis.com`. Place the certs in `nginx/etc/nginx/certs`.

Replace every `<domain>` reference in the JS src

Set network and container to inject the proxy (`inject_mock.sh` file) as well as `.env` file with network

Set the `azp` and `aud` if needed in the JS src
