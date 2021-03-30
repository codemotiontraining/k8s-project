cat /env.js | envsubst > /usr/share/nginx/html/env.js
echo "🚀 starting nginx"
exec nginx -g 'daemon off;'
