FROM node:18 as build

WORKDIR /frontend
COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

