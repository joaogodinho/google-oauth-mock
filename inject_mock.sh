#!/bin/bash
set -x

readonly NETWORK="<target network>"
readonly NGINX_CONTAINER="dynamic-framework_nginx_1"
readonly TARGET_CONTAINER="<target container>"
readonly CERT="rootCA.pem"
readonly IP=$(docker inspect --format='{{ (index .NetworkSettings.Networks "'"$NETWORK"'").IPAddress }}' $NGINX_CONTAINER)

# Copy mkcert cert
docker cp "$CERT" "$TARGET_CONTAINER:/usr/local/share/ca-certificates/rootCA.pem"
# Add certificate to chain
docker exec $TARGET_CONTAINER update-ca-certificates
# Inject mock IP in hosts
docker exec $TARGET_CONTAINER bash -c "echo -e \"$IP\toauth2.googleapis.com\n$IP\twww.googleapis.com\n$IP\taccounts.google.com\" >> /etc/hosts"