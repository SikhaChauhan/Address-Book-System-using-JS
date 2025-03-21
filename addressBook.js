class Contact {
  constructor(firstName, lastName, address, city, state, zip, phone, email) {
    this.validateName(firstName, "First Name");
    this.validateName(lastName, "Last Name");
    this.validateAddress(address, "Address");
    this.validateAddress(city, "City");
    this.validateAddress(state, "State");
    this.validateZip(zip);
    this.validatePhone(phone);
    this.validateEmail(email);

    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.phone = phone;
    this.email = email;
  }

  // Display contact details
  display() {
    return `${this.firstName} ${this.lastName} - ${this.phone}, ${this.email}`;
  }

  // Validation Methods
  validateName(name, fieldName) {
    const namePattern = /^[A-Z][a-zA-Z]{2,}$/; // Starts with uppercase, min 3 chars
    if (!namePattern.test(name)) {
      throw new Error(`Invalid ${fieldName}: Must start with a capital letter and have at least 3 characters.`);
    }
  }

  validateAddress(value, fieldName) {
    if (value.length < 4) {
      throw new Error(`Invalid ${fieldName}: Must have at least 4 characters.`);
    }
  }

  validateZip(zip) {
    const zipPattern = /^[0-9]{5,6}$/; // 5-6 digit numeric
    if (!zipPattern.test(zip)) {
      throw new Error("Invalid ZIP Code: Must be 5 or 6 digits.");
    }
  }

  validatePhone(phone) {
    const phonePattern = /^[0-9]{10}$/; // 10 digit number
    if (!phonePattern.test(phone)) {
      throw new Error("Invalid Phone Number: Must be 10 digits.");
    }
  }

  validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      throw new Error("Invalid Email: Must follow standard email format (e.g., user@example.com).");
    }
  }
}

// AddressBook class to manage contacts
class AddressBook {
  constructor(name) {
    this.name = name; // AddressBook name
    this.contacts = [];
  }

  // Add a new contact
  addContact(contact) {
    if (!(contact instanceof Contact)) {
      throw new Error("Invalid contact object.");
    }
    this.contacts.push(contact);
    console.log(`Contact added to ${this.name} successfully!`);
  }

  // List all contacts
  listContacts() {
    if (this.contacts.length === 0) {
      console.log(`${this.name} is empty!`);
      return;
    }
    console.log(`${this.name} Address Book:`);
    this.contacts.forEach((contact, index) => {
      console.log(`${index + 1}. ${contact.display()}`);
    });
  }
}

// AddressBookManager to manage multiple address books
class AddressBookManager {
  constructor() {
    this.addressBooks = [];
  }

  // Create a new Address Book
  createAddressBook(name) {
    if (this.addressBooks.some(book => book.name === name)) {
      throw new Error(`Address Book '${name}' already exists.`);
    }
    const newBook = new AddressBook(name);
    this.addressBooks.push(newBook);
    console.log(`Address Book '${name}' created successfully!`);
    return newBook;
  }

  // List all Address Books
  listAddressBooks() {
    if (this.addressBooks.length === 0) {
      console.log("📚 No Address Books found!");
      return;
    }
    console.log("📚 Available Address Books:");
    this.addressBooks.forEach((book, index) => {
      console.log(`${index + 1}. ${book.name} (${book.contacts.length} contacts)`);
    });
  }

  // Find an Address Book by name
  getAddressBook(name) {
    return this.addressBooks.find(book => book.name === name);
  }
}

// Create AddressBookManager instance
const manager = new AddressBookManager();

// User input setup
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to create and validate a contact
function createContact(addressBook) {
  readline.question("Enter First Name: ", (firstName) => {
    readline.question("Enter Last Name: ", (lastName) => {
      readline.question("Enter Address: ", (address) => {
        readline.question("Enter City: ", (city) => {
          readline.question("Enter State: ", (state) => {
            readline.question("Enter ZIP Code: ", (zip) => {
              readline.question("Enter Phone Number: ", (phone) => {
                readline.question("Enter Email: ", (email) => {
                  try {
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
                    addressBook.addContact(newContact);
                    addressBook.listContacts();
                  } catch (error) {
                    console.error(error.message);
                  }
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

function createAddressBook() {
  readline.question("Enter new Address Book name: ", (name) => {
    try {
      const newBook = manager.createAddressBook(name);
      console.log(`ℹ️ Address Book '${name}' is ready.`);
      createContact(newBook);
    } catch (error) {
      console.error(error.message);
      readline.close();
    }
  });
}

createAddressBook();
