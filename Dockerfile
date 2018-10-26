FROM node

# Copy source code
COPY . /app
WORKDIR /app
RUN yarn

CMD ["yarn", "start:docker"]
