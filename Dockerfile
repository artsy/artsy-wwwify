FROM node:12.18.4-alpine

# Set up dumb-init
RUN apk --no-cache --quiet add \
    git \
    dumb-init \
    && adduser --disabled-password --gecos '' deploy

WORKDIR /app
RUN chown deploy:deploy $(pwd)

# Switch to deploy user
USER deploy
ENV USER deploy
ENV HOME /home/deploy

COPY --chown=deploy:deploy package.json yarn.lock ./

# Set up node_modules
RUN yarn install --frozen-lockfile --no-cache

# Set up /app for deploy user
COPY --chown=deploy:deploy . /app

ENV PORT 3000
EXPOSE 3000

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["yarn", "start"]
