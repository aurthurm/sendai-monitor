FROM openjdk:11
EXPOSE 80
ADD ./target/disaster-loss-0.0.1.jar disaster-loss-0.0.1.jar
ENTRYPOINT ["java","-jar", "/disaster-loss-0.0.1.jar"]
