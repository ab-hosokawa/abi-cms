FROM mysql:8.0

# my.cnfをコピー
COPY my.cnf /etc/mysql/my.cnf

# 初期データベースやユーザーを設定
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=laravel
ENV MYSQL_USER=laraveluser
ENV MYSQL_PASSWORD=laravelpass
