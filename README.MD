docker compose up --build -d

# backend
docker exec -it cms_backend bash 

composer install --no-dev --optimize-autoloader
php artisan migrate --force
chmod -R 777 storage bootstrap/cache

# website
cd website
npm install
npm run dev

# メモ
laravel11はapi.phpがないため手動で作成する必要がある
php artisan install:api

/.envと/backend/src/.envはgitに含まれないので手動でコピー

Reactのインストール
npm create vite@latest
react
JavaScript

next.jsのインストール
npx create-next-app@latest
✔ Would you like to use TypeScript? … No
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like your code inside a `src/` directory? … No
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to use Turbopack for `next dev`? … No
✔ Would you like to customize the import alias (`@/*` by default)? … No


APIのURLは定数（API_URL）を使用
例）
const apiUrl = process.env.API_URL;

async function fetchData() {
  const response = await fetch(`${apiUrl}/api/data`);
  const data = await response.json();
  return data;
}