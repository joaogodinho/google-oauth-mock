#!/bin/bash
set -xe

source .env
readonly CERT="$(mkcert -CAROOT)/rootCA.pem"
readonly IP=$(docker inspect --format='{{ (index .NetworkSettings.Networks "'"$NETWORK"'").IPAddress }}' $NGINX_CONTAINER)

# Copy mkcert cert
docker cp "$CERT" "$TARGET_CONTAINER:/usr/local/share/ca-certificates/rootCA.pem"
# Add certificate to chain
docker exec $TARGET_CONTAINER update-ca-certificates
# Inject mock IP in hosts
docker exec $TARGET_CONTAINER bash -c "cat >> /etc/hosts << EOF
$IP    oauth2.googleapis.com
$IP    www.googleapis.com
$IP    accounts.googleapis.com
EOF"
