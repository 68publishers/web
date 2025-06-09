NGINX_DOMAIN_NAME := "68publishers.local"
COMPOSE_ENV := "local" # "local" or "stage"
CERTBOT_EMAIL := "info@68publishers.io"

ifneq (,$(wildcard ./.env.dist))
	include .env.dist
	export
endif

ifneq (,$(wildcard ./.env))
	include .env
	export
endif

start:
	docker compose up -d
	@echo "\033[1;92mvisit https://www.${NGINX_DOMAIN_NAME}\033[0m"

stop:
	docker compose stop

down:
	docker compose down

restart:
	make stop
	make start

mkcert:
	@if [ "stage" = "${COMPOSE_ENV}" ]; then \
		docker run -it --rm --name certbot \
			-v ./docker/nginx/certs:/etc/letsencrypt \
			-v ./docker/certbot/www:/var/www/certbot \
			-v ./docker/certbot/secrets:/.secrets \
			certbot/dns-digitalocean certonly \
			--dns-digitalocean \
			--dns-digitalocean-credentials /.secrets/digitalocean.ini \
			--dns-digitalocean-propagation-seconds 60 \
			--cert-name "${NGINX_DOMAIN_NAME}" \
			-d "${NGINX_DOMAIN_NAME}" -d "www.${NGINX_DOMAIN_NAME}" \
			--text --agree-tos --email "${CERTBOT_EMAIL}" --rsa-key-size 4096 --verbose; \
	else \
		cd ./docker/nginx/certs && mkdir -p "live/${NGINX_DOMAIN_NAME}" && cd "./live/${NGINX_DOMAIN_NAME}" && mkcert -key-file privkey.pem -cert-file fullchain.pem ${NGINX_DOMAIN_NAME} "www.${NGINX_DOMAIN_NAME}"; \
	fi
	@echo "certificates successfully created"

# Stage only
certs-renew:
	@if [ "stage" != "${COMPOSE_ENV}" ]; then \
  		echo "\033[1;91mError: The command certs-renew can be called in the stage environment only.\033[0m"; \
  		exit 1; \
  	fi
	@docker run -it --rm --name certbot \
		-v ./docker/nginx/certs:/etc/letsencrypt \
		-v ./docker/certbot/www:/var/www/certbot \
		-v ./docker/certbot/secrets:/.secrets \
		-v ./docker/certbot/renew:/renew-hook \
		certbot/dns-digitalocean renew \
		--post-hook "touch /renew-hook/renewed.txt";
	@make certs-renew.post-hook

certs-renew.post-hook:
ifneq (,$(wildcard ./docker/certbot/renew/renewed.txt))
	@rm ./docker/certbot/renew/renewed.txt
	@docker exec -it web-nginx nginx -s reload
	@echo "\033[0;34mNginx reloaded\033[0m"
endif

cache-clear:
	docker exec -it web-app rm -rf var/cache/*
	docker exec -it web-app rm -rf var/log/*

install:
	make cache-clear
	make install-composer

install-composer:
	docker exec -it web-app composer install --no-interaction --no-ansi --prefer-dist --no-progress --optimize-autoloader

init-with-certs:
	@echo "\033[1;94mDo you want to setup the application on a domain ${NGINX_DOMAIN_NAME} with \"${COMPOSE_ENV}\" environment? [y/n]\033[0m"
	@read line; if [ $$line != "y" ]; then echo "aborting"; exit 1 ; fi
	@if [ "stage" != "${COMPOSE_ENV}" ]; then \
		make mkcert; \
		make init; \
	else \
	  	NGINX_TEMPLATE_DIR=/etc/nginx/templates/nossl docker compose stop; \
	  	NGINX_TEMPLATE_DIR=/etc/nginx/templates/nossl docker compose up -d; \
	  	make install; \
	  	make mkcert; \
	  	NGINX_TEMPLATE_DIR=/etc/nginx/templates/nossl docker compose stop; \
	  	make init; \
	fi

init:
	make stop
	make start
	make install

tests:
	@echo "not implemented" >&2

qa:
	@echo "not implemented" >&2

stan:
	docker exec -it web-app vendor/bin/phpstan analyse

cs:
	docker exec -it web-app vendor/bin/php-cs-fixer fix -v

coverage:
	@echo "not implemented" >&2
