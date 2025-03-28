const { Kafka } = require("kafkajs"); // Import KafkaJS library


exports.kafka = new Kafka({
  clientId: "my-app", // Unique identifier for this Kafka client
  brokers: ["192.168.1.27:9092"], // Kafka broker address (ensure Kafka is running at this IP and port)
});
