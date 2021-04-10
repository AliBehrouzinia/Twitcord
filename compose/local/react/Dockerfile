# Step 1
FROM node:alpine

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY --chown=node:node ./twitcord_front/package.json ./
COPY --chown=node:node ./twitcord_front/package-lock.json ./

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g

# add app
COPY --chown=node:node ./twitcord_front ./

USER node

# start app
CMD ["npm", "start"]
