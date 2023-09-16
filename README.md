# Laravel Project Setup Guide

This guide will help you set up and run the Laravel project locally on your machine. We'll also cover some GitHub tips and tricks for collaborating on this project.

## Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- [PHP](https://www.php.net/downloads.php) (Laravel requires PHP >= 7.4)
- [Composer](https://getcomposer.org/download/)
- [MySQL](https://dev.mysql.com/downloads/) or another database of your choice
- [Git](https://git-scm.com/downloads)
- [Laravel CLI](https://laravel.com/docs/8.x#installation)

## Installation

## Clone the repository to your local machine:
   - git clone https://github.com/ELHATTABIHamza/url-shortener.git

## Navigate to the Laravel project directory:
- cd <laravel_project_directory>

## Install project dependencies using Composer:
- composer install

## Create a copy of the .env.example file and rename it to .env. Update the .env file with your database configuration.
- cp .env.example .env

## Generate a new application key:
- php artisan key:generate

## Run database migrations:
- php artisan migrate

## Start the development server:
- php artisan serve

## The application will be accessible in your web browser at http://localhost:8000.
