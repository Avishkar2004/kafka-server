const { kafka } = require("./client");

// Create a new Kafka instance with a client ID and broker address

async function init() {
  const admin = kafka.admin(); // Create an admin client instance to manage Kafka topics
  console.log("Admin connection...", admin);

  admin.connect(); // Connect the admin client to Kafka broker
  console.log("Admin connection success...");

  // Creating a new topic named "rider-updates"
  console.log("Creating Topic [rider-updates]");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates", // Name of the topic
        numPartitions: 2, // Number of partitions for parallel processing
      },
    ],
  });
  console.log("Topic Created successfully [rider-updates]");

  console.log("Disconnecting Admin...");
  await admin.disconnect(); // Disconnect the admin client after topic creation
}

// Call the init function to execute the Kafka setup
init();
