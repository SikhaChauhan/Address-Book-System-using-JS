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
      throw new Error("Invalid Email: Must follow standard email format.");
    }
  }
}

// AddressBook class to manage contacts
class AddressBook {
  constructor(name) {
    this.name = name;
    this.contacts = [];
  }

  addContact(contact) {
    if (!(contact instanceof Contact)) {
      throw new Error("Invalid contact object.");
    }
    this.contacts.push(contact);
    console.log(`Contact added to ${this.name} successfully!`);
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

  editContact(firstName, lastName, newDetails) {
    const contact = this.contacts.find(
      (c) => c.firstName === firstName && c.lastName === lastName
    );

    if (!contact) {
      throw new Error("Contact not found.");
    }

    try {
      Object.keys(newDetails).forEach((key) => {
        if (contact[`validate${key.charAt(0).toUpperCase() + key.slice(1)}`]) {
          contact[`validate${key.charAt(0).toUpperCase() + key.slice(1)}`](
            newDetails[key]
          );
        }
        contact[key] = newDetails[key];
      });
      console.log("Contact updated successfully!");
    } catch (error) {
      console.error("Update failed:", error.message);
    }
  }

  deleteContact(firstName, lastName) {
    const index = this.contacts.findIndex(
      (c) => c.firstName === firstName && c.lastName === lastName
    );

    if (index === -1) {
      throw new Error("Contact not found.");
    }

    this.contacts.splice(index, 1);
    console.log("Contact deleted successfully!");
  }

  findContact(query) {
    const results = this.contacts.filter(
      (c) => c.firstName.includes(query) || c.lastName.includes(query)
    );

    if (results.length === 0) {
      console.log("No matching contacts found.");
    } else {
      results.forEach((contact) => console.log(contact.display()));
    }
  }
}

// AddressBookManager to manage multiple address books
class AddressBookManager {
  constructor() {
    this.addressBooks = [];
  }

  createAddressBook(name) {
    if (this.addressBooks.some((book) => book.name === name)) {
      throw new Error(`Address Book '${name}' already exists.`);
    }
    const newBook = new AddressBook(name);
    this.addressBooks.push(newBook);
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
    return this.addressBooks.find((book) => book.name === name);
  }
}

// Create AddressBookManager instance
const manager = new AddressBookManager();

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function mainMenu() {
  console.log("1. Create Address Book");
  console.log("2. List Address Books");
  console.log("3. Exit");

  readline.question("Choose an option: ", (option) => {
    switch (option) {
      case "1":
        readline.question("Enter Address Book name: ", (name) => {
          try {
            manager.createAddressBook(name);
            console.log(`Address Book '${name}' created.`);
            mainMenu();
          } catch (error) {
            console.error(error.message);
            mainMenu();
          }
        });
        break;
      case "2":
        manager.listAddressBooks();
        mainMenu();
        break;
      case "3":
        console.log("Goodbye!");
        readline.close();
        break;
      default:
        console.log("Invalid option. Try again.");
        mainMenu();
    }
  });
}

mainMenu();
