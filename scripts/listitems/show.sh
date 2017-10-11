#!/bin/sh

API="http://localhost:4741"
URL_PATH="/listitems"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo
