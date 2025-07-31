
# 🚀 One211 Application Frontend

This is the **Frontend application** for **One211** built with **React**, connected to a **Spring Boot Backend API** and running on **Dockerized MySQL**.

---

## 🛠️ Tech Stack
- React (Vite)
- Tailwind CSS
- Axios
- React Hook Form
- React Context API
- Spring Boot (Backend)
- JWT Authentication
- postgres (Dockerized)

---

## 📥 Cloning the Repository
```bash
git clone https://github.com/admin-one211/application-frontend.git
cd application-frontend
```

---

## 🐬 Prerequisites
Make sure you have the following installed:
- **Node.js** (v18+ recommended)
- **Docker** & Docker Compose
- **Backend repo** (your Spring Boot API)

---

## ⚙️ How to Run the Complete Project

### 1️⃣ Start MySQL via Docker
```bash
docker run --name application -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=One211 -p 3306:3306 -d mysql:8.0
```

Verify Container is running:
```
docker ps
```

---

### 2️⃣ Start Spring Boot Backend
Make sure your `application.properties` is correct (As created in Docker):
```properties
spring.datasource.url=jdbc:postgresql://localhost:[PORT]/One211
spring.datasource.username=username
spring.datasource.password=password
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.sql.init.mode=always
spring.sql.init.schema-locations=classpath:schema.sql
```

Run:
start your backend-
```bash
./mvnw spring-boot:run or mvn spring-boot:run
```

Backend will start on:  
`http://localhost:8080`

---

### 3️⃣ Start React Frontend
```bash
cd application-frontend
npm install
npm run dev 
```

Frontend will run on:  
`http://localhost:5173`

---

## ⚠️ Notes
- Frontend expects backend to be running at `http://localhost:8080`.
- MySQL credentials must match Docker configuration.
