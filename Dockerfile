FROM node:22

RUN apt-get update && apt-get install -y python3 build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies 
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

RUN npm run build