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

# シーダー
seed_1_2:
	docker exec -it cms_backend sh -c \
	"php artisan db:seed --class=Step1_2Seeder --force"

seed_1_3:
	docker exec -it cms_backend sh -c \
	"php artisan db:seed --class=Step1_3Seeder --force"

seed_1_4:
	docker exec -it cms_backend sh -c \
	"php artisan db:seed --class=Step1_4Seeder --force"