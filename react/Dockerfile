FROM node:alpine
 
WORKDIR /usr/src/app

COPY . .

RUN npm install --legacy-peer-deps

EXPOSE 5173

CMD ["npm", "run", "dev"]