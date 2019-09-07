# build frontend
FROM node:10 as frontend
COPY . /kankei_web/

WORKDIR /kankei_web/frontend
RUN npm i
RUN npm run build

## build backend
FROM python:3.7

ENV KANKEI_WEB_SETTINGS  ./src/settings/prod.py

COPY --from=frontend /kankei_web/ /kankei_web/

WORKDIR /kankei_web/backend
RUN pip install --trusted-host pypi.python.org -r ./requirements.txt
EXPOSE 5000
#CMD ["python", "src/server.py"]

