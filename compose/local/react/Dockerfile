# Step 1
FROM node:12.19.0


WORKDIR /usr/src/app/twitcord_front/

EXPOSE 3000

RUN npm cache clean --force
RUN npm config set package-lock.json true

# install app dependencies
COPY ./twitcord_front/package*.json /usr/src/app/twitcord_front/

RUN npm install 
RUN npm install react-scripts@4.0.3 

# add app
COPY  ./twitcord_front /usr/src/app/twitcord_front/

COPY ./compose/local/react/entrypoint.sh /usr/src/app/entrypoint.sh

RUN chmod +x ../entrypoint.sh

