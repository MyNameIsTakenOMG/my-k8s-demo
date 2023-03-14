# Welcome to My K8S DEMO!

Hi! Welcome to my K8S demo microservices project repository. This project basically is mimicking the normal behavior of online shopping. In the following secitons, I'll demostrate more details about the project for you.


## Technologies

Here is the list of **main** technologies used for the project: 

- Docker
- Kubernetes
- RabbitMQ
- Springboot
- Nodejs
- MySQL

## Architecture

![Architecture](https://github.com/MyNameIsTakenOMG/project-gifs/blob/main/my-k8s-demo-architecture.PNG)

This project consists of the following modules:

- Ingress: a module which is a Kubernetes object that used to expose your microservices to the outside world and helps your map traffic to different services at the backend.
- Api-gateway: a module that acts as a proxy for multiple services, in this  case, it is responsible for communicating with auth service, rabbitmq service as well as mysql service, in this case, it will forward user order request to the message queue by sending a `ordering` message.
- Auth service: a module that is used to authenticate user http requests and generate jwt token.
- Client service: a module that acts as the frontend application of the project.
-  RabbitMQ service: a module serves as a message broker, which used to handle any asynchronous request by decoupling the frontend and the backend of the project. In this case, it is used for handling incoming order requests from users.
- Order-processing service: a module that is responsible for handling incoming `ordering` message by communicating with our mysql database. After finishing the order, order-processing service will send a `order-complete` message to our message queue.
- Notif service: a module that is used for listening to any `order-complete` message and send a notification email to the user.

**Note**: in the file `notif-service-secret.yml` under the path: `my-k8s-demo/k8s/`, remember to replace with your sender email address and password.

## Database structure

![enter image description here](https://github.com/MyNameIsTakenOMG/project-gifs/blob/main/my-k8s-demo-db.PNG)

This project database consists of four tables: 

- user
- orders
- order_item
- product

**Note**:  in `user` table, the `password` was set `varchar` type and is not encrypted in this case just for the sake of simplicity.
