#!/bin/sh
cd /opt/api/ms-hikes-query
# echo "Changing api calls url from local to prod/dev domain"
# find ./src -type f -exec sed -i 's/0.0.0.0/<domain-name>/g' {} +
echo "Running ms-hikes-query npm start:prod on port ${PORT}..."
npm run start:prod