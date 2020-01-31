FROM node:12

#Install OC CLI
WORKDIR /tmp
RUN wget https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz \
    && tar xvf openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz \
    && cp ./openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit/oc /usr/local/bin

WORKDIR /  
  
# Install app dependencies  
COPY package.json ./  
RUN npm install  
 
# Copy app contents  
COPY . .  
 
# Expose ports needed 
EXPOSE 8080/tcp
 
# Add environment variables 
#ENV NODE_ENV=${authnode}
#ENV PORT=${authport}
#ENV APPLICATION_PATH=${path}
#ENV NODE_ENV=local
#ENV PORT=5003
#ENV APPLICATION_PATH=./build
  
# Start the app  
CMD [ "npm", "run", "start"]  
# USER node