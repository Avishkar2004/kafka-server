const { Kafka } = require("kafkajs"); // Import KafkaJS library

exports.kafka = new Kafka({
  clientId: "my-app", // Unique identifier for this Kafka client
  brokers: ["192.168.1.7:9092"], // ✅ Correct IP here
});
