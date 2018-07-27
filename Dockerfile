FROM node:8

COPY package*.json ./

RUN rm -rf /node_modules/ /build/

RUN npm install -g ganache-cli

RUN ganache-cli -p 7545

RUN npm install

RUN truffle migrate --reset

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
