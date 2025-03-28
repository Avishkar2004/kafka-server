const { kafka } = require("./client"); // Import Kafka instance from client file

async function init() {
  // Create a Kafka consumer instance with a consumer group ID
  const consumer = kafka.consumer({ groupId: "user-1" }); 
  await consumer.connect(); // Connect the consumer to Kafka broker

  // Subscribe to the "rider-updates" topic
  // `fromBeginning: true` ensures the consumer reads all past messages from the beginning
  await consumer.subscribe({ topic: "rider-updates", fromBeginning: true });

  // Start consuming messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        `[${topic}]: PART[${partition}]: ${message.value.toString()}`
      );
    },
  });
}

// Call the init function to start the consumer
init();
