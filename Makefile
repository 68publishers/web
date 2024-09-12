start:
	docker compose up -d
	@echo "Visit http://localhost"

stop:
	docker compose stop

down:
	docker compose down

restart:
	make stop
	make start

cache-clear:
	docker exec -it web rm -rf var/cache/*
	docker exec -it web rm -rf var/log/*

install:
	make cache-clear
	make install-composer

install-composer:
	docker exec -it web composer install --no-interaction --no-ansi --prefer-dist --no-progress --optimize-autoloader

init:
	make stop
	make start
	make install

tests:
	@echo "not implemented" >&2

qa:
	@echo "not implemented" >&2

stan:
	docker exec -it web vendor/bin/phpstan analyse

cs:
	docker exec -it web vendor/bin/php-cs-fixer fix -v

coverage:
	@echo "not implemented" >&2
