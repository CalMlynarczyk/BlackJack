FROM node

# Copy source code
COPY . /app
WORKDIR /app
RUN npm install

CMD ["npm", "run", "start:docker"]
