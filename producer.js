const { kafka } = require("./client"); // Import Kafka instance from client file

async function init() {
  const producer = kafka.producer(); // Create a Kafka producer instance
  console.log("Connecting Producer");

  await producer.connect(); // Connect the producer to Kafka broker
  console.log("Producer Connected Successfully");

  // Sending a message to the Kafka topic "rider-updates"
  await producer.send({
    topic: "rider-updates", // Target topic where the message will be sent
    messages: [
      {
        partition: 0, // Specify partition (ensures the message goes to a specific partition)
        key: "location-update", // Message key (helps maintain ordering within a partition)
        value: JSON.stringify({ name: "Tony Stark", location: "SOUTH" }), // Message payload (converted to a string)
      },
    ],
  });

  await producer.disconnect(); // Disconnect producer after sending the message
}

// Execute the producer function
init();
