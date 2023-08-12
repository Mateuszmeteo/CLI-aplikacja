import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "db/contacts.json");


const getContactsList = async () => {
  let contactsList = [];
  await fs
    .readFile(contactsPath, "utf8")
    .then((contacts) => {
      contactsList = JSON.parse(contacts);
    })
    .catch((error) => console.log(error.message));
  return contactsList;
};

const listContacts = async () => {
  const contacts = await getContactsList();
  console.log("Contacts list from contacts.json:");
  console.table(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await getContactsList();
  const contactById = contacts.filter((c) => c.id === contactId);
  console.log(`Contact details for id=${contactId}:`);
  console.table(contactById);
};

const removeContact = async (contactId) => {
  const contacts = await getContactsList();
  const deletedContact = contacts.filter((c) => c.id === contactId);
  const filteredContacts = contacts.filter((c) => c.id !== contactId);
  console.log(`You just removed from your contacts`);
  console.table(deletedContact);
  fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  console.log("Contacts.json was updated:");
  console.table(filteredContacts);
};

const addContact = async (name, email, phone) => {
  const contacts = await getContactsList();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const updatedContactsList = [...contacts, newContact];
  fs.writeFile(contactsPath, JSON.stringify(updatedContactsList));
  console.log(`${name} was added to contact list`);
  console.log("Contacts.json was updated:");
  console.table(updatedContactsList);
};

export { listContacts, getContactById, removeContact, addContact };












// import fs from "fs/promises";
// import path from "path";

// const contactsPath = path.join(__dirname, "db/contacts.json");

// function listContacts() {
//   const contacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
//   console.table(contacts);
// }

// function getContactById(contactId) {
//   const contacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
//   const contact = contacts.find(c => c.id === contactId);
//   if (contact) {
//     console.table([contact]);
//   } else {
//     console.log("Contact not found.");
//   }
// }

// function removeContact(contactId) {
//   let contacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
//   contacts = contacts.filter(c => c.id !== contactId);
//   fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
//   console.log("Contact removed successfully.");
// }

// function addContact(name, email, phone) {
//   const contacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
//   const newContact = {
//     id: Date.now().toString(),
//     name,
//     email,
//     phone
//   };
//   contacts.push(newContact);
//   fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
//   console.log("Contact added successfully.");
// }

// export {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact
// };
