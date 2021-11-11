FROM node
CMD [ "npm","start" ]
COPY package*.json .
RUN npm install
EXPOSE 3000
COPY . .
WORKDIR /usr/app