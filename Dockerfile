FROM node:argon

# Set environment variables

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Install forever
RUN npm install -g forever

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD [ "forever" , "app.js" ]