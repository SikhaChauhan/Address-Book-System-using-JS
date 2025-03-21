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

  display() {
    return `${this.firstName} ${this.lastName} - ${this.phone}, ${this.email}`;
  }

  validateName(name, fieldName) {
    const namePattern = /^[A-Z][a-zA-Z]{2,}$/;
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
    const zipPattern = /^[0-9]{5,6}$/;
    if (!zipPattern.test(zip)) {
      throw new Error("Invalid ZIP Code: Must be 5 or 6 digits.");
    }
  }

  validatePhone(phone) {
    const phonePattern = /^[0-9]{10}$/;
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

class AddressBook {
  constructor(name) {
    this.name = name;
    this.contacts = [];
  }

  addContact(contact) {
    if (!(contact instanceof Contact)) {
      throw new Error("Invalid contact object.");
    }

    const isDuplicate = this.contacts.some(c => c.firstName === contact.firstName && c.lastName === contact.lastName);
    if (isDuplicate) {
      throw new Error("Duplicate contact: A contact with the same name already exists.");
    }

    this.contacts.push(contact);
    console.log(`Contact added to ${this.name} successfully!`);
  }

  updateContact(firstName, lastName, updatedInfo) {
    const contact = this.contacts.find(c => c.firstName === firstName && c.lastName === lastName);
    if (!contact) {
      throw new Error("Contact not found.");
    }

    try {
      for (const key in updatedInfo) {
        if (contact.hasOwnProperty(key)) {
          contact[key] = updatedInfo[key];
        }
      }
      console.log(`Contact ${firstName} ${lastName} updated successfully.`);
    } catch (error) {
      console.error("Error updating contact:", error.message);
    }
  }

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

  deleteContactByName(firstName, lastName) {
    const index = this.contacts.findIndex(contact => contact.firstName === firstName && contact.lastName === lastName);
    if (index === -1) {
      console.log("Contact not found.");
      return;
    }
    this.contacts.splice(index, 1);
    console.log(`Contact ${firstName} ${lastName} deleted successfully.`);
  }

  getContactCount() {
    console.log(`Total contacts in '${this.name}': ${this.contacts.length}`);
    return this.contacts.length;
  }

  searchByCityOrState(location) {
    const results = this.contacts.filter(contact => contact.city === location || contact.state === location);
    if (results.length === 0) {
      console.log(`No contacts found in ${location}.`);
      return [];
    }
    console.log(`Contacts in ${location}:`);
    results.map(contact => console.log(contact.display()));
    return results;
  }

  getCountByCityAndState() {
    const cityCount = this.contacts.reduce((acc, contact) => {
      acc[contact.city] = (acc[contact.city] || 0) + 1;
      return acc;
    }, {});

    const stateCount = this.contacts.reduce((acc, contact) => {
      acc[contact.state] = (acc[contact.state] || 0) + 1;
      return acc;
    }, {});

    console.log("Contact count by city:", cityCount);
    console.log("Contact count by state:", stateCount);

    return { cityCount, stateCount };
  }
}

class AddressBookManager {
  constructor() {
    this.addressBooks = [];
  }

  createAddressBook(name) {
    if (this.addressBooks.some(book => book.name === name)) {
      throw new Error(`Address Book '${name}' already exists.`);
    }
    const newBook = new AddressBook(name);
    this.addressBooks.push(newBook);
    console.log(`Address Book '${name}' created successfully!`);
    return newBook;
  }

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

  getAddressBook(name) {
    return this.addressBooks.find(book => book.name === name);
  }
}

const manager = new AddressBookManager();

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
                    addressBook.getContactCount();
                    addressBook.getCountByCityAndState();
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
