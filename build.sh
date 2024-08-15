git pull origin main
pm2 delete BEJ-12-challenge
pm2 start main.js -n BEJ-12-challenge
