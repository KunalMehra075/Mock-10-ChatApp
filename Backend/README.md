# Food Delivery App 🥗 :-

## Welcome To the Food Delivery App.

- This is a Mock-8 Backend Project which was designed for Practicing API Designing and making a full NEM (Node.s Express MongoDB) Project.

## Features

- This Is A Food Delivery App where users can login and signup and will recieve appropriate responses.
- Users can get a list of all the restaurants available
- Users with appropriate credentials can add a restaurant.
- Users with appropriate credentials can Add items to the menu of a particular restaurant.
- Users with appropriate credentials can Delete items from the menu of a particular restaurant.
- Users can place an order for items in the restaurant.
- Users can edit the order for items in the restaurant.

## Overview Of All the Routes :-

| METHOD | ENDPOINT                        | WHAT THE ENDPOINT DOES                                                                                                                | STATUS CODE |
| ------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| POST   | /api/register                   | This endpoint allows users to register. It Hashes the password while storing on Database.                                             | 201         |
| POST   | /api/login                      | This endpoint allows users to login. It returns JWT token on login.                                                                   | 201         |
| PATCH  | /api/user/:id/reset             | This endpoint allows users to reset the password, identified by user id, providing the current password and new password in the body. | 204         |
| GET    | /api/restaurants                | This endpoint returns a list of all available restaurants.                                                                            | 200         |
| POST   | /api/restaurants                | This endpoint post a new restaurant                                                                                                   | 200         |
| GET    | /api/restaurants/:id            | This endpoint returns the details of a specific restaurant identified by its ID.                                                      | 200         |
| GET    | /api/restaurants/:id/menu       | This endpoint returns the menu of a specific restaurant identified by its ID.                                                         | 200         |
| POST   | /api/restaurants/:id/menu       | This endpoint allows the user to add a new item to a specific restaurants menu identified by it id.                                   | 201         |
| DELETE | /api/restaurants/:rid/menu/:mid | This endpoint allows the user to delete a particular menu item identified by its id from a specific restaurant.                       | 202         |
| POST   | /api/orders                     | This endpoint allows the user to place an order.                                                                                      | 201         |
| GET    | /api/orders/:id                 | This endpoint returns the details of a specific order identified by its ID.                                                           | 200         |
| PATCH  | /api/orders/:id                 | This endpoint allows users to update the status of a specific order identified by its ID.                                             | 204         |

## Detailed Explanation of the Routes :-

### POST /api/register

- This endpoint allows users to register. It Hashes the password while storing on Database.
- It requires User Details in a form of json object in request.body
- Sample User Detail Object -

```
 {
    "name": "Kunal Mehra",
    "email": "k@gmail.com",
    "password": "kunal143",
    "address": {
        "street": "Ranjhi",
        "city": "Jabalpur",
        "state": "MP",
        "country": "India",
        "zip": "482005"
     }
 }

```

- If user already exists it returns `{ Message: "You Have Already Registered, Please Login", success: false, exist: true }`
- If signup is succesfull it returns `{ Message: "Signup Successful", success: true, exist: false, instance }`
- Else it returns the appropriate error message

---

### POST /api/login

- This endpoint allows users to login. It returns JWT token on login.
- It requires Email and Password in req.body
- Sample Object :-

```
 {
    "email": "k@gmail.com",
    "password": "kunal143",
 }

```

- If the User Doesnt exists it returns ` { Message: "You are not registered with Us, Please Signup", success: false, exist: false }`
- If Login Is Successful it returns the UserInfo And A Token " `{ Message: "Login Successful", token, success: true, exist: true, user }`
- If the Password is wrong `{ Message: "Wrong Credentials", success: false, exist: true }`
- In else cases it will return appropriate Error messages

---

### PATCH /api/user/:id/reset

- This endpoint allows users to reset the password, identified by user id, providing the current password and new password in the body.
- The User needs to give the currentpassword and newpassword in req.body
- In the url params it requires the User ID for which the password has to be changed
- It also requires the Authorization token in the Headers.
- Sample Object :-

```
 {
    "currpass": "kunal1234",
    "newpass": "Kunal@13456",
 }

```

---

### GET /api/restaurants/:id

- It requires the restaurant id in url parameters
- It returns the particular restaurant with this restaurant id

---

### GET /api/restaurants/:id/menu

- It returns the menu of that particular restaurant

---

### POST /api/restaurants

- This endpoint allows the user to Post a new Restaurant
- It also requires the Authorization token in the Headers.
- Sample Restaurant

```
{
  "name": "Halwai Restaurant",
  "address": {
    "street": "Sadar",
    "city": "Jabalpur",
    "state": "MP",
    "country": "India",
    "zip": "482005"
  },
  "menu": [{
    "name": "Tawa Roti",
    "description": "Tasty Tawa Roti",
    "price": 60,
    "image": "abcd"
  },{
    "name": "Malai Roti",
    "description": "Tasty Malai",
    "price": 70,
    "image": "abcd"
  }]
}

```

- It returns the Message, New Restaurant has been posted
- It also returns And The Restaurant object

---

### POST /api/restaurants/:id/menu

- This endpoint allows the user to add a new item to a specific restaurants menu identified by it id.
- It requires the Restaurant ID in the url Params.
- Sample Req.body object
- It also requires the Authorization token in the Headers.

```
{
  "name": "Shawrma",
  "description": "Tasty Shwarma ",
  "price": 60,
  "image": "abcd"
}

```

- It returns `{ Message: "New Item Added to the Restaurant Menu", Posted }`

---

### DELETE /api/restaurants/:rid/menu/:mid

- This endpoint simply requires rid : Restaurant ID
- Also the mid : Menu Item Id
- It DELETES the menu item with this Menu Item Id from the particular restaurant with this rid
- It also requires the Authorization token in the Headers.
- It returns the json message that The Menu Item with the id:mid and from the restaurant with id:rid has been deleted
- `{ Message: "One Menu Item Deleted from the Restraunt", Updated }`

---

### POST /api/orders

- It also requires the Authorization token in the Headers.
- Sample ORDER

```
{
	"user" : "644cc0248a7c22b55c35caf8",
	 "restaurant" : "644ccc8a39adcb0cf46feb41",
   "items": [{
     "name": "Ice Cream",
     "price": 60,
     "quantity": 2
   }],
   "totalPrice": 120,
   "deliveryAddress": {
     "street": "Adhartal",
     "city": "Jabalpur",
     "state": "MP",
     "country": "India",
     "zip": "482005"
   },
   "status": "placed"
}
```

---

### GET /api/orders/:id

- It requires the order ID in the request URL params,
- It Returns the order which matches the order id given in params
- Specifically `{ Message: "Get Order By ID", Order }`

---

### PATCH /api/orders/:id

- It requires the order ID in the request URL params,
- It updates the order in database with whatever payload we pass in req.body
- It also requires the Authorization token in the Headers.
- SAMPLE OBJECT

```
{
  "status": "placed"
}

```

- It returns the `{ Message: "Order with id has been Updated", Updated }`

---

Thankyou for Visiting 💝
