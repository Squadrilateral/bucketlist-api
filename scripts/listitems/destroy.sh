#!/bin/bash

API="http://localhost:4741"
URL_PATH="/listitems"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=${TOKEN}"

echo
