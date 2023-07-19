FROM redis
 
ENV SENTINEL_QUORUM 2
ENV SENTINEL_DOWN_AFTER 10000
ENV SENTINEL_FAILOVER 10000
 
RUN mkdir -p /redis
 
WORKDIR /redis
 
COPY sentinel.conf .
COPY sentinel-entrypoint.sh /usr/local/bin/
 
RUN chown redis:redis /redis/* && \
    chmod +x /usr/local/bin/sentinel-entrypoint.sh
 
EXPOSE 26379
 
ENTRYPOINT ["sentinel-entrypoint.sh"]