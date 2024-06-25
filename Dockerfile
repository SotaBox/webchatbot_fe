# build stage
FROM node:18.18.1 as build-stage
WORKDIR /app
COPY . .
# RUN yarn && yarn build
COPY package.json yarn.lock ./
# RUN yarn add eslint-plugin-prettier
RUN yarn
COPY . .
RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage
RUN rm -rf /etc/nginx/conf.d/default.conf &&\
    sed -i '/^http {/a\    server_tokens off;' /etc/nginx/nginx.conf
COPY docker/site.conf /etc/nginx/conf.d
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
