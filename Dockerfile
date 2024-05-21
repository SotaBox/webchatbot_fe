FROM node:18.18.2 as builder

ARG VITE_API_URL
ARG VITE_WS_URL

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install 
COPY . .
RUN yarn build

FROM nginx as runner
COPY --from=builder /app/build/ /usr/share/nginx/html
COPY --from=builder /app/nginx-default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
