FROM node:13.13-alpine

WORKDIR /app

COPY package.json  .

COPY . .

RUN chown -R node:node ./

USER node

EXPOSE 4000

# RUN rm -rf /tmp/*

RUN npm install

CMD npm run dev