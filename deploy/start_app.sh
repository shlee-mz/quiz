#!/bin/bash
cd /home/ec2-user/webapps/quiz && pm2 serve --name quiz-app build 3000
