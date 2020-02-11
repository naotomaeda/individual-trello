FROM nginx:alpine
LABEL author="Rafael Kinoshita"
COPY ./dist/individual-trello  /usr/share/nginx/html
COPY ./nginx.config /etc/nginx/conf.d/default.conf
EXPOSE 80 443
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
