FROM debian:buster AS builder

RUN apt-get update \
    && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_15.x | bash - \
    && apt-get install -y nodejs gcc g++ make \
    && curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarnkey.gpg >/dev/null \
    && echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install yarn \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p /app/

COPY package.json yarn.lock /app/

WORKDIR /app

RUN yarn install

COPY . /app/

RUN yarn build

FROM nginx:1.19

COPY ./docker/nginx/server.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html/

EXPOSE 80
