/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo tickettoride scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/tickettoride scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/tickettoride scripts/init.mongo.js
 */

db.travellers.remove({});
db.blacklist.remove({});

/*Q1. Enter the code for adding the initial list of Travellers here.
 * Create a list of Travellers with necessary fields.
 * Enter the list of travellers into the DB collection named 'travellers'.
 * */
const travellersDocuments = [
  {
    id: 1,
    name: "Jack",
    phone: 88885555,
    bookingTime: new Date("2022-10-11 18:30:01"),
  },
  {
    id: 2,
    name: "Rose",
    phone: 88884444,
    bookingTime: new Date("2022-10-12 19:32:23"),
  },
];

db.travellers.insertMany(travellersDocuments);

/*Q1 code ends here*/

const count = db.travellers.count();
print("Inserted", count, "travellers");

//The _id below is just a placeholder. The below collection, in fact, has only one row and one column. We can denote this by any name but we call this fixedindex.
db.counters.remove({ _id: "travellers" });
db.counters.insert({ _id: "travellers", current: count });

db.travellers.createIndex({ id: 1 }, { unique: true });
db.travellers.createIndex({ name: 1 });
db.travellers.createIndex({ phone: 1 });
db.travellers.createIndex({ bookingTime: 1 });

const count_bl = db.blacklist.count();
print("Inserted", count_bl, "blacklist");
db.counters.remove({ _id: "blacklist" });
db.counters.insert({ _id: "blacklist", current_bl: count_bl });
db.blacklist.createIndex({ name: 1 });
