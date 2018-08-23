FROM registry-vpc.cn-hangzhou.aliyuncs.com/bjmaster/enterprise
ENV NODE_ENV=production
USER root
RUN ln -sf /usr/share/zoneinfo/Asia/Hong_Kong /etc/localtime
RUN mkdir /app
ADD ./ /app
RUN cd /app && npm install
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY redis.conf /etc/redis/redis.conf
RUN mkdir /log
CMD ["/usr/bin/supervisord"]