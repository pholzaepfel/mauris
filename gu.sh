#!/bin/bash
git add .
git commit -a
git push
ssh -i ../test.pem ubuntu@54.184.112.236 'cd mauris;git pull'
