# Test Cases — Automation Exercise

Base URL: `http://automationexercise.com`

---

## TC-01 · Register User

| # | Step | Expected Result |
|---|------|----------------|
| 1 | Launch browser | — |
| 2 | Navigate to the base URL | — |
| 3 | — | Home page is visible successfully |
| 4 | Click **Signup / Login** | — |
| 5 | — | **New User Signup!** is visible |
| 6 | Enter name and email address | — |
| 7 | Click **Signup** | — |
| 8 | — | **ENTER ACCOUNT INFORMATION** is visible |
| 9 | Fill: Title, Name, Email, Password, Date of birth | — |
| 10 | Select checkbox **Sign up for our newsletter!** | — |
| 11 | Select checkbox **Receive special offers from our partners!** | — |
| 12 | Fill: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number | — |
| 13 | Click **Create Account** | — |
| 14 | — | **ACCOUNT CREATED!** is visible |
| 15 | Click **Continue** | — |
| 16 | — | **Logged in as username** is visible |
| 17 | Click **Delete Account** | — |
| 18 | — | **ACCOUNT DELETED!** is visible; click **Continue** |

---

## TC-02 · Login User — correct credentials

| # | Step | Expected Result |
|---|------|----------------|
| 1 | Launch browser | — |
| 2 | Navigate to the base URL | — |
| 3 | — | Home page is visible successfully |
| 4 | Click **Signup / Login** | — |
| 5 | — | **Login to your account** is visible |
| 6 | Enter correct email address and password | — |
| 7 | Click **Login** | — |
| 8 | — | **Logged in as username** is visible |
| 9 | Click **Delete Account** | — |
| 10 | — | **ACCOUNT DELETED!** is visible |

---

## TC-03 · Login User — incorrect credentials

| # | Step | Expected Result |
|---|------|----------------|
| 1 | Launch browser | — |
| 2 | Navigate to the base URL | — |
| 3 | — | Home page is visible successfully |
| 4 | Click **Signup / Login** | — |
| 5 | — | **Login to your account** is visible |
| 6 | Enter incorrect email address and password | — |
| 7 | Click **Login** | — |
| 8 | — | Error **Your email or password is incorrect!** is visible |

---

## TC-04 · Logout User

| # | Step | Expected Result |
|---|------|----------------|
| 1 | Launch browser | — |
| 2 | Navigate to the base URL | — |
| 3 | — | Home page is visible successfully |
| 4 | Click **Signup / Login** | — |
| 5 | — | **Login to your account** is visible |
| 6 | Enter correct email address and password | — |
| 7 | Click **Login** | — |
| 8 | — | **Logged in as username** is visible |
| 9 | Click **Logout** | — |
| 10 | — | User is redirected to the login page |

---

## TC-05 · Register User — existing email

| # | Step | Expected Result |
|---|------|----------------|
| 1 | Launch browser | — |
| 2 | Navigate to the base URL | — |
| 3 | — | Home page is visible successfully |
| 4 | Click **Signup / Login** | — |
| 5 | — | **New User Signup!** is visible |
| 6 | Enter name and an already-registered email address | — |
| 7 | Click **Signup** | — |
| 8 | — | Error **Email Address already exist!** is visible |

---

## TC-08 · Verify All Products and Product Detail Page

| # | Step | Expected Result |
|---|------|----------------|
| 1 | Launch browser | — |
| 2 | Navigate to the base URL | — |
| 3 | — | Home page is visible successfully |
| 4 | Click **Products** | — |
| 5 | — | User is on **ALL PRODUCTS** page; product list is visible |
| 6 | Click **View Product** on the first product | — |
| 7 | — | Product detail page is displayed with: name, category, price, availability, condition, brand |

---

## TC-09 · Search Product

| # | Step | Expected Result |
|---|------|----------------|
| 1 | Launch browser | — |
| 2 | Navigate to the base URL | — |
| 3 | — | Home page is visible successfully |
| 4 | Click **Products** | — |
| 5 | — | User is on **ALL PRODUCTS** page |
| 6 | Type product name in the search input and click **Search** | — |
| 7 | — | **SEARCHED PRODUCTS** heading is visible |
| 8 | — | All products related to the search are displayed |

---

## TC-10 · Verify Subscription in Home Page

| # | Step | Expected Result |
|---|------|----------------|
| 1 | Launch browser | — |
| 2 | Navigate to the base URL | — |
| 3 | — | Home page is visible successfully |
| 4 | Scroll down to footer | — |
| 5 | — | Text **SUBSCRIPTION** is visible |
| 6 | Enter email address and click the arrow button | — |
| 7 | — | Success message **You have been successfully subscribed!** is visible |

---

## TC-15 · Place Order — Register before Checkout

| # | Step | Expected Result |
|---|------|----------------|
| 1 | Launch browser | — |
| 2 | Navigate to the base URL | — |
| 3 | — | Home page is visible successfully |
| 4 | Click **Signup / Login** | — |
| 5 | Fill all Signup details and create account | — |
| 6 | — | **ACCOUNT CREATED!** is visible; click **Continue** |
| 7 | — | **Logged in as username** is visible at top |
| 8 | Add products to cart | — |
| 9 | Click **Cart** | — |
| 10 | — | Cart page is displayed |
| 11 | Click **Proceed To Checkout** | — |
| 12 | — | Address Details and Review Your Order are visible |
| 13 | Enter comment and click **Place Order** | — |
| 14 | Enter payment details: Name on Card, Card Number, CVC, Expiration date | — |
| 15 | Click **Pay and Confirm Order** | — |
| 16 | — | Success message **Your order has been placed successfully!** is visible |
| 17 | Click **Delete Account** | — |
| 18 | — | **ACCOUNT DELETED!** is visible; click **Continue** |

---

## TC-16 · Place Order — Login before Checkout

| # | Step | Expected Result |
|---|------|----------------|
| 1 | Launch browser | — |
| 2 | Navigate to the base URL | — |
| 3 | — | Home page is visible successfully |
| 4 | Click **Signup / Login** | — |
| 5 | Fill email and password and click **Login** | — |
| 6 | — | **Logged in as username** is visible at top |
| 7 | Add products to cart | — |
| 8 | Click **Cart** | — |
| 9 | — | Cart page is displayed |
| 10 | Click **Proceed To Checkout** | — |
| 11 | — | Address Details and Review Your Order are visible |
| 12 | Enter comment and click **Place Order** | — |
| 13 | Enter payment details: Name on Card, Card Number, CVC, Expiration date | — |
| 14 | Click **Pay and Confirm Order** | — |
| 15 | — | Success message **Your order has been placed successfully!** is visible |
| 16 | Click **Delete Account** | — |
| 17 | — | **ACCOUNT DELETED!** is visible; click **Continue** |
