FROM openjdk:17
LABEL maintainer = "auth_service"
ADD  auth_service-0.0.1-SNAPSHOT.jar authservice.jar
ENTRYPOINT ["java","-jar", "authservice.jar"]