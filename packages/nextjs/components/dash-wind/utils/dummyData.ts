import moment from "moment";

export const CALENDAR_INITIAL_EVENTS = [
  {
    title: "Product call",
    theme: "GREEN",
    startTime: moment().add(-12, "d").startOf("day"),
    endTime: moment().add(-12, "d").endOf("day"),
  },
  {
    title: "Meeting with tech team",
    theme: "PINK",
    startTime: moment().add(-8, "d").startOf("day"),
    endTime: moment().add(-8, "d").endOf("day"),
  },
  {
    title: "Meeting with Cristina",
    theme: "PURPLE",
    startTime: moment().add(-2, "d").startOf("day"),
    endTime: moment().add(-2, "d").endOf("day"),
  },
  { title: "Meeting with Alex", theme: "BLUE", startTime: moment().startOf("day"), endTime: moment().endOf("day") },
  { title: "Product Call", theme: "GREEN", startTime: moment().startOf("day"), endTime: moment().endOf("day") },
  { title: "Client Meeting", theme: "PURPLE", startTime: moment().startOf("day"), endTime: moment().endOf("day") },
  {
    title: "Client Meeting",
    theme: "ORANGE",
    startTime: moment().add(3, "d").startOf("day"),
    endTime: moment().add(3, "d").endOf("day"),
  },
  {
    title: "Product meeting",
    theme: "PINK",
    startTime: moment().add(5, "d").startOf("day"),
    endTime: moment().add(5, "d").endOf("day"),
  },
  {
    title: "Sales Meeting",
    theme: "GREEN",
    startTime: moment().add(8, "d").startOf("day"),
    endTime: moment().add(8, "d").endOf("day"),
  },
  {
    title: "Product Meeting",
    theme: "ORANGE",
    startTime: moment().add(8, "d").startOf("day"),
    endTime: moment().add(8, "d").endOf("day"),
  },
  {
    title: "Marketing Meeting",
    theme: "PINK",
    startTime: moment().add(8, "d").startOf("day"),
    endTime: moment().add(8, "d").endOf("day"),
  },
  {
    title: "Client Meeting",
    theme: "GREEN",
    startTime: moment().add(8, "d").startOf("day"),
    endTime: moment().add(8, "d").endOf("day"),
  },
  {
    title: "Sales meeting",
    theme: "BLUE",
    startTime: moment().add(12, "d").startOf("day"),
    endTime: moment().add(12, "d").endOf("day"),
  },
  {
    title: "Client meeting",
    theme: "PURPLE",
    startTime: moment().add(16, "d").startOf("day"),
    endTime: moment().add(16, "d").endOf("day"),
  },
];
export const RECENT_PAYMENTS = [
  {
    invoiceNo: "#4567",
    name: "Alex",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
    wallet: "0x...",
    status: "Pending",
    location: "Paris",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 2, "days")
      .format("DD MMM YYYY"),
    paidOn: "-",
  },
  {
    invoiceNo: "#4523",
    name: "Ereena",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
    wallet: "0x...",
    status: "Pending",
    location: "London",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 2, "days")
      .format("DD MMM YYYY"),
    paidOn: "-",
  },
  {
    invoiceNo: "#4453",
    name: "John",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
    wallet: "0x...",
    status: "Paid",
    location: "Canada",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 3, "days")
      .format("DD MMM YYYY"),
    paidOn: moment(new Date())
      .add(-24 * 2, "days")
      .format("DD MMM YYYY"),
  },
  {
    invoiceNo: "#4359",
    name: "Matrix",
    avatar: "https://reqres.in/img/faces/4-image.jpg",
    wallet: "0x...",
    status: "Paid",
    location: "Peru",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 3, "days")
      .format("DD MMM YYYY"),
    paidOn: moment(new Date())
      .add(-24 * 2, "days")
      .format("DD MMM YYYY"),
  },
  {
    invoiceNo: "#3359",
    name: "Virat",
    avatar: "https://reqres.in/img/faces/5-image.jpg",
    wallet: "0x...",
    status: "Paid",
    location: "London",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 3, "days")
      .format("DD MMM YYYY"),
    paidOn: moment(new Date())
      .add(-24 * 2, "days")
      .format("DD MMM YYYY"),
  },
  {
    invoiceNo: "#3367",
    name: "Miya",
    avatar: "https://reqres.in/img/faces/6-image.jpg",
    wallet: "0x...",
    status: "Paid",
    location: "Paris",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 3, "days")
      .format("DD MMM YYYY"),
    paidOn: moment(new Date())
      .add(-24 * 2, "days")
      .format("DD MMM YYYY"),
  },
  {
    invoiceNo: "#3359",
    name: "Virat",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
    wallet: "0x...",
    status: "Paid",
    location: "Canada",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 3, "days")
      .format("DD MMM YYYY"),
    paidOn: moment(new Date())
      .add(-24 * 2, "days")
      .format("DD MMM YYYY"),
  },
  {
    invoiceNo: "#2359",
    name: "Matrix",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
    wallet: "0x...",
    status: "Paid",
    location: "London",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 3, "days")
      .format("DD MMM YYYY"),
    paidOn: moment(new Date())
      .add(-24 * 2, "days")
      .format("DD MMM YYYY"),
  },
  {
    invoiceNo: "#4567",
    name: "Ereena",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
    wallet: "0x...",
    status: "Paid",
    location: "Tokyo",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 3, "days")
      .format("DD MMM YYYY"),
    paidOn: moment(new Date())
      .add(-24 * 2, "days")
      .format("DD MMM YYYY"),
  },
  {
    invoiceNo: "#4523",
    name: "John",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
    wallet: "0x...",
    status: "Paid",
    location: "Paris",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 3, "days")
      .format("DD MMM YYYY"),
    paidOn: moment(new Date())
      .add(-24 * 2, "days")
      .format("DD MMM YYYY"),
  },
  {
    invoiceNo: "#4453",
    name: "Virat",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
    wallet: "0x...",
    status: "Paid",
    location: "Canada",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 3, "days")
      .format("DD MMM YYYY"),
    paidOn: moment(new Date())
      .add(-24 * 2, "days")
      .format("DD MMM YYYY"),
  },
  {
    invoiceNo: "#4359",
    name: "Matrix",
    avatar: "https://reqres.in/img/faces/4-image.jpg",
    wallet: "0x...",
    status: "Paid",
    location: "US",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 3, "days")
      .format("DD MMM YYYY"),
    paidOn: moment(new Date())
      .add(-24 * 2, "days")
      .format("DD MMM YYYY"),
  },
  {
    invoiceNo: "#3359",
    name: "Ereena",
    avatar: "https://reqres.in/img/faces/6-image.jpg",
    wallet: "0x...",
    status: "Paid",
    location: "Tokyo",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 3, "days")
      .format("DD MMM YYYY"),
    paidOn: moment(new Date())
      .add(-24 * 2, "days")
      .format("DD MMM YYYY"),
  },
  {
    invoiceNo: "#3367",
    name: "John",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
    wallet: "0x...",
    status: "Paid",
    location: "London",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 3, "days")
      .format("DD MMM YYYY"),
    paidOn: moment(new Date())
      .add(-24 * 2, "days")
      .format("DD MMM YYYY"),
  },
  {
    invoiceNo: "#3359",
    name: "Virat",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
    wallet: "0x...",
    status: "Paid",
    location: "Paris",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 3, "days")
      .format("DD MMM YYYY"),
    paidOn: moment(new Date())
      .add(-24 * 2, "days")
      .format("DD MMM YYYY"),
  },
  {
    invoiceNo: "#2359",
    name: "Miya",
    avatar: "https://reqres.in/img/faces/7-image.jpg",
    wallet: "0x...",
    status: "Paid",
    location: "Canada",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 3, "days")
      .format("DD MMM YYYY"),
    paidOn: moment(new Date())
      .add(-24 * 2, "days")
      .format("DD MMM YYYY"),
  },
  {
    invoiceNo: "#4567",
    name: "Matrix",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
    wallet: "0x...",
    status: "Paid",
    location: "London",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 3, "days")
      .format("DD MMM YYYY"),
    paidOn: moment(new Date())
      .add(-24 * 2, "days")
      .format("DD MMM YYYY"),
  },
  {
    invoiceNo: "#4523",
    name: "Virat",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
    wallet: "0x...",
    status: "Paid",
    location: "Tokyo",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 3, "days")
      .format("DD MMM YYYY"),
    paidOn: moment(new Date())
      .add(-24 * 2, "days")
      .format("DD MMM YYYY"),
  },
  {
    invoiceNo: "#4453",
    name: "Ereena",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
    wallet: "0x...",
    status: "Paid",
    location: "Paris",
    amount: "34,989",
    generatedOn: moment(new Date())
      .add(-30 * 3, "days")
      .format("DD MMM YYYY"),
    paidOn: moment(new Date())
      .add(-24 * 2, "days")
      .format("DD MMM YYYY"),
  },
];
export const EMPLOYEES = [
  {
    name: "Alex",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
    email: "alex@dashwind.com",
    id: "1",
    wallet: "0xB9555E2f3e34aDfDB5d033C5af73de6e2385A770",
    role: "Developer",
    joinedOn: moment(new Date())
      .add(-5 * 1, "days")
      .format("DD MMM YYYY"),
    lastActive: "5 hr ago",
  },
  {
    name: "Ereena",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
    email: "ereena@dashwind.com",
    id: "2",
    wallet: "0xB9555E2f3e34aDfDB5d033C5af73de6e2385A770",
    role: "Designer",
    joinedOn: moment(new Date())
      .add(-5 * 2, "days")
      .format("DD MMM YYYY"),
    lastActive: "15 min ago",
  },
  {
    name: "John",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
    email: "jhon@dashwind.com",
    id: "3",
    wallet: "0xB9555E2f3e34aDfDB5d033C5af73de6e2385A770",
    role: "Designer",
    joinedOn: moment(new Date())
      .add(-5 * 3, "days")
      .format("DD MMM YYYY"),
    lastActive: "20 hr ago",
  },
  {
    name: "Matrix",
    avatar: "https://reqres.in/img/faces/4-image.jpg",
    email: "matrix@dashwind.com",
    id: "4",
    wallet: "0xB9555E2f3e34aDfDB5d033C5af73de6e2385A770",
    role: "Manager",
    joinedOn: moment(new Date())
      .add(-5 * 4, "days")
      .format("DD MMM YYYY"),
    lastActive: "1 hr ago",
  },
  {
    name: "Virat",
    avatar: "https://reqres.in/img/faces/5-image.jpg",
    email: "virat@dashwind.com",
    id: "5",
    wallet: "0xB9555E2f3e34aDfDB5d033C5af73de6e2385A770",
    role: "Developer",
    joinedOn: moment(new Date())
      .add(-5 * 5, "days")
      .format("DD MMM YYYY"),
    lastActive: "40 min ago",
  },
  {
    name: "Miya",
    avatar: "https://reqres.in/img/faces/6-image.jpg",
    email: "miya@dashwind.com",
    id: "6",
    wallet: "0xB9555E2f3e34aDfDB5d033C5af73de6e2385A770",
    role: "Developer",
    joinedOn: moment(new Date())
      .add(-5 * 7, "days")
      .format("DD MMM YYYY"),
    lastActive: "5 hr ago",
  },
];
