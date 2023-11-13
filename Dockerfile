FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY client/moengage/package*.json client/moengage/
RUN npm run install-c   --omit=dev

COPY server/package*.json server/
RUN npm run install-s --omit=dev

COPY client/moengage client/moengage/
RUN npm run build --prefix client/moengage/
COPY client/ client/
COPY server/ server/



USER node

CMD [ "npm","start","--prefix","server" ]

EXPOSE 8000