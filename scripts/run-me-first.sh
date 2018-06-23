echo 1048576 > /proc/sys/fs/inotify/max_user_watches
echo fs.inotify.max_user_watches=1048576 >> /etc/sysctl.conf


apt-get -y install gcc g++ make nginx
curl -sL https://deb.nodesource.com/setup_6.x |bash
apt-get update
apt-get install -y nodejs
npm install live-server -g
npm install mysql -g
npm install @types/mysql -g
service nginx stop
cp -f nginx-sites-available-default /etc/nginx/sites-available/default
cp -f nodeserver.service /etc/systemd/system/nodeserver.service
cp -f scripts/30-nodejs-ap1.conf /etc/rsyslog.d/30-nodejs-ap1.conf
systemctl enable nodeserver.service
cd ../
npm install
node_modules/.bin/webpack







