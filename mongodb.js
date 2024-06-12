const { MongoClient, ObjectId } = require("mongodb");

const connectionUrl = "mongodb://127.0.0.1:27017";
const dbName = "task-db";

// create object unique id
// const id = new ObjectId();

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect databse!");
    }

    const db = client.db(dbName);
    // insert one document
    // db.collection("users").insertOne({
    //   name: "vivek",
    //   age: 23,
    // });

    // insert multiple documents
    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "clean home",
    //       completed: false,
    //     },
    //     {
    //       description: "test work",
    //       completed: false,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert document");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // findOne: search data and return first data
    // db.collection("tasks").findOne(
    //   { _id: new ObjectId("66695ee32c9d1b371cc03daf") },
    //   (error, task) => {
    //     console.log(task);
    //   }
    // );

    // find: return cursor so we can use multiple method on it like toArray, count etc.
    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray((error, task) => {
    //     console.log(task);
    //   });

    // updateOne: update one document,here we handle promise
    // db.collection("users")
    //   .updateOne(
    //     { name: "vivek" },
    //     {
    //       // to update use update oprators
    //       $set: {
    //         name: "Andrew",
    //       },
    //     }
    //   )
    //   .then((res) => console.log(res))
    //   .catch((error) => console.log(error));

    // updateMany: update multiple document
    //     db.collection("tasks")
    //       .updateMany(
    //         { completed: false },
    //         {
    //           // to update use update oprators
    //           $set: {
    //             completed: true,
    //           },
    //         }
    //       )
    //       .then((res) => console.log(res))
    //       .catch((error) => console.log(error));

    ////// deleteOne
    // db.collection("tasks")
    //   .deleteOne({ _id: new ObjectId("666979c9823a2a3ca44af2ec") })
    //   .then((res) => console.log(res))
    //   .catch((error) => console.log(error));

    ////// deleteMany
    // db.collection("tasks")
    //   .deleteMany({ completed: false })
    //   .then((res) => console.log(res))
    //   .catch((error) => console.log(error));
  }
);
