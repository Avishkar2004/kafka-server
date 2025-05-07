const { kafka } = require("./client"); // Import Kafka instance from client file
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer(); // Create a Kafka producer instance
  console.log("Connecting Producer");

  await producer.connect(); // Connect the producer to Kafka broker
  console.log("Producer Connected Successfully");

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async function (line) {
    const [riderName, location] = line.trim().split(" ");

    // ✅ Check if both riderName and location are provided
    if (!riderName || !location) {
      console.log(
        "Please provide both rider name and location (e.g., thor north)"
      );
      rl.prompt();
      return;
    }

    const partition = location.toLowerCase() === "north" ? 0 : 1;

    try {
      await producer.send({
        topic: "rider-updates",
        messages: [
          {
            partition, // ✅ Correctly assigns to partition 0 or 1
            key: location.toLowerCase(), // Kafka hashes key to pick partition if needed
            value: JSON.stringify({ name: riderName, location }),
          },
        ],
      });
      console.log(
        `Sent update for ${riderName} in ${location} (Partition ${partition})`
      );
    } catch (err) {
      console.error("Failed to send message:", err);
    }

    rl.prompt();
  }).on("close", async () => {
    await producer.disconnect(); // Disconnect producer after sending the message
    console.log("Producer disconnected");
  });
}

// Execute the producer function
init();
