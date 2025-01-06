# Node.js 18を使用
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコンテナにコピー
COPY ./package*.json ./

# 依存関係をインストール
RUN npm install