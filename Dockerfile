FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

COPY . .
RUN ./mvnw clean package -DskipTests

EXPOSE 8080
ENTRYPOINT ["java","-jar","target/StageIsYours-1.0-SNAPSHOT.jar"]
