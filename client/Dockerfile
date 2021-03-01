FROM node:14.15 as builder
WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn install
COPY ./ ./
RUN yarn build

FROM nginx:stable-alpine
COPY --from=builder /build/build /usr/share/nginx/html