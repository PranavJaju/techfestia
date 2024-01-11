FROM node:16-alpine3.14 as builder
WORKDIR /usr/src/app
COPY . .
RUN
# ENTRYPOINT ["npm", "run", "dev"]
