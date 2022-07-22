FROM node:14.17.4

WORKDIR /node_salt_jwt_all

COPY ./package.json ./

RUN npm install

#COPY entrypoint.sh .
COPY app.js .

RUN chmod +x /node_salt_jwt_all/app.js

COPY  . .

EXPOSE 3001

ENTRYPOINT [ "node", "app.js" ]


#ensure docker is running first, then
#RUN ~ docker build -t node_salt_jwt_all-app . 