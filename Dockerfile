FROM debian:buster AS builder

RUN apt-get update \
    && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_15.x | bash - \
    && apt-get install -y nodejs gcc g++ make \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p /app/

COPY package.json package-lock.json /app/

WORKDIR /app

RUN npm ci

COPY . /app/

RUN npm run build

FROM nginx:1.19

COPY ./docker/nginx/server.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html/

EXPOSE 80
