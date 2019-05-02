Mockup server for oauth and googleapis, only fakes `userinfo`

# Setup

Generate a `rootCA.pem` using `mkcert` for the domains: `accounts.google.com`, `www.googleapis.com`, `oauth2.googleapis.com`. Place the certs in `nginx/etc/nginx/certs`.

Create the `.env` file with the following:

```
NETWORK=<network to inject>
DOMAIN=<domain to fake>
NGINX_CONTAINER=<nginx container name>
TARGET_CONTAINER=<container to inject /etc/hosts in>
```

After `up`ing run `inject_mock.sh`
