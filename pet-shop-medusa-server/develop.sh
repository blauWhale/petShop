#!/bin/bash

#Run migrations to ensure the database is updated
medusa migrations run

#Start development environment
medusa develop

#Add admin user
medusa user -e raphaelblaauw24@gmail.com -p admin
