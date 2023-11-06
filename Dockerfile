FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY client/moengage/package*.json client/
RUN npm install --prefix client --omit=dev

COPY server/package*.json server/
RUN npm install --prefix server --omit=dev

COPY client/moengage client/
RUN npm run build --prefix client

COPY server/ server/



USER node

CMD [ "npm","start","--prefix","server" ]

EXPOSE 8000