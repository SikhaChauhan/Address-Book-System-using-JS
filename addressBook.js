class Contact {
  constructor(firstName, lastName, address, city, state, zip, phone, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.phone = phone;
    this.email = email;
  }

  // Method to display contact information
  display() {
    return `${this.firstName} ${this.lastName} - ${this.phone}, ${this.email}`;
  }
}

// AddressBook class to manage contacts
class AddressBook {
  constructor() {
    this.contacts = [];
  }

  // Add a new contact
  addContact(contact) {
    if (!(contact instanceof Contact)) {
      console.log("Invalid contact data.");
      return;
    }
    this.contacts.push(contact);
    console.log("Contact added successfully!");
  }

  // List all contacts
  listContacts() {
    if (this.contacts.length === 0) {
      console.log("📭 Address book is empty!");
      return;
    }
    console.log("📖 Address Book:");
    this.contacts.forEach((contact, index) => {
      console.log(`${index + 1}. ${contact.display()}`);
    });
  }
}

// Create an AddressBook instance
const myAddressBook = new AddressBook();

// Prompt user for contact details
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to get user input and add a new contact
function createContact() {
  readline.question("Enter First Name: ", (firstName) => {
    readline.question("Enter Last Name: ", (lastName) => {
      readline.question("Enter Address: ", (address) => {
        readline.question("Enter City: ", (city) => {
          readline.question("Enter State: ", (state) => {
            readline.question("Enter ZIP Code: ", (zip) => {
              readline.question("Enter Phone Number: ", (phone) => {
                readline.question("Enter Email: ", (email) => {
                  const newContact = new Contact(
                    firstName,
                    lastName,
                    address,
                    city,
                    state,
                    zip,
                    phone,
                    email
                  );
                  myAddressBook.addContact(newContact);
                  myAddressBook.listContacts();
                  readline.close();
                });
              });
            });
          });
        });
      });
    });
  });
}

createContact();
