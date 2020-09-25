# Multi-Stage Build for our NodeJS App
# Stage 1:
FROM node:12.18.4-alpine AS builder
WORKDIR /usr/src/app
ENV NODE_ENV='production'
COPY . .
# Build react app
RUN cd client && yarn install && \
	yarn build
RUN npm install
RUN npm run build

# Build Stage 2
FROM node:12.18.4-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
COPY --from=builder /usr/src/app/client/build ./client/build
COPY --from=builder /usr/src/app/dist ./dist
ENV NODE_ENV='production'
EXPOSE 4002
CMD npm start