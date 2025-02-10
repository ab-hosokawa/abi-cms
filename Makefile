.PHONY: init run down clear

# 初回
init:
	docker compose build

# 起動
run:
	docker compose up -d
	docker exec -it cms_backend sh -c \
	"php artisan migrate"

# 停止
down:
	docker compose down

# キャッシュクリア
clear:
	docker exec -it cms_backend sh -c \
	"php artisan optimize:clear"