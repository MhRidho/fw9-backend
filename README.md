# Node JS | Savings App

## About

A backend program for savings app application

## How to Use This Project Locally

1. Download this project or you can type git clone https://github.com/MhRidho/fw9-backend
2. Import dump-postgres-202209212034.sql to your local computer
3. Create .env file and fill the data which written in .env.example
4. Install required package with command npm i
5. Run the app with npm run dev

## Endpoints

| url | Method | Description |
| :---: | :---: | :---: |
| auth/register | POST | Register user in application |
| auth/createPin | POST | Create pin user in application |
| auth/login | POST | Login user in application |
| auth/topup | POST | Top Up user in application |
| auth/transfer | POST | Transfer to other in application |
| auth/transfer | POST | Transfer user in application |
| auth/historyTransactions | GET | Get a list of transaction data |
| auth/profile | PATCH | Edit Profile in application |
| auth/changePassword | PATCH | Edit Password in application |
| auth/changePin | PATCH | Edit Pin in application |
| auth/phone | PATCH | Edit Phone in application |

## License

**Muhammad Ridho**