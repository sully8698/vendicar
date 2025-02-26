docker compose up --build -d

sleep 8
docker exec vendicar-api-1 python /src/manage.py makemigrations
sleep 3
docker exec vendicar-api-1 python /src/manage.py migrate
