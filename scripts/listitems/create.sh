#!/bin/bash

API="http://localhost:4741"
URL_PATH="/listitems"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "listitem": {
      "name": "'"${NAME}"'",
      "location": "'"${LOCATION}"'",
      "category": "'"${CATEGORY}"'",
      "rating": "'"${RATING}"'"
    }
  }'

echo
