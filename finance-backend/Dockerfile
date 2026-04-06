# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . /source
RUN cd /source && \
    if [ -d "finance-backend" ]; then cd finance-backend; fi && \
    mvn clean package -DskipTests && \
    cp target/finance-backend-0.0.1-SNAPSHOT.jar /app/app.jar

# Run stage
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/app.jar .
ENV PORT=8081
EXPOSE 8081
ENTRYPOINT ["java", "-Dserver.port=${PORT}", "-jar", "app.jar"]
