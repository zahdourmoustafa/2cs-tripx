#!/bin/sh
cd /app

echo "Starting registry on ${PORT}..."

export TERM=xterm

if [ "$ENVIRONMENT" = "development" ]; then
    echo "Running registry in dev mode"

    mvn spring-boot:run -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005" &
    while true; do
    inotifywait -e modify,create,delete,move -r ./src/ && mvn compile
    done
else
    echo "Running registry in prod mode"
    mvn spring-boot:run
fi