FROM openjdk:8-jdk-alpine
WORKDIR /usr/app
COPY ./build/libs/* ./
EXPOSE 8080
CMD ["java","-jar","demo-0.0.1-SNAPSHOT.jar"]