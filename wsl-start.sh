#!/bin/bash
docker stop zz-blog
docker run \
-d \
--name zz-blog \
-p 80:80 \
-v /mnt/e/github/zz-blog/docs/.vuepress/dist:/usr/share/nginx/html:ro \
a.newegg.org/newegg-docker/nginx