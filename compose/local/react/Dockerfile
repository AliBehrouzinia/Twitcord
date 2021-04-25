# Step 1
FROM node:12.19.0


WORKDIR /usr/src/app/twitcord_front/

EXPOSE 3000

# install app dependencies
COPY ./twitcord_front/ /usr/src/app/twitcord_front/

RUN npm ci
RUN npm ci react-scripts@4.0.3

# add app
COPY  ./twitcord_front /usr/src/app/twitcord_front/

COPY ./compose/local/react/entrypoint.sh /usr/src/app/entrypoint.sh

RUN chmod +x ../entrypoint.sh

